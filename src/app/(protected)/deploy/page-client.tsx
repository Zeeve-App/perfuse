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
import { useEffect, useRef } from "react";
import { ClassValue } from "class-variance-authority/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import DeployStep1 from "./_components/step-1";
import DeployStep2 from "./_components/step-2";
import DeployStep3 from "./_components/step-3";
import DeploySummary from "./_components/summary";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import { tx } from "@/utils/shared";
import { deployNetworkValidationSchema, DeployNetworkValidationSchemaType } from "@/schemas/validation-schema";
import { Badge } from "@/lib/components/Badge/Badge";
import SvgExclamationTriangle from "@/lib/icons/essential/outline/ExclamationTriangle";
import { NetworkDbRow, NodeDbRowWithStatus } from "@/db-queries";
import { networkEnvType, templateOption } from "@/constants/create-network";
import { ChainSpecFileType } from "@/types/chain-spec";
import { useNetworkStore } from "@/store/network";

/** component name for deploy page  to focus */
const componentNameForDeploy = ["step1", "step2", "step3", "summary"] as const;
/** deploy steps types */
export type DeployStepTypes = (typeof componentNameForDeploy)[number];
/** Deploy page component */
const DeployPage = ({ network, nodes }: { network: NetworkDbRow[]; nodes: NodeDbRowWithStatus[] }) => {
  const deployed = Boolean(network.length);
  const chainSpec: ChainSpecFileType = JSON.parse(network[0]?.network_chain_spec_file_json ?? "{}");

  /** mapping network db to form defaults */
  const mapNetworkDbToFormDefaults = (
    network: NetworkDbRow,
    nodes: NodeDbRowWithStatus,
  ): Partial<DeployNetworkValidationSchemaType> => {
    return {
      networkEnvironment: {
        value: network.network_env as networkEnvType,
      },
      relayChain: {
        value: network.network_relay_chain_type as "paseo" | "kusama" | "polkadot",
      },
      chainName: network.network_name,
      id: network.network_id,
      protocolId: network.network_id,
      tokenName: chainSpec?.properties?.tokenSymbol,
      decimalValue: chainSpec?.properties?.tokenDecimals,
      paraId: chainSpec?.para_id,
      ss58Format: chainSpec?.properties?.ss58Format,
      rpcNode: {
        http: nodes.node_https_enabled === 1,
        ws: nodes.node_wss_enabled === 1,
      },
      sidecar: network.network_sidecar ? "sidecar" : null,
      template: {
        value: network.network_template as (typeof templateOption)[number]["value"],
      },
      polkadotjsExplorer: network.network_blockchain_explorer_type === "polkadotjs" ? "polkadotjs" : undefined,
      statescanExplorer: network.network_blockchain_explorer_type === "statescan" ? "statescan" : undefined,
      chainSpecFile: {
        name: "chainSpec.json",
        contents: JSON.parse(network.network_chain_spec_file_json) as ChainSpecFileType,
      },
      binaryFile: {
        name: "binary",
        path: network.network_binary_path,
      },
      isSudoKeyRequired: !!chainSpec?.genesis?.runtimeGenesis?.patch?.sudo?.key,
      accounts: [],
    };
  };

  /** form data for deploy page */
  const formData = useForm<DeployNetworkValidationSchemaType>({
    resolver: yupResolver(deployNetworkValidationSchema),
    mode: "all",
    defaultValues: deployed
      ? mapNetworkDbToFormDefaults(network[0], nodes[0])
      : {
          rpcNode: {
            http: true,
            ws: true,
          },
          sidecar: "sidecar",
          networkEnvironment: {
            value: "testnet",
          },
          relayChain: {
            value: "local",
          },
          polkadotjsExplorer: "polkadotjs",
          statescanExplorer: "statescan",
        },
  });

  useEffect(() => {
    if (deployed && network.length) {
      const defaults = mapNetworkDbToFormDefaults(network[0], nodes[0]);
      formData.reset(defaults);
    }
  }, [deployed, network]);

  /** refs for steps */
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  /** focusing on steps of deploy page */
  const focusOnComponent = (component: DeployStepTypes) => {
    console.log({ component, step1Ref });
    switch (component) {
      case "step1":
        step1Ref.current?.focus();
        break;
      case "step2":
        step2Ref.current?.focus();
        break;
      case "step3":
        step3Ref.current?.focus();
        break;
      case "summary":
        summaryRef.current?.focus();
        break;

      default:
        break;
    }
  };

  /** classes for focus */
  const focusClasses: ClassValue =
    "focus:outline-none focus-within:outline-none focus-within:ring-none focus-within:border focus-within:border-theme-secondary focus-within:opacity-100 focus:ring-none focus:border focus:border-theme-secondary focus:opacity-100";

  useEffect(() => {
    step1Ref.current?.focus();
  }, []);
  const pendinfTasks = useNetworkStore((e) => e.tasks.data);
  const isDisabled = pendinfTasks?.length > 0;
  return (
    <Card variant={"grid"} className="gap-0">
      <Card variant={"grid"} className="col-span-12">
        {deployed && isDisabled ? (
          <Badge className="col-span-12 flex items-center gap-4 rounded-md p-4 text-lg" variant="red">
            <SvgExclamationTriangle className="size-10" />
            This Action can be performed once existing task:{" "}
            {pendinfTasks?.[0]?.task_type?.replaceAll("_", " ").toLocaleUpperCase()} is completed.
          </Badge>
        ) : (
          <Badge className="col-span-12 flex items-center gap-4 rounded-md p-4 text-lg" variant="red">
            <SvgExclamationTriangle className="size-10" />
            Re-deploying a network will remove the existing deployment and initiate a new one.
          </Badge>
        )}
        <Heading as="h4" className="col-span-12">
          Set Up Your Parachain
        </Heading>
      </Card>
      {/* Form */}
      <Card variant={"grid"} className="col-span-12 lg:col-span-8">
        {/* 1st step */}
        <DeployStep1
          focusOnComponent={focusOnComponent}
          formData={formData}
          ref={step1Ref}
          className={tx("col-span-12 opacity-50", focusClasses)}
        />
        {/* 2nd step */}
        <DeployStep2
          focusOnComponent={focusOnComponent}
          formData={formData}
          ref={step2Ref}
          className={tx("col-span-12 opacity-50", focusClasses)}
          deployed={deployed}
        />
        {/* 3rd step  */}
        <DeployStep3
          formData={formData}
          focusOnComponent={focusOnComponent}
          ref={step3Ref}
          className={tx("col-span-12 opacity-50", focusClasses)}
          deployed={deployed}
        />
      </Card>
      {/* Your selects */}
      <Card variant={"grid"} className="col-span-12 lg:col-span-4">
        <DeploySummary
          focusOnComponent={focusOnComponent}
          formData={formData}
          // ref={summaryRef}
          className={tx("col-span-12")}
          deployed={deployed}
          networkData={network[0]}
          nodesData={nodes}
        />
      </Card>
    </Card>
  );
};

export default DeployPage;
