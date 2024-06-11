"use client";
import Image from "next/image";
import { useState } from "react";
import { DashboardCard } from "./_components/dashboard-card";
import { withBasePath } from "@/utils/helpers";
import { Navigation } from "@/lib/components/navigation";
import SvgEdit2 from "@/lib/icons/document/outline/Edit2";

const ListPageClient = () => {
  // localStorage.setItem("from", "parachains");

  // check there is no network list
  const [disable, setDisable] = useState(false);

  return (
    <div className="flex flex-col gap-y-3 lg:gap-y-6">
      <Navigation
        heading={"Parachains"}
        logo={
          <Image
            src={withBasePath("/assets/images/protocol/parachains-logo.svg")}
            alt="parachains-logo"
            width={32}
            height={32}
          />
        }
        breadcrumb={{
          items: [
            {
              href: `#`,
              label: "Dashboard",
              as: "a",
            },
            {
              href: "#",
              label: "Parachains",
              isActive: true,
            },
          ],
        }}
      >
        {/* page actions */}
      </Navigation>
      <div className="grid grid-cols-12 gap-6 rounded-lg border border-brand-outline bg-white p-3 lg:p-6">
        <DashboardCard
          title={"Deployment"}
          description={"Deploy Your first parachain"}
          href={"/create"}
          Icon={SvgEdit2}
        />
        <DashboardCard title={"My parachain"} description={"List the deployed parachains"} href={""} Icon={SvgEdit2} />
        <DashboardCard title={"Monitoring"} description={"Check real time analytics"} href={""} Icon={SvgEdit2} />
      </div>
    </div>
  );
};

export default ListPageClient;
