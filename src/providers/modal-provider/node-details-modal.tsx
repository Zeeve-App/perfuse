"use client";
import React, { useState } from "react";

import { useParams } from "next/navigation";
import { useModalStore } from "@/store/modal";
import { formatDate, toCapitalize, toShortString } from "@/utils/helpers";
import { CREDENTIALS_TYPE } from "@/types/node";
import { CopyButton } from "@/lib/components/Button";
import { Heading } from "@/lib/components/Heading";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalTitle } from "@/lib/components/Modal";
import { Tooltip } from "@/lib/components/Tooltip";
import KeyValuePair from "@/lib/components/utils/key-value-pair";
import SvgEyeSlash from "@/lib/icons/security/outline/EyeSlash";
import SvgEye from "@/lib/icons/security/outline/Eye";
import FlagState from "@/lib/components/utils/flag-state";
import useApi from "@/api-client";
import { useNetworkStore } from "@/store/network";

const NodeDetailsModal = () => {
  const params = useParams();
  const networkId = params.id as string;
  const { isOpen, onClose, type, data: modalData } = useModalStore();
  const [rpcUsernameVisible, setRpcUsernameVisible] = useState(false);
  const isModalOpen = isOpen && type === "nodeDetails";

  const apis = useApi();

  const { data, isLoading } = apis.node(networkId, modalData.nodeDetails?.nodeId ?? "");

  const { data: blockRpcResponse, isLoading: blockRpcLoading } = apis.blockNumber();
  const blockHeight = parseInt(blockRpcResponse?.result.block.header.number ?? "0", 16);

  const formatEndpoint = (
    type: "https" | "wss",
    endpoint?: string,
    credType?: CREDENTIALS_TYPE,
    apiKey?: string,
    rpcType?: "para-rpc" | "relay-rpc" | "api",
  ) => {
    if (endpoint && credType) {
      return `${type.slice(0, -1)}://${endpoint}${credType === "api_key" ? `/${apiKey}` : ""}/${rpcType ?? "para-rpc"}`;
    }
    return "NA";
  };

  const network = useNetworkStore((e) => e.networkInfo);

  return (
    <Modal isOpen={isModalOpen} handleClose={onClose}>
      <ModalOverlay />
      <ModalContent className="max-h-screen w-full max-w-3xl overflow-y-auto">
        <ModalBody className="grid grid-cols-12">
          <div className="col-span-12 flex flex-col">
            <ModalTitle className="text-xl">
              {toCapitalize(
                modalData.nodeDetails?.nodeType || "",
                modalData.nodeDetails?.nodeType === "rpc" ? "all" : "first",
              )}{" "}
              Node Details
            </ModalTitle>
            <div className="grid grid-cols-12 gap-3 py-3 lg:gap-6">
              <KeyValuePair
                label={"Id"}
                value={
                  data?.data?.node_id ? (
                    <Tooltip text={data.data.node_id} placement={"top-start"}>
                      <div className="flex items-center gap-2">
                        {toShortString(data.data.node_id)}
                        <CopyButton text={data.data.node_id} />
                      </div>
                    </Tooltip>
                  ) : (
                    "NA"
                  )
                }
                isLoading={isLoading}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              />
              <KeyValuePair
                label={"Name"}
                value={data?.data?.node_name ?? "NA"}
                className="col-span-12 md:col-span-6 lg:col-span-4"
                isLoading={isLoading}
              />
              <KeyValuePair
                label={"Status"}
                value={network.data?.networkStatus?.toUpperCase() ?? "NA"}
                className="col-span-12 md:col-span-6 lg:col-span-4"
                isLoading={isLoading}
              />

              <KeyValuePair
                label={"Created On"}
                value={formatDate(data?.data?.created_at)}
                className="col-span-12 md:col-span-6 lg:col-span-4"
                isLoading={isLoading}
              />
              <KeyValuePair
                label={"Parchain Block Height"}
                value={blockHeight ?? "NA"}
                className="col-span-12 md:col-span-6 lg:col-span-4"
                isLoading={blockRpcLoading}
              />
            </div>

            {modalData.nodeDetails?.nodeType === "collator" ? (
              <div className="grid grid-cols-12 gap-3 py-3 lg:gap-6">
                <div className="col-span-12 rounded-lg border border-brand-outline">
                  <div className="p-3">
                    <Heading as="h5">Blochchain Config</Heading>
                  </div>
                  <div className="grid grid-cols-12 gap-3 p-3 lg:gap-6">
                    <KeyValuePair
                      label={"Collator Address"}
                      value={
                        data?.data?.node_address ? (
                          <Tooltip text={data.data.node_address} placement={"top-start"}>
                            <div className="flex items-center gap-2">
                              {toShortString(data.data.node_address)}
                              <CopyButton text={data.data.node_address} />
                            </div>
                          </Tooltip>
                        ) : (
                          "NA"
                        )
                      }
                      isLoading={isLoading}
                    />
                    {/* <KeyValuePair
                      label={"db Cache"}
                      value={data?.data.nodeBlockchainConfig?.dbCache ?? "NA"}
                      isLoading={isLoading}
                    /> */}
                  </div>
                </div>
              </div>
            ) : null}
            {modalData.nodeDetails?.nodeType === "rpc" ? (
              <div className="grid grid-cols-12 gap-3 py-3 lg:gap-6">
                <div className="col-span-12 rounded-lg border border-brand-outline">
                  <div className="p-3">
                    <Heading as="h5">RPC Endpoint</Heading>
                  </div>
                  <div className="grid grid-cols-12 gap-3 p-3 lg:gap-6">
                    <KeyValuePair
                      label={"Parachain HTTP URL"}
                      value={
                        data?.data?.node_https_enabled ? (
                          data.data.node_https_enabled ? (
                            formatEndpoint(
                              "https",
                              data.data.node_endpoint,
                              data.data.node_auth_method,
                              data.data.node_api_key,
                            ) ? (
                              <Tooltip
                                text={formatEndpoint(
                                  "https",
                                  data.data.node_endpoint,
                                  data.data.node_auth_method,
                                  data.data.node_api_key,
                                )}
                                placement={"top-start"}
                              >
                                <div className="flex items-center gap-2">
                                  {toShortString(
                                    formatEndpoint(
                                      "https",
                                      data.data.node_endpoint,
                                      data.data.node_auth_method,
                                      data.data.node_api_key,
                                    ),
                                  )}
                                  <CopyButton
                                    text={formatEndpoint(
                                      "https",
                                      data.data.node_endpoint,
                                      data.data.node_auth_method,
                                      data.data.node_api_key,
                                    )}
                                  />
                                </div>
                              </Tooltip>
                            ) : (
                              "NA"
                            )
                          ) : (
                            <FlagState flag={data?.data.node_https_enabled} />
                          )
                        ) : (
                          "NA"
                        )
                      }
                      isLoading={isLoading}
                    />
                    <KeyValuePair
                      label={"Parachain WS URL"}
                      value={
                        data?.data ? (
                          data.data.node_wss_enabled ? (
                            formatEndpoint(
                              "wss",
                              data.data.node_endpoint,
                              data.data.node_auth_method,
                              data.data.node_api_key,
                            ) ? (
                              <Tooltip
                                text={formatEndpoint(
                                  "wss",
                                  data.data.node_endpoint,
                                  data.data.node_auth_method,
                                  data.data.node_api_key,
                                )}
                                placement={"top-start"}
                              >
                                <div className="flex items-center gap-2">
                                  {toShortString(
                                    formatEndpoint(
                                      "wss",
                                      data.data.node_endpoint,
                                      data.data.node_auth_method,
                                      data.data.node_api_key,
                                    ),
                                  )}
                                  <CopyButton
                                    text={formatEndpoint(
                                      "wss",
                                      data.data.node_endpoint,
                                      data.data.node_auth_method,
                                      data.data.node_api_key,
                                    )}
                                  />
                                </div>
                              </Tooltip>
                            ) : (
                              "NA"
                            )
                          ) : (
                            <FlagState flag={data?.data.node_https_enabled} />
                          )
                        ) : (
                          "NA"
                        )
                      }
                      isLoading={isLoading}
                    />
                    <KeyValuePair
                      label={"Relay Chain HTTP URL"}
                      value={
                        data?.data?.node_https_enabled ? (
                          data.data.node_https_enabled ? (
                            formatEndpoint(
                              "https",
                              data.data.node_endpoint,
                              data.data.node_auth_method,
                              data.data.node_api_key,
                              "relay-rpc",
                            ) ? (
                              <Tooltip
                                text={formatEndpoint(
                                  "https",
                                  data.data.node_endpoint,
                                  data.data.node_auth_method,
                                  data.data.node_api_key,
                                  "relay-rpc",
                                )}
                                placement={"top-start"}
                              >
                                <div className="flex items-center gap-2">
                                  {toShortString(
                                    formatEndpoint(
                                      "https",
                                      data.data.node_endpoint,
                                      data.data.node_auth_method,
                                      data.data.node_api_key,
                                      "relay-rpc",
                                    ),
                                  )}
                                  <CopyButton
                                    text={formatEndpoint(
                                      "https",
                                      data.data.node_endpoint,
                                      data.data.node_auth_method,
                                      data.data.node_api_key,
                                      "relay-rpc",
                                    )}
                                  />
                                </div>
                              </Tooltip>
                            ) : (
                              "NA"
                            )
                          ) : (
                            <FlagState flag={data?.data.node_https_enabled} />
                          )
                        ) : (
                          "NA"
                        )
                      }
                      isLoading={isLoading}
                    />
                    <KeyValuePair
                      label={"Relay Chain WS URL"}
                      value={
                        data?.data ? (
                          data.data.node_wss_enabled ? (
                            formatEndpoint(
                              "wss",
                              data.data.node_endpoint,
                              data.data.node_auth_method,
                              data.data.node_api_key,
                              "relay-rpc",
                            ) ? (
                              <Tooltip
                                text={formatEndpoint(
                                  "wss",
                                  data.data.node_endpoint,
                                  data.data.node_auth_method,
                                  data.data.node_api_key,
                                  "relay-rpc",
                                )}
                                placement={"top-start"}
                              >
                                <div className="flex items-center gap-2">
                                  {toShortString(
                                    formatEndpoint(
                                      "wss",
                                      data.data.node_endpoint,
                                      data.data.node_auth_method,
                                      data.data.node_api_key,
                                      "relay-rpc",
                                    ),
                                  )}
                                  <CopyButton
                                    text={formatEndpoint(
                                      "wss",
                                      data.data.node_endpoint,
                                      data.data.node_auth_method,
                                      data.data.node_api_key,
                                      "relay-rpc",
                                    )}
                                  />
                                </div>
                              </Tooltip>
                            ) : (
                              "NA"
                            )
                          ) : (
                            <FlagState flag={data?.data.node_https_enabled} />
                          )
                        ) : (
                          "NA"
                        )
                      }
                      isLoading={isLoading}
                    />
                    <KeyValuePair
                      label={"Sidecar HTTP URL"}
                      value={
                        data?.data?.node_https_enabled ? (
                          data.data.node_https_enabled ? (
                            formatEndpoint(
                              "https",
                              data.data.node_endpoint,
                              data.data.node_auth_method,
                              data.data.node_api_key,
                              "api",
                            ) ? (
                              <Tooltip
                                text={formatEndpoint(
                                  "https",
                                  data.data.node_endpoint,
                                  data.data.node_auth_method,
                                  data.data.node_api_key,
                                  "api",
                                )}
                                placement={"top-start"}
                              >
                                <div className="flex items-center gap-2">
                                  {toShortString(
                                    formatEndpoint(
                                      "https",
                                      data.data.node_endpoint,
                                      data.data.node_auth_method,
                                      data.data.node_api_key,
                                      "api",
                                    ),
                                  )}
                                  <CopyButton
                                    text={formatEndpoint(
                                      "https",
                                      data.data.node_endpoint,
                                      data.data.node_auth_method,
                                      data.data.node_api_key,
                                      "api",
                                    )}
                                  />
                                </div>
                              </Tooltip>
                            ) : (
                              "NA"
                            )
                          ) : (
                            <FlagState flag={data?.data.node_https_enabled} />
                          )
                        ) : (
                          "NA"
                        )
                      }
                      isLoading={isLoading}
                    />
                    <KeyValuePair
                      label={"Authentication Type"}
                      value={
                        data?.data?.node_auth_method
                          ? data.data.node_auth_method === "api_key"
                            ? "API Key"
                            : "Basic Auth"
                          : "NA"
                      }
                      className="col-span-12 lg:col-span-6"
                      isLoading={isLoading}
                    />
                    <KeyValuePair
                      label={`Authentication ${data?.data?.node_auth_method === "api_key" ? "API Key" : "Username"}`}
                      value={
                        (
                          <div className="flex items-center">
                            <span className="mr-2">
                              {rpcUsernameVisible ? (
                                data?.data?.node_auth_method === "api_key" ? (
                                  <Tooltip text={data.data.node_auth_method ?? "NA"} placement={"top-start"}>
                                    <div className="flex items-center gap-2">
                                      {toShortString(data.data.node_auth_method ?? "NA")}
                                      <CopyButton text={data.data.node_auth_method ?? "NA"} />
                                    </div>
                                  </Tooltip>
                                ) : (
                                  data?.data?.node_username
                                )
                              ) : (
                                "*********"
                              )}
                            </span>
                            <span
                              className="cursor-pointer text-brand-primary"
                              onClick={() => setRpcUsernameVisible(!rpcUsernameVisible)}
                            >
                              {rpcUsernameVisible ? <SvgEyeSlash /> : <SvgEye />}
                            </span>
                          </div>
                        ) ?? "NA"
                      }
                      className="col-span-12 lg:col-span-6"
                      isLoading={isLoading}
                    />
                    <KeyValuePair label={"Allowed CORS"} value={data?.data ? "ALL" : "NA"} isLoading={isLoading} />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NodeDetailsModal;
