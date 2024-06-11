"use client";

import React from "react";
import { useParams } from "next/navigation";
import { IconArrowUpRightFromSquare } from "@zeeve-platform/icons/arrow/outline";
import { Heading, IconButton, Tooltip, useTabsContext } from "@zeeve-platform/ui";
import KeyValuePair from "@/components/key-value-pair";
import CardKeyValuePair from "@/components/card-key-value-pair";
import useParachainsService from "@/services/parachains/use-parachains-service";

const BlockchainConfig = () => {
  const params = useParams();
  const networkId = params.id as string;
  const {
    request: { data: networkOverviewDetailsData, isLoading: isNetworkOverviewDetailsDataLoading },
  } = useParachainsService().network.overviewDetails(networkId);

  const {
    request: { data: networkBlockHeightsData, isLoading: isNetworkBlockHeightsDataLoading },
  } = useParachainsService().network.blockHeight(networkId);

  const { setActiveIndex } = useTabsContext();
  return (
    <div className="col-span-12 flex flex-col rounded-lg border border-brand-outline xl:col-span-6 2xl:col-span-3">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Heading as="h4">Blockchain Config</Heading>
          <Tooltip text={"Blockchain Config"} placement="top-start">
            <IconButton colorScheme="primary" variant={"ghost"} onClick={() => setActiveIndex(1)} size={"small"}>
              <IconArrowUpRightFromSquare className="text-xl" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 p-4 lg:gap-y-6">
        <KeyValuePair
          label={"Parachain ID"}
          value={networkOverviewDetailsData?.data.blockchainConfig.paraID ?? "NA"}
          className="col-span-12 md:col-span-6 xl:col-span-12"
          isLoading={isNetworkOverviewDetailsDataLoading}
        />
        <KeyValuePair
          label={"Relay Chain"}
          value={networkOverviewDetailsData?.data.blockchainConfig.relayChainType ?? "NA"}
          className="col-span-12 md:col-span-6 xl:col-span-12"
          isLoading={isNetworkOverviewDetailsDataLoading}
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
