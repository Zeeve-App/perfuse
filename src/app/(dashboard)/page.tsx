import { Metadata } from "next";
import React from "react";
import { redirect } from "next/navigation";
import ListPageClient from "./page-client";
import { getNetworks } from "@/db-queries";

export const metadata: Metadata = {
  title: "Perfuse | Dashboard",
  description: "Dashboard of perfuse",
};

const ListPage = async () => {
  const networks = await getNetworks();

  if (networks.length > 0) {
    redirect("/" + networks?.[0]?.network_id);
  }

  return <ListPageClient />;
};

export default ListPage;
export const dynamic = "force-dynamic";
