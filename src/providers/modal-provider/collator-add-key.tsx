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
import { StatusIcon } from "@/lib/components/StatusIcon";
import { useToast } from "@/lib/components/Toast";
import useApi from "@/api-client";
import { Card } from "@/lib/components/Card";
import { FormField } from "@/lib/components/Form/FormField";
import { Heading } from "@/lib/components/Heading";
import { Input } from "@/lib/components/Form";

const collatorAddKeySchema = yup.object({
  key: yup.string(),
});

export type CollatorAddKeySchemaType = yup.InferType<typeof collatorAddKeySchema>;

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
    defaultValues: {},
  });

  const onSubmit = async (data: CollatorAddKeySchemaType) => {
    try {
      setLoading(true);
      console.log(data);

      // router.push("/");
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
        <ModalContent>
          <ModalBody>
            {/* <StatusIcon status="info" /> */}
            <div className="flex flex-col gap-y-1">
              <ModalTitle>Add Key</ModalTitle>
              <ModalText>Add Key in the collator</ModalText>
              <Card variant={"grid-no-pad"} className="col-span-12 lg:col-span-6 ">
                <FormField
                  className="col-span-12"
                  helper={{
                    status: "error",
                    text: formData.formState.errors.key?.message?.toString(),
                  }}
                >
                  <Input
                    placeholder="Enter Your Key"
                    {...formData.register("key")}
                    inputContainerProps={{ className: "col-span-12" }}
                    type="password"
                    isRequired
                  />
                </FormField>
              </Card>
            </div>
          </ModalBody>
          <ModalFooter placement="end">
            <Button colorScheme={"accent"} variant={"outline"} onClick={onClose} isDisabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="gradient" isLoading={isLoading}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default CollatorAddKey;
