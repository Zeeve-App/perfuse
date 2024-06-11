import { Metadata } from "next";
import React from "react";
import ListPageClient from "./page-client";

export const metadata: Metadata = {
  description: "Parachain List",
};

const ListPage = () => {
  return <ListPageClient />;
};

export default ListPage;
