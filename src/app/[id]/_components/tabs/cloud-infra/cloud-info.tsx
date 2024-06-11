"use client";

import Image from "next/image";
import React from "react";
import { Heading, Tooltip } from "@zeeve-platform/ui";
import KeyValuePair from "@/components/key-value-pair";
import { withBasePath } from "@/utils/helpers";
import MachineStatus from "@/components/machine-status";
import { NetworkInfra } from "@/services/parachains/network/network-infra-details";
interface CloudInfraDataProps {
  data?: NetworkInfra;
  isLoading: boolean;
}
const CloudInfo = ({ data, isLoading }: CloudInfraDataProps) => {
  return (
    <div className="col-span-12 flex flex-col rounded-lg border border-brand-outline xl:col-span-12 2xl:col-span-6">
      <div className="p-4">
        <Heading as="h4">Cloud Info</Heading>
      </div>
      <div className="grid grid-cols-12 gap-3 p-4 lg:gap-6">
        <KeyValuePair
          label="Cloud"
          value={
            data?.cloud.name ? (
              <Tooltip
                text={data.cloud.managed ? "Zeeve Managed" : data.cloud.name.toUpperCase()}
                placement={"top-start"}
              >
                <div className="flex gap-2">
                  <Image
                    src={withBasePath(
                      `/assets/images/clouds/${
                        data.cloud.managed ? "zeeve-managed" : data.cloud.name.toLowerCase()
                      }.svg`,
                    )}
                    alt={data.cloud.name}
                    width={24}
                    height={24}
                  />
                  <div className="flex flex-row items-center gap-2 text-sm">
                    {data.cloud.managed ? "Zeeve Managed" : data.cloud.name.toUpperCase()}
                  </div>
                </div>
              </Tooltip>
            ) : (
              "NA"
            )
          }
          className="col-span-12 lg:col-span-6 2xl:col-span-4"
          isLoading={isLoading}
        />
        <KeyValuePair
          label={"Region"}
          value={data?.cloud.region ? `${data.cloud.region.region}, ${data.cloud.region.region_name}` : "NA"}
          className="col-span-12 lg:col-span-5"
          isLoading={isLoading}
        />
        <KeyValuePair
          label={"Status"}
          value={<MachineStatus status={data?.network.status} type={"icon"} />}
          className="col-span-12 lg:col-span-6 2xl:col-span-3"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CloudInfo;
