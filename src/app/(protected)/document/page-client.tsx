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
import { Card } from "@/lib/components/Card";
import { Typography } from "@/lib/components/Typography";
import HyperLink from "@/lib/components/utils/hyper-link";

const PerfuseDocument = () => {
  return (
    <Card className="gap-2 shadow-brand-shadow lg:gap-4">
      <div className="col-span-12 flex flex-col gap-1">
        <Typography variant="title" className="col-span-12 text-2xl font-semibold">
          Perfuse Document
        </Typography>
        <Typography variant="paragraph" className="col-span-12">
          Perfuse is complete solution to deploy parachain and manage parachain in polkadot networks.
        </Typography>
      </div>
      <div className="col-span-12 flex flex-col gap-1">
        <Typography variant="subtitle" className="col-span-12">
          Deploying Network
        </Typography>
        <Typography variant="paragraph" className="col-span-12">
          User can setup the perfuse locally by following the{" "}
          <HyperLink target={"_blank"} href={"https://github.com/Zeeve-App/perfuse/blob/main/README.md"}>
            Setup guide.{" "}
          </HyperLink>{" "}
          Once the project is setup locally, you can go to the <HyperLink href={"/"}> Dashboard </HyperLink> to create
          the network from UI by selecting the appropriate options. For more detailed documentation, you can visit
          github{" "}
          <HyperLink
            target={"_blank"}
            href={"https://github.com/Zeeve-App/perfuse/blob/main/docs/tutorial/create-network.md"}
          >
            read me.
          </HyperLink>
        </Typography>
      </div>
      <div className="col-span-12 flex flex-col gap-1">
        <Typography variant="subtitle" className="col-span-12">
          Registering the Network
        </Typography>
        <Typography variant="paragraph" className="col-span-12">
          Once the network is deployed, you will see a alert box asking you to register the parachain, You can go to the
          Coretime and register the parachain from the. After registration you can see the parachain block height
          increasing in the blockchain config tab of the dashboard
        </Typography>
      </div>
      <div className="col-span-12 flex flex-col gap-1">
        <Typography variant="subtitle" className="col-span-12">
          Managing The Network
        </Typography>
        <Typography variant="paragraph" className="col-span-12">
          There are four tabs in the dashboard once the network is deployed.
          <li>Overview: overview of the network </li>
          <li>Blockchain Config: config related to the deployed blockchain network </li>
          <li>Collator Nodes: All the deployed collator nodes and their details </li>
          <li>RPC Nodes: All the deployed RPC nodes and their details </li>
          <Typography variant="paragraph">
            <b>Note:</b> You can read more about this in the{" "}
            <HyperLink
              target={"_blank"}
              href={"https://github.com/Zeeve-App/perfuse/blob/main/docs/tutorial/network-details.md"}
            >
              network details
            </HyperLink>{" "}
            readme file on github.
          </Typography>
        </Typography>
      </div>
    </Card>
  );
};

export default PerfuseDocument;
