import React from "react";
import { Metadata } from "next";
import BlockchainConfig from "./_copmonents/blockchain-config";
import { getNetworkData } from "@/db-queries";
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
  return (
    <BlockchainConfig
      chainSpecJSON={JSON.parse(network?.network_chain_spec_file_json ?? "")}
      relayChain={{
        type: network?.network_relay_chain,
        version: network?.network_relay_chain_version,
      }}
    />
  );
};

export default CreatePage;
export const dynamic = "force-dynamic";
