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
import Link from "next/link";
import NetworkStatus from "../../_components/network-status";
import { Button } from "@/lib/components/Button";
import { Heading } from "@/lib/components/Heading";
import { NodeDbRow } from "@/db-queries";
import KeyValuePair from "@/lib/components/utils/key-value-pair";
import { Typography } from "@/lib/components/Typography";
import { formatEndpoint, toShortString, withBasePath } from "@/utils/helpers";

/** nodes component for overview page */
const Nodes = ({ nodes }: { isLoading: boolean; nodes: (NodeDbRow & { health: boolean })[] }) => {
  console.log(nodes);

  return (
    <div className="col-span-10 flex flex-col gap-3 rounded-lg bg-theme-foreground shadow-brand-shadow lg:col-span-4 lg:gap-6">
      <div className="grid grid-cols-12 gap-3 lg:gap-6">
        <div className="col-span-6 px-4 pt-4">
          <Heading as="h4">Nodes</Heading>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 flex flex-col gap-3">
          <div className="grid grid-cols-12 justify-between gap-3 px-4">
            <Typography variant="heading" className="col-span-6">
              Name
            </Typography>
            <Typography variant="heading" className="col-span-3">
              Node Type
            </Typography>
            <Typography variant="heading" className="col-span-3">
              Status
            </Typography>
          </div>
          <hr />
          {nodes
            .filter((e) => e.node_type === "rpc")
            .map((e) => (
              <div key={e.node_id}>
                <div className="grid grid-cols-12 justify-between gap-3 px-4">
                  <>
                    <Typography variant="paragraph" className="col-span-6">
                      {e.node_name}
                    </Typography>
                    <Typography variant="paragraph" className="col-span-3">
                      {e.node_type.toUpperCase()}
                    </Typography>
                    <div className="col-span-3">
                      <NetworkStatus className="text-sm" health={e.health} />
                    </div>
                  </>
                </div>
                <div className="grid grid-cols-12 justify-between gap-3 bg-theme-background p-4">
                  <KeyValuePair
                    className="col-span-6 mx-0"
                    label={"Wss Url"}
                    value={toShortString(
                      formatEndpoint("wss", e.node_endpoint, e.node_auth_method, e.node_api_key),
                      5,
                      5,
                    )}
                    shouldAllowCopy
                    tooltipText={formatEndpoint("wss", e.node_endpoint, e.node_auth_method, e.node_api_key)}
                  />
                  <KeyValuePair
                    className="col-span-6 mx-0"
                    label={"Https Url"}
                    value={toShortString(
                      formatEndpoint("https", e.node_endpoint, e.node_auth_method, e.node_api_key),
                      5,
                      5,
                    )}
                    shouldAllowCopy
                    tooltipText={formatEndpoint("https", e.node_endpoint, e.node_auth_method, e.node_api_key)}
                  />
                  <KeyValuePair
                    className="col-span-6 mx-0"
                    label={"Authentication type"}
                    value={e.node_auth_method ?? ""}
                  />
                  <KeyValuePair
                    className="col-span-6 mx-0"
                    label={"API Key"}
                    shouldAllowCopy
                    tooltipText={e.node_api_key ?? ""}
                    value={toShortString(e.node_api_key ?? "", 5, 5)}
                  />
                </div>
              </div>
            ))}

          <div className="grid grid-cols-12 justify-evenly gap-3 px-4">
            <Typography variant="heading" className="col-span-6">
              Collator Nodes:{" "}
              <Typography variant="paragraph">{nodes.filter((e) => e.node_type === "collator").length}</Typography>
            </Typography>
            <div className="col-span-6 text-right">
              <Link href={withBasePath(`/dashboard/${nodes?.[0]?.network_id}/collator-nodes`)}>
                <Button variant="text">View all</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nodes;
