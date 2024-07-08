import { Metadata } from "next";
import React from "react";
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
