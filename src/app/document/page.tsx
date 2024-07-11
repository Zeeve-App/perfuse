import { Metadata } from "next";
import React from "react";
import PerfuseDocument from "./page-client";

export const metadata: Metadata = {
  title: "Perfuse | Document",
  description: "Document for perfuse",
};

const CoreTimePage = async () => {
  return <PerfuseDocument />;
};

export default CoreTimePage;
export const dynamic = "force-dynamic";
