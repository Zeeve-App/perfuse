"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
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

const DeleteNetworkModal = () => {
  const [isLoading, setLoading] = useState(false);
  const { isOpen, onClose, type, data } = useModalStore();
  const toast = useToast();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteNetwork";

  const apis = useApi();

  const deleteNetwork = async () => {
    try {
      setLoading(true);
      await apis.delete(data.deleteNetwork?.networkId as string);
      router.push("/");
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
      <ModalContent>
        <ModalBody>
          <StatusIcon status="error" />
          <div className="flex flex-col gap-y-1">
            <ModalTitle>Delete Network</ModalTitle>
            <ModalText>
              Are you sure? You want to delete <span className="font-bold">{data.deleteNetwork?.networkName}</span>{" "}
              network.
            </ModalText>
          </div>
        </ModalBody>
        <ModalFooter placement="end">
          <Button variant="ghost" className="text-brand-red" onClick={onClose} isDisabled={isLoading}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={deleteNetwork} isLoading={isLoading}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteNetworkModal;
