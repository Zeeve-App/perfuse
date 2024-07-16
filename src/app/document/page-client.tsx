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

import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import HyperLink from "@/lib/components/utils/hyper-link";

const PerfuseDocument = () => {
  return (
    <Card className="gap-2 shadow-brand-shadow lg:gap-4">
      <Heading as="h4">Perfuse Document</Heading>
      <p>Perfuse is complete solution to deploy parachain and manage parachain in polkadot networks.</p>
      <Heading as="h5">Deploying Network</Heading>
      <p>
        User can setup the perfuse locally by following the{" "}
        <HyperLink target={"_blank"} href={"https://github.com/Zeeve-App/perfuse/blob/main/README.md"}>
          Setup guide.{" "}
        </HyperLink>{" "}
        Once the project is setup locally, you can go to the <HyperLink href={"/"}> Dashboard </HyperLink> to create the
        network from UI by selecting the appropriate options. For more detailed documentation, you can visit github{" "}
        <HyperLink
          target={"_blank"}
          href={"https://github.com/Zeeve-App/perfuse/blob/main/docs/tutorial/create-network.md"}
        >
          read me.
        </HyperLink>
      </p>
      <Heading as="h5">Registering the Network</Heading>
      <p>
        Once the network is deployed, you will see a alert box asking you to register the parachain, You can go to the
        Coretime and register the parachain from the. for more details step please read in{" "}
        <HyperLink href={"#"}>register page</HyperLink> in github docs. After registration you can see the parachain
        block height increasing in the blockchain config tab of the dashboard
      </p>
      <Heading as="h5">Managing The Network</Heading>
      <p>
        There are four tabs in the dashboard once the network is deployed.
        <li>Overview: overview of the network </li>
        <li>Blockchain Config: config related to the deployed blockchain network </li>
        <li>Collator Nodes: All the deployed collator nodes and their details </li>
        <li>RPC Nodes: All the deployed RPC nodes and their details </li>
        <p>
          <b>Note:</b> You can read more about this in the{" "}
          <HyperLink
            target={"_blank"}
            href={"https://github.com/Zeeve-App/perfuse/blob/main/docs/tutorial/network-details.md"}
          >
            network details
          </HyperLink>{" "}
          readme file on github.
        </p>
      </p>
    </Card>
  );
};

export default PerfuseDocument;
