/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * Copyright (C) 2024 [Perfuse]
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

"use client";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { isAddress, mnemonicValidate } from "@polkadot/util-crypto";
import { useModalStore } from "@/store/modal";
import { ParachainsServiceError } from "@/api-client/types";
import { Button } from "@/lib/components/Button";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalTitle,
  ModalText,
  ModalFooter,
} from "@/lib/components/Modal";
import { useToast } from "@/lib/components/Toast";
import useApi from "@/api-client";
import { Card } from "@/lib/components/Card";
import { FormField } from "@/lib/components/Form/FormField";
import { Input } from "@/lib/components/Form";
import { Typography } from "@/lib/components/Typography";
import { tx } from "@/utils/shared";

/** collator add key schema */
const collatorAddKeySchema = yup.object({
  seed: yup
    .string()
    .required("Please enter seed phrase")
    .test({
      test: (seedPhrase: string) => {
        return mnemonicValidate(seedPhrase);
      },
      message: "invalid seed phrase",
    }),
  pubKey: yup
    .string()
    .required("Public key is required")
    .test({
      test: (publicKey: string) => {
        // Ensure it's a hex string, has 64 characters (32 bytes) and that the length is correct when converted to U8 array
        return isAddress(publicKey);
      },
      message: "invalid public key",
    }),
});

/** collator add key type */
export type CollatorAddKeySchemaType = yup.InferType<typeof collatorAddKeySchema>;

/** collator add key modal component */
const CollatorAddKey = () => {
  const [isLoading, setLoading] = useState(false);
  const { isOpen, onClose, type, data } = useModalStore();
  const toast = useToast();
  const router = useRouter();

  const isModalOpen = isOpen && type === "addKey";

  const apis = useApi();

  const formData = useForm<CollatorAddKeySchemaType>({
    resolver: yupResolver(collatorAddKeySchema),
    mode: "all",
    defaultValues: {
      pubKey: data.addKey?.sessionAddress ?? "",
    },
  });

  useEffect(() => {
    formData.setValue("pubKey", data.addKey?.sessionAddress ?? "");
  }, [data.addKey?.sessionAddress, formData]);

  /** form submit handler */
  const onSubmit = async (formData: CollatorAddKeySchemaType) => {
    try {
      if (data.addKey) {
        setLoading(true);
        apis.addKey(data.addKey?.networkId, data.addKey?.nodeId, formData);
        router.refresh();
      } else {
        console.log("undefined values in important variables");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ParachainsServiceError>;
        toast("", {
          status: "error",
          message: err.response?.data?.error?.details,
        });
      } else {
        toast("An unexpected error occurred", {
          status: "error",
        });
      }
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isModalOpen} handleClose={onClose} shouldBackdropDismiss={false}>
      <ModalOverlay />
      <form action="" className="" onSubmit={formData.handleSubmit(onSubmit)}>
        <ModalContent className="max-h-screen w-full max-w-3xl overflow-y-auto">
          <ModalBody className="grid grid-cols-12">
            <div className="col-span-12 flex flex-col gap-y-1">
              <ModalTitle className="text-xl">Add Key</ModalTitle>
              <ModalText>Add Key in the collator</ModalText>
              <Card variant={"grid-no-pad"} className="col-span-12 lg:col-span-12 ">
                {/* seed phrase */}
                <FormField
                  className="col-span-12 lg:col-span-6"
                  helper={{
                    status: "error",
                    text: formData.formState.errors.seed?.message?.toString(),
                  }}
                  label={{
                    text: "Seed",
                    isRequired: true,
                  }}
                >
                  <Input
                    placeholder="Enter Your Seed"
                    {...formData.register("seed")}
                    inputContainerProps={{ className: "col-span-12" }}
                    type="password"
                    isRequired
                  />
                </FormField>
                {/* public key */}
                <FormField
                  className="col-span-12 lg:col-span-6"
                  helper={{
                    status: "error",
                    text: formData.formState.errors.pubKey?.message?.toString(),
                  }}
                  label={{
                    text: "Public Key",
                    // isRequired: true,
                  }}
                >
                  <Input
                    placeholder="Enter Your Public Key"
                    isDisabled
                    {...formData.register("pubKey")}
                    inputContainerProps={{ className: "col-span-12" }}
                    type="text"
                    isRequired
                  />
                </FormField>
                <Card
                  className={tx(
                    "col-span-12 flex flex-row items-center border border-brand-yellow bg-brand-yellow/5 gap-3",
                  )}
                >
                  <div className="2xl:flex 2xl:grow 2xl:flex-row 2xl:items-center 2xl:justify-between">
                    <div className="">
                      <Typography variant="paragraph" className="font-bold">
                        Note:{" "}
                      </Typography>
                      <Typography variant="paragraph">
                        Please ensure the same seed phrase is used as the one associated with the address{" "}
                        <span className="font-semibold">{data.addKey?.sessionAddress}</span>.
                      </Typography>
                    </div>
                  </div>
                </Card>
              </Card>
            </div>
          </ModalBody>
          <ModalFooter placement="end">
            <Button colorScheme={"accent"} variant={"outline"} onClick={onClose} isDisabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="gradient" isLoading={isLoading} isDisabled={!formData.formState.isValid}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default CollatorAddKey;
