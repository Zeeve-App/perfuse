"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import RegisterParachainInfo from "../../register-parachain-info";
import GeneralInfo from "./general-info";
import Nodes from "./nodes";
import BlockchainConfig from "./blockchain-config";
import CloudInfra from "./cloud-infra";
import Alerts from "./alerts";
import { useNetworkStore } from "@/store/network";
import useParachainsService from "@/services/parachains/use-parachains-service";

const Overview = () => {
  const params = useParams();
  const networkId = params.id as string;
  const [setRegistrationInfo, setNetworkInfo] = useNetworkStore((state) => [
    state.setRegistrationInfo,
    state.setNetworkInfo,
  ]);
  const {
    request: { data, isLoading },
  } = useParachainsService().network.overviewDetails(networkId);
  const {
    request: { data: networkBlockHeightsData, isLoading: isNetworkBlockHeightsDataLoading },
  } = useParachainsService().network.blockHeight(networkId);

  useEffect(() => {
    setNetworkInfo({ data: data?.data.generalInfo ?? null, isLoading });
    setRegistrationInfo({
      show:
        data?.data.generalInfo.status === "ready" && parseInt(networkBlockHeightsData?.data.blockHeight || "0") === 0,
      isLoading: isLoading || isNetworkBlockHeightsDataLoading,
    });
  }, [
    data?.data.generalInfo,
    isLoading,
    isNetworkBlockHeightsDataLoading,
    networkBlockHeightsData?.data.blockHeight,
    setNetworkInfo,
    setRegistrationInfo,
  ]);

  return (
    <div className="grid grid-cols-12 gap-3 text-brand-dark lg:gap-6">
      <RegisterParachainInfo />
      <GeneralInfo />
      <BlockchainConfig />
      <CloudInfra />
      <Nodes />
      <Alerts agentId={data?.data.generalInfo.agentId} />
    </div>
  );
};

export default Overview;
