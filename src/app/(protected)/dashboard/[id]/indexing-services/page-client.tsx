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

"use client";
import React from "react";
import { IndexingServiceCard } from "./_components/indexing-service-card";
import { NetworkDbRow } from "@/db-queries";
import { Card } from "@/lib/components/Card";
import { useModalStore } from "@/store/modal";

/** coreTime page client component */
const IndexingServiceComponent = ({ networkId }: { networkId: string }) => {
  const { openModal } = useModalStore();
  return (
    <Card variant={"grid-no-pad"} className="items-start">
      <IndexingServiceCard
        protocolId={"123"}
        protocolName={"Traceye"}
        className="col-span-12 md:col-span-6 lg:col-span-3 "
        description={
          "Traceye combines its most reliable enterprise-grade infrastructure with The Graph’s data  indexing protocol to provide an easy, predictable, and smooth experience for using subgraphs and subquery."
        }
        serviceLink={`https://app.traceye.io`}
        docLink={`https://github.com/Zeeve-App/perfuse/blob/main/docs/tutorial/indexing-service.md`}
        imageSrc={"/assets/images/indexing-service/traceye-logo.svg"}
      />
      <IndexingServiceCard
        protocolId={"123"}
        protocolName={"Subquery"}
        className="col-span-12 md:col-span-6 lg:col-span-3 "
        description={"SubQuery is an Open, Flexible, Fast and Universal data indexing framework for web3."}
        docLink={`https://docs.zeeve.io/traceye/shared-indexing/hosted-subquery`}
        imageSrc={"/assets/images/indexing-service/subquery-logo.png"}
        onPrimaryClick={() => {
          openModal("deploySubquery", { deploySubquery: { networkId: networkId ?? "" } });
        }}
        primaryButton={"Deploy"}
      />
    </Card>
  );
};

export default IndexingServiceComponent;
