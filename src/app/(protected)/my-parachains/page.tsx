/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * Copyright (C) 2024 [Perfuse]
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import Image from "next/image";
import { Metadata } from "next";
import NetworkCard from "./_components/network-card";
import NoData from "./_components/no-data";
import { Navigation } from "@/lib/components/navigation";
import { getNetworks } from "@/db-queries";
import { withBasePath } from "@/utils/helpers";

/** my parachain page metadata */
export const metadata: Metadata = {
  title: "Perfuse | My Parachains",
  description: "Parachain nodes of perfuse",
};

/** my parachain page component */
export default async function Home() {
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
                href: "/",
                as: "a",
              },
              {
                label: "My Parachains",
                href: "#",
                isActive: true,
              },
            ],
          }}
        />
        <div className="rounded-lg border border-brand-outline bg-white p-3 lg:p-6">
          <div className="grid grid-cols-12 gap-3 text-brand-dark lg:gap-6">
            {networks.length > 0 ? (
              networks.map((e) => (
                <NetworkCard
                  key={e.network_id}
                  data={{
                    networkId: e.network_id,
                    networkName: e.network_name,
                    networkEnvironment: e.network_env,
                    networkCreatedAt: new Date(e.created_at),
                  }}
                />
              ))
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
