"use client";

import React from "react";
import { formatDate, toShortString } from "@/utils/helpers";
import { CopyButton } from "@/lib/components/Button";
import { Heading } from "@/lib/components/Heading";
import { Tooltip } from "@/lib/components/Tooltip";
import KeyValuePair from "@/lib/components/utils/key-value-pair";

const GeneralInfo = ({
  isLoading,
  name,
  id,
  env,
  createdAt,
}: {
  isLoading: boolean;
  name?: string;
  id?: string;
  env?: string;
  createdAt?: string | Date;
}) => {
  // const {
  //   request: { data: networkBlockHeightsData, isLoading: isNetworkBlockHeightsDataLoading },
  // } = useParachainsService().network.blockHeight(networkId);
  const {
    request: { data: networkBlockHeightsData, isLoading: isNetworkBlockHeightsDataLoading },
  } = {
    request: {
      data: {
        data: {
          blockHeight: 23,
        },
      },
      isLoading: false,
    },
  };
  return (
    <div className="col-span-12 flex flex-col rounded-lg border border-brand-outline xl:col-span-6 2xl:col-span-4">
      <div className="p-4">
        <Heading as="h4">General Info</Heading>
      </div>
      <div className="grid grid-cols-12 gap-3 p-4 lg:gap-6">
        <KeyValuePair
          label="Name"
          value={name ?? "NA"}
          className="col-span-12 md:col-span-6 xl:col-span-6"
          isLoading={isLoading}
        />
        <KeyValuePair
          label="ID"
          value={
            id ? (
              <Tooltip text={id} placement={"top-start"}>
                <div className="flex items-center gap-2">
                  {toShortString(id)}
                  <CopyButton text={id} />
                </div>
              </Tooltip>
            ) : (
              "NA"
            )
          }
          className="col-span-12 md:col-span-6 xl:col-span-6"
          isLoading={isLoading}
        />
        {/* <KeyValuePair
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
          className="col-span-12 md:col-span-6 xl:col-span-6"
          isLoading={isLoading}
        /> */}
        <KeyValuePair
          label="Environment"
          value={env ? env.toUpperCase() : "NA"}
          className="col-span-12 md:col-span-6 xl:col-span-6"
          isLoading={isLoading}
        />
        {/* <KeyValuePair
          label="Owned By"
          value={data?.data.generalInfo.ownedBy ?? "NA"}
          className="col-span-12 md:col-span-6 xl:col-span-4"
          isLoading={isLoading}
        /> */}
        {/* <KeyValuePair
          label="Infra Provision Time"
          value={formatIntoAge(
            data?.data.generalInfo.infraProvisioningStartedAt,
            data?.data.generalInfo.infraProvisioningFinishedAt,
          )}
          className="col-span-12 md:col-span-6 xl:col-span-4"
          isLoading={isLoading}
        /> */}
        {/* <KeyValuePair
          label="Blockchain Provision Time"
          value={formatIntoAge(
            data?.data.generalInfo.blockchainProvisioningStartedAt,
            data?.data.generalInfo.blockchainProvisioningFinishedAt,
          )}
          className="col-span-12 md:col-span-6 xl:col-span-4"
          isLoading={isLoading}
        /> */}
        {/* <KeyValuePair
          label="Duration"
          value={formatIntoAge(data?.data.generalInfo.createdAt, new Date())}
          className="col-span-12 md:col-span-6 xl:col-span-4"
          isLoading={isLoading}
        /> */}
        <KeyValuePair
          label="Created On"
          value={createdAt ? formatDate(createdAt) : "NA"}
          className="col-span-12 md:col-span-6 xl:col-span-4"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default GeneralInfo;
