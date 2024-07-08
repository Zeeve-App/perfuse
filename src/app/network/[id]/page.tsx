import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getNetworkData } from "@/db-queries";

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

  if (!network) {
    return <>Error while loading network. Invalid network Id</>;
  }
  return redirect(`/network/${params.id}/overview`);
};

export default CreatePage;
export const dynamic = "force-dynamic";
