"use client";

import { CopyButton, Heading, Tooltip } from "@zeeve-platform/ui";
import { useParams } from "next/navigation";
import { IconInfoCircle } from "@zeeve-platform/icons/essential/outline";
import React from "react";
import KeyValuePair from "@/components/key-value-pair";
import NetworkNodeStatus from "@/components/network-node-status";
import { formatDate, formatIntoAge } from "@/utils/date";
import { toShortString } from "@/utils/helpers";
import useParachainsService from "@/services/parachains/use-parachains-service";

const GeneralInfo = () => {
  const params = useParams();
  const networkId = params.id as string;
  const {
    request: { data, isLoading },
  } = useParachainsService().network.overviewDetails(networkId);
  const {
    request: { data: networkBlockHeightsData, isLoading: isNetworkBlockHeightsDataLoading },
  } = useParachainsService().network.blockHeight(networkId);
  return (
    <div className="col-span-12 flex flex-col rounded-lg border border-brand-outline xl:col-span-6 2xl:col-span-6">
      <div className="p-4">
        <Heading as="h4">General Info</Heading>
      </div>
      <div className="grid grid-cols-12 gap-3 p-4 lg:gap-6">
        <KeyValuePair
          label="Name"
          value={data?.data.generalInfo.name ?? "NA"}
          className="col-span-12 md:col-span-6 xl:col-span-4"
          isLoading={isLoading}
        />
        <KeyValuePair
          label="ID"
          value={
            networkId && data?.data.generalInfo.name ? (
              <Tooltip text={networkId} placement={"top-start"}>
                <div className="flex items-center gap-2">
                  {toShortString(networkId)}
                  <CopyButton text={networkId} />
                </div>
              </Tooltip>
            ) : (
              "NA"
            )
          }
          className="col-span-12 md:col-span-6 xl:col-span-4"
          isLoading={isLoading}
        />
        <KeyValuePair
          label="Description"
          value={
            data?.data.generalInfo.description ? (
              <Tooltip text={data.data.generalInfo.description} placement={"top-start"}>
                <div className="flex items-center gap-2">
                  {toShortString(data.data.generalInfo.description)}
                  <CopyButton text={data.data.generalInfo.description} />
                </div>
              </Tooltip>
            ) : (
              "NA"
            )
          }
          className="col-span-12 md:col-span-6 xl:col-span-4"
          isLoading={isLoading}
        />
        <KeyValuePair
          label="Environment"
          value={
            data?.data.generalInfo.environment
              ? data.data.generalInfo.environment === "sandbox"
                ? "Devnet"
                : data.data.generalInfo.environment.toUpperCase()
              : "NA"
          }
          className="col-span-12 md:col-span-6 xl:col-span-4"
          isLoading={isLoading}
        />
        <KeyValuePair
          label="Owned By"
          value={data?.data.generalInfo.ownedBy ?? "NA"}
          className="col-span-12 md:col-span-6 xl:col-span-4"
          isLoading={isLoading}
        />
        <KeyValuePair
          label="Status"
          value={
            data?.data.generalInfo.status === "ready" &&
            parseInt(networkBlockHeightsData?.data.blockHeight || "0") === 0 ? (
              <Tooltip text={"Please register your Parachain"} placement="top-start">
                <span className="flex items-center">
                  <IconInfoCircle className="mr-2 text-brand-yellow" />
                  AUTHENTICATION PENDING
                </span>
              </Tooltip>
            ) : (
              <NetworkNodeStatus status={data?.data.generalInfo.status} type={"icon"} />
            )
          }
          className="col-span-12 md:col-span-6 xl:col-span-4"
          isLoading={isLoading || isNetworkBlockHeightsDataLoading}
        />
        <KeyValuePair
          label="Infra Provision Time"
          value={formatIntoAge(
            data?.data.generalInfo.infraProvisioningStartedAt,
            data?.data.generalInfo.infraProvisioningFinishedAt,
          )}
          className="col-span-12 md:col-span-6 xl:col-span-4"
          isLoading={isLoading}
        />
        <KeyValuePair
          label="Blockchain Provision Time"
          value={formatIntoAge(
            data?.data.generalInfo.blockchainProvisioningStartedAt,
            data?.data.generalInfo.blockchainProvisioningFinishedAt,
          )}
          className="col-span-12 md:col-span-6 xl:col-span-4"
          isLoading={isLoading}
        />
        <KeyValuePair
          label="Duration"
          value={formatIntoAge(data?.data.generalInfo.createdAt, new Date())}
          className="col-span-12 md:col-span-6 xl:col-span-4"
          isLoading={isLoading}
        />
        <KeyValuePair
          label="Created On"
          value={formatDate(data?.data.generalInfo.createdAt)}
          className="col-span-12 md:col-span-6 xl:col-span-4"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default GeneralInfo;
