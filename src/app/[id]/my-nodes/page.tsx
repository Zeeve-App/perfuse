import React from "react";
import { Metadata } from "next";
import MyNodes from "./my-nodes";
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
  const nodes = await getNodes(params.id);
  return (
    <MyNodes
      nodes={{
        collator: nodes.filter((e) => e.node_type === "collator"),
        rpc: nodes.filter((e) => e.node_type === "rpc"),
      }}
    />
  );
};

export default CreatePage;
