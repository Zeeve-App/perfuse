import React from "react";
import { Metadata } from "next";
import CreatePageClient from "./page-client";
import NoData from "./_components/no-data";
import { getNetworks } from "@/db-queries";

export const metadata: Metadata = {
  title: "Perfuse | Create Parachain",
  description: "Create parachain with peruse",
};

const CreatePage = async () => {
  const networks = await getNetworks();
  return (
    <>
      <div className="flex flex-col gap-y-3 lg:gap-y-6">{networks.length < 1 ? <CreatePageClient /> : <NoData />}</div>
    </>
  );
};

export default CreatePage;
export const dynamic = "force-dynamic";
