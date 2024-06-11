import React from "react";
import { Metadata } from "next";
import { knexHandler } from "@/db-queries/knexfile";
import { getNetworkData, getNodes } from "@/db-queries";
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
  const nodes = await getNodes(params.id);
  return <>{JSON.stringify(nodes)}</>;
};

export default CreatePage;
