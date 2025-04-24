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
import React from "react";
import { useModalStore } from "@/store/modal";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalTitle, ModalText } from "@/lib/components/Modal";
import { Card } from "@/lib/components/Card";
import { IconCard } from "@/lib/components/Card/Icon-Card";
import { tx } from "@/utils/shared";
import { Button } from "@/lib/components/Button";
import { installExplorer } from "./helper";
import useApi from "@/api-client";
import { useParams } from "next/navigation";

/** explorer modal to list all the explorer */
const ExplorersModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();

  const isModalOpen = isOpen && type === "explorers";
  /** getting params from the url */
  const params = useParams();
  const networkId = params.id as string;
  const apis = useApi();
  const { data: network } = apis.network(networkId);

  return (
    <Modal isOpen={isModalOpen} handleClose={onClose}>
      <ModalOverlay />
      <ModalContent className="max-h-screen w-full max-w-3xl overflow-y-auto">
        <ModalBody className="grid grid-cols-12">
          <div className="col-span-12">
            <ModalTitle className="col-span-12 text-xl">Explorers</ModalTitle>
            <ModalText className="col-span-12">Please choose a explorer</ModalText>
          </div>
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
              />
              {data.explorers?.isSelected.polkadot && (
                <div className="inset-x-0 bottom-0 p-2 pb-3 absolute">
                  <Button
                    className="col-span-2 w-full"
                    variant={"solid"}
                    colorScheme={"gradient"}
                    onClick={() => {
                      // installExplorer("polkadotjs");
                    }}
                  >
                    Click to Install
                  </Button>
                </div>
              )}
            </Card>
            <div className="col-span-12  md:col-span-4 rounded-lg bg-theme-foreground">
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
