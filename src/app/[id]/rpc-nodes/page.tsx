import React from "react";
import { Metadata } from "next";
import RpcNodes from "./my-nodes";
import { getNodes } from "@/db-queries";

export const metadata: Metadata = {
  title: "Perfuse | Parachain Details",
  description: "nodes of parachain node",
};

const CreatePage = async ({
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const nodes = await getNodes(params.id);
  return (
    <RpcNodes
      nodes={{
        rpc: nodes.filter((e) => e.node_type === "rpc"),
      }}
    />
  );
};

export default CreatePage;
