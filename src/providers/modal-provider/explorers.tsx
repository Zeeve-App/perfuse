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
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useModalStore } from "@/store/modal";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalTitle, ModalText } from "@/lib/components/Modal";
import { Card } from "@/lib/components/Card";
import { IconCard } from "@/lib/components/Card/Icon-Card";
import { tx } from "@/utils/shared";
import useApi from "@/api-client";
import HTTP_STATUS from "@/constants/http";
import { useToast } from "@/lib/components/Toast";
import { ParachainsServiceError } from "@/api-client/types";
import { Badge } from "@/lib/components/Badge/Badge";
import SvgExclamationTriangle from "@/lib/icons/essential/outline/ExclamationTriangle";
import { useNetworkStore } from "@/store/network";

/** explorer modal to list all the explorer */
const ExplorersModal = () => {
  const toast = useToast();
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const { isOpen, onClose, type, data } = useModalStore();

  const isModalOpen = isOpen && type === "explorers";
  /** getting params from the url */
  const params = useParams();
  const networkId = params.id as string;
  const apis = useApi();
  const { data: network } = apis.network(networkId);
  console.log("network", data);

  const handleInstall = async (service: "polkadotjs" | "statescan") => {
    try {
      if (isDisabled) {
        toast("Action acan be performed once existing task is completed", {
          status: "error",
        });
        return;
      }
      setLoading(true);
      const payload = {
        serviceName: service,
      };
      const response = await apis.enableService(networkId, payload);
      if (response.status === HTTP_STATUS.OK && response.data.success) {
        toast(`${service} installing`, {
          message: `Started installing ${service}`,
          status: "success",
        });
      }
      router.refresh();
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
  const handleClick = async (serviceLink: string, isActive: boolean) => {
    if (isDisabled && !isActive) {
      toast("Action acan be performed once existing task is completed", {
        status: "error",
      });
      return;
    }
    if (serviceLink) {
      window.open(serviceLink);
    }
  };
  const pendinfTasks = useNetworkStore((e) => e.tasks.data);
  const isDisabled = pendinfTasks?.length > 0;
  return (
    <Modal isOpen={isModalOpen} handleClose={onClose}>
      <ModalOverlay />
      <ModalContent className="max-h-screen w-full max-w-3xl overflow-y-auto">
        <ModalBody className="grid grid-cols-12">
          <div className="col-span-12">
            <ModalTitle className="col-span-12 text-xl">Explorers</ModalTitle>
            <ModalText className="col-span-12">Please choose a explorer</ModalText>
          </div>
          {isDisabled && (
            <Badge className="col-span-12 flex items-center gap-4 rounded-md p-4 text-lg" variant="red">
              <SvgExclamationTriangle className="size-10" />
              These Actions can be performed once existing task:{" "}
              {pendinfTasks?.[0]?.task_type?.replaceAll("_", " ").toLocaleUpperCase()} is completed.
            </Badge>
          )}
          <Card variant={"grid-no-pad"} className="col-span-12 items-start justify-start">
            <Card
              variant={"grid-no-pad"}
              className={tx(
                "relative md:col-span-4 col-span-12 items-center justify-between rounded-lg bg-theme-background",
              )}
            >
              <IconCard
                protocolId={"123"}
                protocolName={<>Polkadot&nbsp;Explorer</>}
                className={
                  data.explorers?.isSelected.polkadot
                    ? "col-span-12 bg-theme-background"
                    : "col-span-12 bg-theme-background opacity-30"
                }
                description={
                  "The Polkadot.js Explorer is a tool that allows users to interact with Substrate-based blockchains such as Polkadot, Kusama, and other parachains. It provides features for exploring blockchain data, sending transactions, managing accounts, and interacting with smart contracts."
                }
                serviceLink={data.explorers?.polkadotLink ?? ""}
                //   docLink={`https://docs.zeeve.io/traceye/shared-indexing/hosted-subquery`}
                imageSrc={"/assets/images/modals/explorers/polkadot-explorer.svg"}
                isSelected={data.explorers?.isSelected.polkadot ?? false}
                btnText={
                  data.explorers?.isSelected.polkadot && !network?.data?.polkadot_active ? "Click to Install" : "Visit"
                }
                isLoading={isLoading}
                onClick={() => {
                  data.explorers?.isSelected.polkadot && !network?.data?.polkadot_active
                    ? handleInstall("polkadotjs")
                    : handleClick(data.explorers?.polkadotLink || "", network?.data?.polkadot_active || false);
                }}
              />
              {/* {data.explorers?.isSelected.polkadot && (
                <div className="absolute inset-x-0 bottom-0 p-2 pb-3">
                  <Button
                    className="col-span-2 w-full"
                    variant={"solid"}
                    colorScheme={"gradient"}
                    onClick={() => {
                      installExplorer("polkadotjs");
                    }}
                  >
                    Click to Install
                  </Button>
                </div>
              )} */}
            </Card>
            <div className="col-span-12  rounded-lg bg-theme-foreground md:col-span-4">
              <IconCard
                protocolId={"123"}
                protocolName={<>Statescan&nbsp;Explorer</>}
                // className="col-span-12 bg-theme-background md:col-span-4"
                description={
                  "Statescan is a modularized and business pluggable explorer for substrate based chains. It provides features for exploring blockchain data, sending transactions, managing accounts, and interacting with smart contracts."
                }
                serviceLink={data.explorers?.stateScanLink ?? ""}
                //   docLink={`https://docs.zeeve.io/traceye/shared-indexing/hosted-subquery`}
                imageSrc={"/assets/images/modals/explorers/statescan-explorer.svg"}
                isSelected={data.explorers?.isSelected.statescan ?? false}
                btnText={
                  data.explorers?.isSelected.statescan && !network?.data?.statescan_active
                    ? "Click to Install"
                    : "Visit"
                }
                isLoading={isLoading}
                onClick={() => {
                  data.explorers?.isSelected.statescan && !network?.data?.statescan_active
                    ? handleInstall("statescan")
                    : handleClick(data.explorers?.stateScanLink || "", network?.data?.polkadot_active || false);
                }}
              />
            </div>
            {/* <IconCard
              protocolId={"123"}
              protocolName={<>Polkadot&nbsp;Explorer</>}
              className="col-span-12 bg-theme-background md:col-span-4"
              description={
                "The Polkadot.js Explorer is a tool that allows users to interact with Substrate-based blockchains such as Polkadot, Kusama, and other parachains. It provides features for exploring blockchain data, sending transactions, managing accounts, and interacting with smart contracts."
              }
              serviceLink={data.explorers?.polkadotLink ?? ""}
              //   docLink={`https://docs.zeeve.io/traceye/shared-indexing/hosted-subquery`}
              imageSrc={"/assets/images/modals/explorers/polkadot-explorer.svg"}
            /> */}
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExplorersModal;
