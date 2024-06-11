import React from "react";
import { Metadata } from "next";
import BlockchainConfig from "./blockchain-config";
import { getNetworkData } from "@/db-queries";
export const metadata: Metadata = {
  title: "Create",
};

const CreatePage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const network = await getNetworkData(params.id);
  return <BlockchainConfig chainSpecJSON={JSON.parse(network?.network_chain_spec_file_json ?? "")} />;
};

export default CreatePage;
