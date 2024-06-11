"use client";

import React from "react";
// import { IconArrowUpRightFromSquare } from "@zeeve-platform/icons/arrow/outline";
import { useTabsContext } from "@/lib/components/Tabs";
import { IconButton } from "@/lib/components/Button";
import { Heading } from "@/lib/components/Heading";
import { Tooltip } from "@/lib/components/Tooltip";
import CardKeyValuePair from "@/lib/components/utils/card-key-value-pair";
import KeyValuePair from "@/lib/components/utils/key-value-pair";
import SvgArrowUpRightFromSquare from "@/lib/icons/arrows/outline/ArrowUpRightFromSquare";

const BlockchainConfig = ({
  paraId,
  relayChainType,
  isLoading,
}: {
  paraId?: string;
  relayChainType?: string;
  isLoading: boolean;
}) => {
  // const {
  //   request: { data: networkOverviewDetailsData, isLoading: isNetworkOverviewDetailsDataLoading },
  // } = useParachainsService().network.overviewDetails(networkId);

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

  // const { setActiveIndex } = useTabsContext();
  return (
    <div className="col-span-12 flex flex-col rounded-lg border border-brand-outline xl:col-span-6 2xl:col-span-3">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Heading as="h4">Blockchain Config</Heading>
          <Tooltip text={"Blockchain Config"} placement="top-start">
            <IconButton colorScheme="primary" variant={"ghost"} onClick={() => {}} size={"small"}>
              <SvgArrowUpRightFromSquare className="text-xl" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 p-4 lg:gap-y-6">
        <KeyValuePair
          label={"Parachain ID"}
          value={paraId ?? "NA"}
          className="col-span-12 md:col-span-6 xl:col-span-12"
          isLoading={isLoading}
        />
        <KeyValuePair
          label={"Relay Chain"}
          value={relayChainType ?? "NA"}
          className="col-span-12 md:col-span-6 xl:col-span-12"
          isLoading={isLoading}
        />
        <div className="col-span-12 lg:col-span-12">
          <CardKeyValuePair
            label={"Parachain Block Height"}
            value={networkBlockHeightsData?.data.blockHeight}
            isLoading={isNetworkBlockHeightsDataLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default BlockchainConfig;
