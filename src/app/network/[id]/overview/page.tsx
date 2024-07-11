import React from "react";
import { Metadata } from "next";
import Overview from "./overview";
import { getNetworkData, getNodes, getTask } from "@/db-queries";
import { ChainSpecFileType } from "@/types/chain-spec";

export const metadata: Metadata = {
  title: "Perfuse | Parachain Details",
  description: "Overview of parachain node",
};

const CreatePage = async ({
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const network = await getNetworkData(params.id);
  const nodes = await getNodes(params.id);
  const task = await getTask({ task_associated_network_id: network?.network_id, task_type: "network_provision" });
  const chainSpec: ChainSpecFileType = JSON.parse(network?.network_chain_spec_file_json ?? "");
  if (!network) {
    return <>Error while loading network. Invalid network Id</>;
  }
  // console.log(task);

  return (
    <Overview
      isLoading={false}
      createdAt={network.created_at}
      env={network.network_env}
      name={network.network_name}
      id={network.network_id}
      paraId={chainSpec.para_id.toString()}
      relayCainType={network.network_relay_chain_type}
      nodes={nodes}
      provisionedAt={task?.task_updated_at}
    />
  );
};

export default CreatePage;
