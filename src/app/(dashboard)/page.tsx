import { Metadata } from "next";
import React from "react";
import ListPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Perfuse | Dashboard",
  description: "Dashboard of perfuse",
};

const ListPage = () => {
  return <ListPageClient />;
};

export default ListPage;
