"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useModalStore } from "@/store/modal";
import { downloadFile, toShortString, withBasePath } from "@/utils/helpers";
// import useParachainsService from "@/services/parachains/use-parachains-service";
import { IconButton, CopyButton, Button } from "@/lib/components/Button";
import { Heading } from "@/lib/components/Heading";
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
import KeyValuePairInput from "@/lib/components/utils/key-value-pair-input";
import HyperLink from "@/lib/components/utils/hyper-link";

const FileCard = ({ name, checksum }: { name: "wasm" | "genesis"; checksum?: string }) => {
  const params = useParams();
  const networkId = params.id as string;
  const [isLoading, setIsLoading] = useState(false);
  const api = useApi();
  const getFileContent = async () => {
    try {
      setIsLoading(true);
      const mimeType = "application/octet-stream";
      const response = await api.file(name, {
        headers: {
          Accept: mimeType,
          "Content-Type": "application/json",
        },
        responseType: "blob",
      });
      downloadFile(response.data, `${name.toLowerCase()}-${networkId}`, mimeType);
    } catch (error) {
      console.error(`getFileContent-${name}: `, error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="col-span-12 flex flex-row items-center gap-2 md:col-span-6 2xl:col-span-6">
      <SvgCodeDocument3 className="text-5xl text-brand-primary" />
      <div>
        <div className="flex flex-row items-start gap-1">
          <div>{name} File</div>
          <Tooltip text={`Download ${name} File`} placement="top-start">
            <IconButton
              className="h-5 border-0"
              colorScheme="green"
              variant={"ghost"}
              size={"small"}
              isLoading={isLoading}
              isDisabled={isLoading}
              onClick={getFileContent}
            >
              <SvgDownload className="text-xl" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="text-xs text-brand-gray">
            {checksum ? (
              <Tooltip text={checksum} placement={"top-start"}>
                <div>
                  MD5 Checksum: <span className="text-brand-dark">{toShortString(checksum)}</span>
                  <CopyButton text={checksum} />
                </div>
              </Tooltip>
            ) : (
              <div>
                MD5 Checksum: <span className="text-brand-dark">NA</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterParachainInfoModal = () => {
  // const networkId = params.id as string;
  const { isOpen, onClose, type } = useModalStore();

  const [checksum, setChecksum] = useState<{ wasm: string; genesis: string }>();

  const [showSeed, setShowSeed] = useState<boolean>(false);

  const isModalOpen = isOpen && type === "registerParachain";

  // const networkInfo = useNetworkStore((state) => state.networkInfo);

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
              Parachain setup will be done only when you authorize it by registering it on the relay chain. You need to
              upload the <span className="text-brand-dark">WASM</span> and{" "}
              <span className="text-brand-dark">Genesis</span> file of the parachain on{" "}
              <HyperLink
                href={withBasePath("/coretime-page")}
                onClick={() => {
                  onClose();
                }}
              >
                coretime.
              </HyperLink>
            </ModalText>
            <ModalText>
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
            </ModalText>
            <div className="grid grid-cols-12 gap-3 py-4 lg:gap-y-6">
              <FileCard name={"wasm"} checksum={checksum?.wasm} />
              <FileCard name={"genesis"} checksum={checksum?.genesis} />
            </div>
            <div className="grid grid-cols-12 gap-3 py-4 lg:gap-y-6">
              <KeyValuePairInput
                label={"Secret phrase"}
                value={toShortString("swing load season two jealous fix car prosper grow tattoo banner beef", 5, 5)}
                className="col-span-12 lg:col-span-6"
                shouldAllowCopy
                type="password"
                copyText="swing load season two jealous fix car prosper grow tattoo banner beef"
                showPassword={showSeed}
                togglePasswordShow={() => {
                  setShowSeed(!showSeed);
                }}
              />
              <KeyValuePairInput
                label={"Public key (SS58)"}
                value={toShortString("5CLoLmrkX2AWarCLycCxe5RPy7tiMrHedZjipZTiyH87eZgY", 5, 5)}
                className="col-span-12 lg:col-span-6"
                shouldAllowCopy
                copyText="5CLoLmrkX2AWarCLycCxe5RPy7tiMrHedZjipZTiyH87eZgY"
              />
            </div>
            {/* <div className="p-2">
              <Heading as="h6" className="text-brand-dark">
                1. To Reserve ParaId
              </Heading>
              <div className="p-2 text-sm text-brand-gray">
                a. Reserve ParaId by going to explorer.
                <br />
                b. Navigate to{" "}
                <span className="italic text-brand-primary">Network-&gt;Parachains-&gt;Parathread-&gt;ParaId</span>
                .
                <Image
                  className="py-2"
                  src={withBasePath(`/assets/images/meta/reserve-para-id.png`)}
                  alt={"reserve-para-id.png"}
                  width={600}
                  height={600}
                />
              </div>
            </div>
            <div className="p-2">
              <Heading as="h6" className="text-brand-dark">
                2. Upload genesis wasm and state files to the relay chain
              </Heading>
              <div className="p-2 text-sm text-brand-gray">
                a. Go to polkadot explorer and under the <span className="font-semibold italic">Developer</span> nav
                select{""} <span className="font-semibold italic">Sudo</span>.
                <Image
                  className="py-2"
                  src={withBasePath(`/assets/images/meta/sudo-tab.png`)}
                  alt={"reserve-para-id.png"}
                  width={600}
                  height={600}
                />
                <br />
                b. Select the apis:{" "}
                <span className="italic text-brand-primary">parasSudoWrapper-&gt;sudoScheduleParaInitialize</span>.
                <br />
                c. Fill in the appropriate values of <span className="font-semibold italic">Paraid</span>,{" "}
                <span className="font-semibold italic">Genesis file</span> and{" "}
                <span className="font-semibold italic">Genesis Wasm</span> which we have generated previously and
                Submit.
                <Image
                  className="py-2"
                  src={withBasePath(`/assets/images/meta/register-with-sudo.png`)}
                  alt={"reserve-para-id.png"}
                  width={600}
                  height={600}
                />
              </div>
            </div>
            <div className="text-center text-sm font-semibold">
              Your collator node will start generating blocks and finalizing them from the next or two epoch duration.
            </div> */}
          </div>
        </ModalBody>
        <ModalFooter placement="end">
          <Button variant="ghost" colorScheme={"primary"} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegisterParachainInfoModal;
