import Image from "next/image";
import NetworkCard from "./_components/network-card";
import { Navigation } from "@/lib/components/navigation";
import { getNetworks } from "@/db-queries";
import { withBasePath } from "@/utils/helpers";

export default async function Home() {
  const networks = await getNetworks();
  return (
    <>
      <div className="flex flex-col gap-y-3 lg:gap-y-6">
        <Navigation
          heading={"Perfuse"}
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
        <div className="rounded-lg border border-brand-outline bg-white p-3 lg:p-6">
          <div className="grid grid-cols-12 gap-3 text-brand-dark lg:gap-6">
            {networks.map((e) => (
              <NetworkCard
                key={e.network_id}
                data={{
                  networkId: e.network_id,
                  networkName: e.network_name,
                  networkEnvironment: e.network_env,
                  networkCreatedAt: new Date(e.created_at),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
