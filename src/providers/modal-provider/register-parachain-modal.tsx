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

import { useParams } from "next/navigation";
import { web3FromAddress } from "@polkadot/extension-dapp";
import { useModalStore } from "@/store/modal";
import { blobToHex, downloadFile, toShortString, withBasePath } from "@/utils/helpers";
import { IconButton, CopyButton, Button } from "@/lib/components/Button";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalTitle,
  ModalText,
  ModalFooter,
} from "@/lib/components/Modal";
import { Tooltip } from "@/lib/components/Tooltip";
import SvgDownload from "@/lib/icons/product/outline/Download";
import SvgCodeDocument3 from "@/lib/icons/programming/outline/CodeDocument3";
import useApi from "@/api-client";
import HyperLink from "@/lib/components/utils/hyper-link";
import { Typography } from "@/lib/components/Typography";
import { useSelectedAccount } from "@/lib/components/wallet/use-wallet";
import { useNetworkStore } from "@/store/network";
import { relayChainRpc } from "@/constants/constant";

/** file card to show the wasm/genesis file with checksum */
const FileCard = ({
  name,
  checksum,
  getFileContent,
}: {
  name: "wasm" | "genesis";
  checksum?: string;
  getFileContent: (x: "wasm" | "genesis") => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const api = useApi();

  return (
    <div className="col-span-12 flex flex-row items-center gap-2 md:col-span-6 2xl:col-span-6">
      <SvgCodeDocument3 className="text-5xl text-brand-primary" />
      <div>
        <div className="flex flex-row items-start gap-1">
          <Typography variant="heading">{name} File</Typography>
          <Tooltip text={`Download ${name} File`} placement="top-start">
            <IconButton
              className="h-5 border-0"
              colorScheme="green"
              variant={"ghost"}
              size={"small"}
              isLoading={isLoading}
              isDisabled={isLoading}
              onClick={() => getFileContent(name)}
            >
              <SvgDownload className="text-xl" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="text-xs text-theme-primary-content">
            {checksum ? (
              <Tooltip text={checksum} placement={"top-start"}>
                <div>
                  MD5 Checksum: <span className="font-semibold">{toShortString(checksum)}</span>
                  <CopyButton text={checksum} />
                </div>
              </Tooltip>
            ) : (
              <div>
                MD5 Checksum: <span className="font-semibold">NA</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/** parachain register model with all the files and info */
const RegisterParachainInfoModal = () => {
  // const networkId = params.id as string;
  const { isOpen, onClose, type } = useModalStore();

  const params = useParams();
  const networkId = params.id as string;

  const network = useNetworkStore();

  const [checksum, setChecksum] = useState<{ wasm: string; genesis: string }>();

  const isModalOpen = isOpen && type === "registerParachain";

  const { selectedAccount, relayChainApi } = useSelectedAccount();

  const getFileContent = async (name: "wasm" | "genesis") => {
    try {
      const { response, mimeType } = await getFileBlob(name);
      downloadFile(response.data, `${name.toLowerCase()}-${networkId}`, mimeType);
    } catch (error) {
      console.error(`getFileContent-${name}: `, error);
    } finally {
    }
  };
  async function getFileBlob(
    name: "wasm" | "genesis",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<{ response: any; mimeType?: "application/json" | "application/octet-stream" }> {
    const mimeType = "application/octet-stream";
    const response = await api.file(name, {
      headers: {
        Accept: mimeType,
        "Content-Type": "application/json",
      },
      responseType: "blob",
    });
    return { response, mimeType };
  }

  // Function to register a parachain
  async function registerParachain() {
    try {
      if (!selectedAccount?.address) throw new Error("No account selected");
      if (!relayChainApi) throw new Error("No relay chain api found");
      const injector = await web3FromAddress(selectedAccount?.address);

      console.log(`Using account: ${selectedAccount?.address}`);

      // Step 5: Define parachain registration parameters
      const paraId = network.networkInfo.data?.parachainId; // Replace with your parachain ID
      const genesisHead = await blobToHex((await getFileBlob("genesis")).response.data); // Replace with your parachain's genesis head
      const validationCode = await blobToHex((await getFileBlob("wasm")).response.data); // Replace with your parachain's validation code

      console.log({ genesisHead, validationCode, paraId });

      console.log(Object.keys(relayChainApi.tx.registrar));

      // Step 6: Submit the transaction to register the parachain
      const unsub = await relayChainApi.tx.registrar
        .register(paraId, validationCode, genesisHead)
        .signAndSend(selectedAccount?.address, { signer: injector.signer }, ({ status, events }) => {
          if (status.isInBlock) {
            console.log(`Transaction included in block: ${status.asInBlock}`);
          } else if (status.isFinalized) {
            console.log(`Transaction finalized in block: ${status.asFinalized}`);
            unsub(); // Unsubscribe from updates
          }
        });
    } catch (error) {
      console.error("Error during parachain registration:", error);
    }
  }

  const api = useApi();
  const getChecksum = async () => {
    try {
      const res = await api.file("checksum.json", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (res.data) {
        setChecksum(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    isModalOpen && getChecksum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  return (
    <Modal isOpen={isModalOpen} handleClose={onClose}>
      <ModalOverlay />
      <ModalContent className="max-h-screen w-full max-w-2xl overflow-y-auto">
        <ModalBody>
          {/* <StatusIcon status="error" /> */}
          <div className="flex flex-col gap-y-1">
            <ModalTitle className="text-xl">Register Parachain</ModalTitle>
            <ModalText>
              Parachain setup will be done only when you authorize it by registering it on the relay chain. Please
              upload the <span className="font-semibold">WASM</span> and <span className="font-semibold">Genesis</span>{" "}
              files of the parachain to the relay chain. Refer to the{" "}
              <HyperLink
                href={"https://github.com/Zeeve-App/perfuse/blob/main/docs/tutorial/parachain-registration.md"}
                onClick={() => {
                  onClose();
                }}
                target="_blank"
              >
                Parachain registration
              </HyperLink>{" "}
              documentation for detailed instructions.
            </ModalText>
            {/*  <ModalText>
              You can follow this github{" "}
              <HyperLink
                href={withBasePath("/coretime-page")}
                onClick={() => {
                  onClose();
                }}
              >
                document
              </HyperLink>{" "}
              for the details steps to register the parachain.
            </ModalText> */}
            <div className="grid grid-cols-12 gap-3 py-4 lg:gap-y-6">
              <FileCard name={"wasm"} checksum={checksum?.wasm} getFileContent={getFileContent} />
              <FileCard name={"genesis"} checksum={checksum?.genesis} getFileContent={getFileContent} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter placement="end">
          <Button variant="ghost" colorScheme={"accent"} onClick={onClose}>
            Close
          </Button>
          {/* <Button variant="ghost" colorScheme={"accent"} onClick={registerParachain}>
            Register ParaId
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegisterParachainInfoModal;
