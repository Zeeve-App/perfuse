"use client";

import Link from "next/link";
import { Heading, IconButton, Tooltip } from "@zeeve-platform/ui";
import React, { useEffect, useState } from "react";
import { IconInfoCircle } from "@zeeve-platform/icons/essential/outline";
import { IconArrowUpRightFromSquare } from "@zeeve-platform/icons/arrow/outline";
import KeyValuePair from "@/components/key-value-pair";
import { NetworkInfra } from "@/services/parachains/network/network-infra-details";
import useAnalyticsService from "@/services/analytics/use-analytics-service";
import { useNetworkStore } from "@/store/network";
interface MachineDataProps {
  data?: NetworkInfra;
  isLoading: boolean;
}
/** convert bytes to Giga bytes and round it to two decimal places */
const bytesToGB = (bytes: number): string => {
  const gigabyte = 1024 * 1024 * 1000; // 1 GB = 1024^3 bytes
  const gb = bytes / gigabyte;
  return gb.toPrecision(3);
};

const Telemetry = ({
  usage,
  allocated,
  percentage,
  value,
}: {
  usage: string;
  allocated: string;
  percentage?: number;
  value?: string;
}) => {
  const numberUsage = parseFloat(usage);
  const numberAllocated = parseFloat(allocated);
  const calPercentage = typeof percentage === "number" ? percentage : (numberUsage / numberAllocated) * 100;
  if (calPercentage >= 90) {
    return <span className="text-brand-red">{value ?? numberUsage.toFixed(3)}</span>;
  } else if (calPercentage > 75) {
    return <span className="text-brand-yellow">{value ?? numberUsage.toFixed(3)}</span>;
  } else {
    return <span className="text-brand-green">{value ?? numberUsage.toFixed(3)}</span>;
  }
};

const MachineUtilization = ({ data, isLoading }: MachineDataProps) => {
  const [nodeAnalyticsUrl, setNodeAnalyticsUrl] = useState("");
  const networkInfo = useNetworkStore((state) => state.networkInfo);
  const {
    request: { data: dashboardUrlsData, isLoading: isDashboardUrlsDataLoading },
  } = useAnalyticsService().dashboardUrls(networkInfo.data?.analyticsId as string);

  useEffect(() => {
    if (dashboardUrlsData && dashboardUrlsData.length > 0) {
      const analyticsUrl = dashboardUrlsData.find((dashboardUrls) => dashboardUrls.dashboardName === "Node");
      if (analyticsUrl) {
        setNodeAnalyticsUrl(analyticsUrl.dashboardURL);
      }
    }
  }, [dashboardUrlsData]);
  return (
    <div className="col-span-12 flex flex-col rounded-lg border border-brand-outline xl:col-span-12 2xl:col-span-6">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Heading as="h4">Machine Utilization</Heading>
          <Tooltip text={"More Info"} placement="top-start">
            <Link href={nodeAnalyticsUrl} target="_blank">
              <IconButton
                colorScheme="primary"
                variant={"ghost"}
                isDisabled={!nodeAnalyticsUrl}
                isLoading={isDashboardUrlsDataLoading}
              >
                <IconArrowUpRightFromSquare className="text-xl" />
              </IconButton>
            </Link>
          </Tooltip>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 p-4 lg:gap-6">
        <KeyValuePair
          label={
            <div className="flex flex-row items-center gap-3 text-sm text-gray-500">
              CPU Cores
              <Tooltip text={"Total number of CPU Cores"} placement={"top-start"}>
                <div>
                  <IconInfoCircle />
                </div>
              </Tooltip>
            </div>
          }
          value={data?.machine.vCPU.allocated ? data.machine.vCPU.allocated : "NA"}
          className="col-span-12 lg:col-span-6 2xl:col-span-3"
          isLoading={isLoading}
        />
        <KeyValuePair
          label={
            <div className="flex flex-row items-center gap-3 text-sm text-gray-500">
              CPU Busy
              <Tooltip text={"Busy state of all CPU cores together"} placement={"top-start"}>
                <div>
                  <IconInfoCircle />
                </div>
              </Tooltip>
            </div>
          }
          value={
            data?.machine.vCPU.consumed ? (
              <Telemetry
                usage="1"
                allocated="1"
                percentage={data.machine.vCPU.consumed}
                value={`${data.machine.vCPU.consumed.toFixed(2)} %`}
              />
            ) : (
              "NA"
            )
          }
          className="col-span-12 lg:col-span-6 2xl:col-span-3"
          isLoading={isLoading}
        />
        <KeyValuePair
          label={
            <div className="flex flex-row items-center gap-3 text-sm text-gray-500">
              RAM
              <Tooltip text={"Total RAM allocated vs Total RAM used"} placement={"top-start"}>
                <div>
                  <IconInfoCircle />
                </div>
              </Tooltip>
            </div>
          }
          value={
            typeof data?.machine.ram.consumed === "number" && typeof data.machine.ram.allocated === "number" ? (
              <>
                <Telemetry
                  usage={bytesToGB(data.machine.ram.consumed)}
                  allocated={bytesToGB(data.machine.ram.allocated)}
                />{" "}
                / {bytesToGB(data.machine.ram.allocated)} <span className="text-xs text-brand-gray">GB</span>
              </>
            ) : (
              "NA"
            )
          }
          className="col-span-12 lg:col-span-6 2xl:col-span-3"
          isLoading={isLoading}
        />
        <KeyValuePair
          label={
            <div className="flex flex-row items-center gap-3 text-sm text-gray-500">
              Storage
              <Tooltip text={"Total Storage allocated vs Total Storage used"} placement={"top-start"}>
                <div>
                  <IconInfoCircle />
                </div>
              </Tooltip>
            </div>
          }
          value={
            typeof data?.machine.storage.consumed === "number" && typeof data.machine.storage.allocated === "number" ? (
              <>
                <Telemetry
                  usage={bytesToGB(data.machine.storage.consumed)}
                  allocated={bytesToGB(data.machine.storage.allocated)}
                />{" "}
                / {bytesToGB(data.machine.storage.allocated)} <span className="text-xs text-brand-gray">GB</span>
              </>
            ) : (
              "NA"
            )
          }
          className="col-span-12 lg:col-span-6 2xl:col-span-3"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default MachineUtilization;
