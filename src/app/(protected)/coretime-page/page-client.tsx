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
import React from "react";
import { RegionXCard } from "./_components/regionX";
import { NetworkDbRow } from "@/db-queries";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";

/** coreTime page client component */
const CoreTimePageClient = ({ network }: { network?: NetworkDbRow }) => {
  return (
    <Card variant={"grid"} className="">
      <Heading as="h4" className="col-span-12">
        CoreTime
      </Heading>

      <RegionXCard
        protocolId={"123"}
        protocolName={"RegionX"}
        className="col-span-12"
        description={
          "RegionX is a project dedicated to developing components for the new Agile Coretime model. The goal of the project is to enable developer teams, researchers, and enthusiasts to start trading, tracking, and analyzing the product Polkadot offers."
        }
        regionXLink={`https://app.regionx.tech/regions?network=${network?.network_relay_chain_type}`}
      />
    </Card>
  );
};

export default CoreTimePageClient;
