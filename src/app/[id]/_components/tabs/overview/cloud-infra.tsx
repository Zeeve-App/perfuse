"use client";

import { IconArrowUpRightFromSquare } from "@zeeve-platform/icons/arrow/outline";
import { Heading, IconButton, Tooltip, useTabsContext } from "@zeeve-platform/ui";
import { useParams } from "next/navigation";
import Image from "next/image";
import React from "react";
import KeyValuePair from "@/components/key-value-pair";
import { withBasePath } from "@/utils/helpers";
import MachineStatus from "@/components/machine-status";
import useParachainsService from "@/services/parachains/use-parachains-service";

const CloudInfra = () => {
  const params = useParams();
  const networkId = params.id as string;
  const {
    request: { data, isLoading },
  } = useParachainsService().network.overviewDetails(networkId);
  const { setActiveIndex } = useTabsContext();

  return (
    <div className="col-span-12 flex flex-col rounded-lg border border-brand-outline xl:col-span-6 2xl:col-span-3">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Heading as="h4">Cloud Infra</Heading>
          <Tooltip text={"Cloud Infra"} placement="top-start">
            <IconButton colorScheme="primary" variant={"ghost"} onClick={() => setActiveIndex(3)} size={"small"}>
              <IconArrowUpRightFromSquare className="text-xl" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 p-4 lg:gap-y-6">
        <KeyValuePair
          label="Cloud"
          value={
            data?.data.cloudInfra.cloudName ? (
              <Tooltip
                text={data?.data.cloudInfra.managed ? "Zeeve Managed" : data.data.cloudInfra.cloudName.toUpperCase()}
                placement={"top-start"}
              >
                <div className="flex gap-2">
                  <Image
                    src={withBasePath(
                      `/assets/images/clouds/${
                        data?.data.cloudInfra.managed ? "zeeve-managed" : data.data.cloudInfra.cloudName.toLowerCase()
                      }.svg`,
                    )}
                    alt={data.data.cloudInfra.cloudName}
                    width={24}
                    height={24}
                  />
                  <div className="flex flex-row items-center gap-2 text-sm">
                    {data?.data.cloudInfra.managed ? "Zeeve Managed" : data.data.cloudInfra.cloudName.toUpperCase()}
                  </div>
                </div>
              </Tooltip>
            ) : (
              "NA"
            )
          }
          className="col-span-12 md:col-span-6 xl:col-span-12"
          isLoading={isLoading}
        />
        <KeyValuePair
          label={"Status"}
          value={<MachineStatus status={data?.data.generalInfo.status} type={"icon"} />}
          className="col-span-12 md:col-span-6 xl:col-span-12"
          isLoading={isLoading}
        />
        <KeyValuePair
          label={"Region"}
          value={
            data?.data.cloudInfra.regionName
              ? `${data.data.cloudInfra.regionName.region}, ${data.data.cloudInfra.regionName.region_name}`
              : "NA"
          }
          className="col-span-12 md:col-span-6 xl:col-span-12"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CloudInfra;
