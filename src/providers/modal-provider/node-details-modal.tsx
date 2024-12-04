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

import { useParams } from "next/navigation";
import { useModalStore } from "@/store/modal";
import { formatDate, formatEndpoint, toCapitalize, toShortString } from "@/utils/helpers";
import { CopyButton } from "@/lib/components/Button";
import { Heading } from "@/lib/components/Heading";
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalTitle } from "@/lib/components/Modal";
import { Tooltip } from "@/lib/components/Tooltip";
import KeyValuePair from "@/lib/components/utils/key-value-pair";
import useApi from "@/api-client";
import NetworkStatus from "@/app/(protected)/dashboard/[id]/_components/network-status";

/** node details modal to show collator / rpc node details */
const NodeDetailsModal = () => {
  const params = useParams();
  const networkId = params.id as string;
  const { isOpen, onClose, type, data: modalData } = useModalStore();
  const isModalOpen = isOpen && type === "nodeDetails";

  const apis = useApi();

  const { data, isLoading } = apis.node(networkId, modalData.nodeDetails?.nodeId ?? "");

  const { data: blockRpcResponse, isLoading: blockRpcLoading } = apis.blockNumber();
  const blockHeight = parseInt(blockRpcResponse?.result.block.header.number ?? "0", 16);

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
              {data?.data && (
                <KeyValuePair
                  label={"Id"}
                  value={toShortString(data.data.node_id)}
                  isLoading={isLoading}
                  shouldAllowCopy
                  className="col-span-12 md:col-span-6 lg:col-span-4"
                  tooltipText={data.data.node_id}
                />
              )}
              <KeyValuePair
                label={"Name"}
                value={data?.data?.node_name ?? "NA"}
                className="col-span-12 md:col-span-6 lg:col-span-4"
                isLoading={isLoading}
              />
              <KeyValuePair
                label={"Status"}
                value={<NetworkStatus health={data?.data?.health} />}
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
                      className="col-span-12 md:col-span-6 lg:col-span-4"
                      tooltipText={data?.data?.node_address ?? "NA"}
                      value={toShortString(data?.data?.node_address)}
                      shouldAllowCopy
                      isLoading={isLoading}
                    />
                    <KeyValuePair
                      className="col-span-12 md:col-span-6 lg:col-span-4"
                      label={"Session Address"}
                      value={toShortString(data?.data?.node_collator_session_address)}
                      tooltipText={data?.data?.node_collator_session_address ?? "NA"}
                      isLoading={isLoading}
                      shouldAllowCopy
                    />
                  </div>
                </div>
              </div>
            ) : null}
            {modalData.nodeDetails?.nodeType === "rpc" ? (
              <div className="grid grid-cols-12 gap-3 py-3 lg:gap-6">
                {data?.data && (
                  <div className="col-span-12 rounded-lg border border-brand-outline">
                    <div className="p-3">
                      <Heading as="h5">RPC Endpoint</Heading>
                    </div>
                    <div className="grid grid-cols-12 gap-3 p-3 lg:gap-6">
                      <KeyValuePair
                        shouldAllowCopy
                        className="col-span-6 lg:col-span-4"
                        label={"Parachain HTTP URL"}
                        tooltipText={formatEndpoint(
                          "https",
                          data.data.node_endpoint,
                          data.data.node_auth_method,
                          data.data.node_api_key,
                        )}
                        value={toShortString(
                          formatEndpoint(
                            "https",
                            data.data.node_endpoint,
                            data.data.node_auth_method,
                            data.data.node_api_key,
                          ),
                        )}
                        isLoading={isLoading}
                      />
                      <KeyValuePair
                        className="col-span-6 lg:col-span-4"
                        label={"Parachain WS URL"}
                        tooltipText={formatEndpoint(
                          "wss",
                          data.data.node_endpoint,
                          data.data.node_auth_method,
                          data.data.node_api_key,
                        )}
                        shouldAllowCopy
                        value={toShortString(
                          formatEndpoint(
                            "wss",
                            data.data.node_endpoint,
                            data.data.node_auth_method,
                            data.data.node_api_key,
                          ),
                        )}
                        isLoading={isLoading}
                      />

                      <KeyValuePair
                        className="col-span-6 lg:col-span-4"
                        label={"Sidecar HTTP URL"}
                        shouldAllowCopy
                        tooltipText={formatEndpoint(
                          "https",
                          data.data.node_endpoint,
                          data.data.node_auth_method,
                          data.data.node_api_key,
                          "api",
                        )}
                        value={toShortString(
                          formatEndpoint(
                            "https",
                            data.data.node_endpoint,
                            data.data.node_auth_method,
                            data.data.node_api_key,
                            "api",
                          ),
                        )}
                        isLoading={isLoading}
                      />
                      <KeyValuePair
                        className="col-span-6 lg:col-span-4"
                        shouldAllowCopy
                        label={"Authentication Type"}
                        value={
                          data?.data?.node_auth_method
                            ? data.data.node_auth_method === "api_key"
                              ? "API Key"
                              : "Basic Auth"
                            : "NA"
                        }
                        isLoading={isLoading}
                      />
                      {/* <KeyValuePair
                      className="col-span-6 lg:col-span-4"
                          label={`Authentication ${data?.data?.node_auth_method === "api_key" ? "API Key" : "Username"}`}
                          value={
                            <div className="flex items-center">
                              <span className="mr-2">
                                {rpcUsernameVisible ? (
                                  data?.data?.node_auth_method === "api_key" ? (
                                    <Tooltip text={data.data.node_auth_method} placement={"top-start"}>
                                      <div className="flex items-center gap-2">
                                        {toShortString(data.data.node_auth_method)}
                                        <CopyButton text={data.data.node_auth_method} />
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
                          }
                          className="col-span-12 lg:col-span-6"
                          isLoading={isLoading}
                        /> */}
                      <KeyValuePair
                        className="col-span-6 lg:col-span-4"
                        label={"Allowed CORS"}
                        value={data?.data ? "ALL" : "NA"}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NodeDetailsModal;
