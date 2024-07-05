import { Metadata } from "next";
import React from "react";
import { redirect } from "next/navigation";
import { getNetworks } from "@/db-queries";
import CoreTimePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Perfuse | CoreTime",
  description: "CoreTime of perfuse",
};

const CoreTimePage = async () => {

  return <CoreTimePageClient />;
};

export default CoreTimePage;
export const dynamic = "force-dynamic";
