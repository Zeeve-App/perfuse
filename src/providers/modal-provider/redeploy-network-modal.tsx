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
import HTTP_STATUS from "@/constants/http";

/** Re-Deploy network modal component */
const ReDeployNetworkModal = () => {
  const [isLoading, setLoading] = useState(false);
  const { isOpen, onClose, type, data } = useModalStore();
  const toast = useToast();
  const router = useRouter();

  const isModalOpen = isOpen && type === "reDeployNetwork";

  /** client apis hook */
  const apis = useApi();

  const reDeployNetwork = async () => {
    try {
      setLoading(true);
      const response = await apis.reCreateNetwork(
        data.reDeployNetwork?.payLoad ?? {
          network: {
            network_name: "",
            network_env: "",
            network_template: "",
            network_relay_chain_type: "",
            network_sidecar: 0,
            network_blockchain_explorer_type: "",
            network_chain_spec_file_json: {},
            network_binary_path: "",
            network_user_address: "",
          },
          nodes: [],
          networkId: "",
        },
      );
      if (response.status === HTTP_STATUS.OK && response.data.success) {
        toast("Network created", {
          message: "Network creation is successful.",
          status: "success",
        });
        router.push("/dashboard/" + response.data?.data?.network_id);
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
      <ModalContent>
        <ModalBody>
          <StatusIcon status="info" />
          <div className="flex flex-col gap-y-1">
            <ModalTitle className="text-brand-blue">Re-Deploy Network</ModalTitle>
            <ModalText>Are you sure you want to delete the existing network and deploy a new one?</ModalText>
          </div>
        </ModalBody>
        <ModalFooter placement="end">
          <Button variant="ghost" className="text-brand-light" onClick={onClose} isDisabled={isLoading} isFullWidth>
            Cancel
          </Button>
          <Button colorScheme="gradient" onClick={reDeployNetwork} isLoading={isLoading} isFullWidth>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReDeployNetworkModal;
