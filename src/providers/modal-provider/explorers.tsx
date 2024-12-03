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

/** explorer modal to list all the explorer */
const ExplorersModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();

  const isModalOpen = isOpen && type === "explorers";

  return (
    <Modal isOpen={isModalOpen} handleClose={onClose}>
      <ModalOverlay />
      <ModalContent className="max-h-screen w-full max-w-3xl overflow-y-auto">
        <ModalBody className="grid grid-cols-12">
          <div className="col-span-12">
            <ModalTitle className="col-span-12 text-xl">Explorers</ModalTitle>
            <ModalText className="col-span-12">Please choose a explorer</ModalText>
          </div>
          <Card variant={"grid-no-pad"} className="col-span-12 ">
            <IconCard
              protocolId={"123"}
              protocolName={<>Polkadot&nbsp;Explorer</>}
              className="col-span-12 bg-theme-background md:col-span-4"
              description={
                "The Polkadot.js Explorer is a tool that allows users to interact with Substrate-based blockchains such as Polkadot, Kusama, and other parachains. It provides features for exploring blockchain data, sending transactions, managing accounts, and interacting with smart contracts."
              }
              serviceLink={data.explorers?.polkadotLink ?? ""}
              //   docLink={`https://docs.zeeve.io/traceye/shared-indexing/hosted-subquery`}
              imageSrc={"/assets/images/modals/explorers/polkadot-explorer.svg"}
            />
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
            />
            <IconCard
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
