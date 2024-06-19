import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import CreatePageClient from "./page-client";
import NoData from "./_components/no-data";
import { getNetworks } from "@/db-queries";
import { withBasePath } from "@/utils/helpers";
import { Navigation } from "@/lib/components/navigation";

export const metadata: Metadata = {
  title: "Create",
};

const CreatePage = async () => {
  const networks = await getNetworks();
  return (
    <>
      <div className="flex flex-col gap-y-3 lg:gap-y-6">
        <Navigation
          heading={"Perfuse"}
          logo={
            <Image
              src={withBasePath("/assets/images/parachains-logo.svg")}
              alt="parachains-logo"
              width={32}
              height={32}
            />
          }
          breadcrumb={{
            items: [
              {
                label: "Dashboard",
                href: "#",
                as: "a",
              },
              {
                label: "Perfuse",
                href: "#",
              },
              {
                label: "Create",
                href: "#",
                isActive: true,
              },
            ],
          }}
        />
        {networks.length < 1 ? <CreatePageClient /> : <NoData />}
      </div>
    </>
  );
};

export default CreatePage;
export const dynamic = "force-dynamic";
