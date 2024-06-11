"use client";

import React from "react";
import { useParams } from "next/navigation";
import RegisterParachainInfo from "../../../overview/register-parachain-info";
import CloudInfo from "./cloud-info";
import MachineUtilization from "./machine-utilization";
import useParachainsService from "@/services/parachains/use-parachains-service";

const CloudInfra = () => {
  const params = useParams();
  const {
    request: { isLoading, data },
  } = useParachainsService().network.infraDetails(params.id as string);

  return (
    <div className="grid grid-cols-12 gap-3 text-brand-dark lg:gap-6">
      <RegisterParachainInfo />
      <CloudInfo data={data?.data} isLoading={isLoading} />
      <MachineUtilization data={data?.data} isLoading={isLoading} />
    </div>
  );
};

export default CloudInfra;
