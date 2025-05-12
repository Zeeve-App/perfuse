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
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
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
import { SUBQL_ACCESS_TOKEN_URL } from "@/constants/constant";
import { useModalStore } from "@/store/modal";

/** collator add key schema */
const DeploySubquerySchema = yup.object({
  subqlAccessToken: yup.string().required("Subql Access Token is required"),
});

/** collator add key type */
export type DeploySubquerySchemaType = yup.InferType<typeof DeploySubquerySchema>;

/** collator add key modal component */
const DeploySubquery = () => {
  const [isLoading, setLoading] = useState(false);
  const { isOpen, onClose, type, data } = useModalStore();
  const toast = useToast();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deploySubquery";

  const apis = useApi();

  const formData = useForm<DeploySubquerySchemaType>({
    resolver: yupResolver(DeploySubquerySchema),
    mode: "all",
    defaultValues: {},
  });

  /** form submit handler */
  const onSubmit = async (formData: DeploySubquerySchemaType) => {
    try {
      if (data.deploySubquery) {
        setLoading(true);
        console.log(formData);
        apis.deploySubquery(data.deploySubquery?.networkId, formData);
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
              <ModalTitle className="text-xl">Deploy Subquery</ModalTitle>
              <Card variant={"grid-no-pad"} className="col-span-12 lg:col-span-12 ">
                {/*subql access token*/}
                <FormField
                  className="col-span-12 lg:col-span-6"
                  helper={{
                    status: "error",
                    text: formData.formState.errors.subqlAccessToken?.message?.toString(),
                  }}
                >
                  <Typography variant="subtitle">Subql Access Token</Typography>
                  <Input
                    placeholder="Enter Your Subql Access Token"
                    {...formData.register("subqlAccessToken", {
                      required: "SubQuery Access Token is required",
                      pattern: {
                        value: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
                        message: "Invalid token format",
                      },
                    })}
                    inputContainerProps={{ className: "col-span-12" }}
                    type="password"
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
                        To generate Subql access token, register{" "}
                        <span className="font-bold">
                          <a href={SUBQL_ACCESS_TOKEN_URL} target="_blank" rel="noreferrer">
                            here{" "}
                          </a>
                        </span>
                        .
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
            <Button type="submit" colorScheme="gradient" isLoading={isLoading}>
              Deploy
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default DeploySubquery;
