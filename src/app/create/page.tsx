import React from "react";
import { Metadata } from "next";
import CreatePageClient from "./page-client";

export const metadata: Metadata = {
  title: "Create",
};

const CreatePage = () => {
  return <CreatePageClient />;
};

export default CreatePage;
