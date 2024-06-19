import React from "react";
import { Metadata } from "next";
import Overview from "./overview";
import { getNetworkData, getNodes } from "@/db-queries";
import { ChainSpecFileType } from "@/types/chain-spec";
export const metadata: Metadata = {
  title: "Create",
};

const CreatePage = async ({
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const network = await getNetworkData(params.id);
  const nodes = await getNodes(params.id);
  const chainSpec: ChainSpecFileType = JSON.parse(network?.network_chain_spec_file_json ?? "");
  if (!network) {
    return <>Error while loading network. Invalid network Id</>;
  }
  return (
    <Overview
      isLoading={false}
      createdAt={network.created_at}
      env={network.network_env}
      name={network.network_name}
      id={network.network_id}
      paraId={chainSpec.para_id.toString()}
      relayCainType={network.network_relay_chain}
      nodes={nodes}
    />
  );
};

export default CreatePage;
