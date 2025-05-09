/* eslint-disable @typescript-eslint/no-explicit-any */
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
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CreatePerfuseApiPayload } from "../../api/create/route";
import { DeployStepTypes } from "../page-client";
import { ReCreatePerfuseApiPayload } from "../../api/re-create/route";
import { Card } from "@/lib/components/Card";
import { DeployNetworkValidationSchemaType } from "@/schemas/validation-schema";
import { Button } from "@/lib/components/Button";
import { envAndRelayChainOption, templateOption } from "@/constants/create-network";
import { Checkbox, Switch } from "@/lib/components/Form";
import HTTP_STATUS from "@/constants/http";
import useApi from "@/api-client";
import { Typography } from "@/lib/components/Typography/Typography";
import { Badge } from "@/lib/components/Badge/Badge";
import { withBasePath } from "@/utils/helpers";
import { useToast } from "@/lib/components/Toast";
import { tx } from "@/utils/shared";
import SvgCheck from "@/lib/icons/essential/outline/Check";
import { useModalStore } from "@/store/modal";
import { NetworkDbRow, NodeDbRowWithStatus } from "@/db-queries";
import { useNetworkStore } from "@/store/network";

/** deploy summary component */
const DeploySummary = ({
  className,
  formData,
  focusOnComponent,
  deployed,
  networkData,
  nodesData,
}: {
  className: string;
  // ref: RefObject<HTMLDivElement>;
  focusOnComponent: (component: DeployStepTypes) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<DeployNetworkValidationSchemaType, any, undefined>;
  deployed: boolean;
  networkData?: NetworkDbRow;
  nodesData: NodeDbRowWithStatus[];
}) => {
  const formWatchState = formData.watch();
  const router = useRouter();
  const apis = useApi();
  /** modal hook */
  const { openModal } = useModalStore();

  /** toast hook */
  const toast = useToast();
  const [isloading, setIsLoading] = useState(false);

  const prevNodes = useNetworkStore((e) => e.nodeInfo);
  const prevApiKey = prevNodes?.data?.apiKey;

  const pendinfTasks = useNetworkStore((e) => e.tasks.data);
  const isDisabled = pendinfTasks?.length > 0;

  const onSubmit = async (data: DeployNetworkValidationSchemaType) => {
    if (isDisabled) {
      toast(`Retry later`, {
        message: `Action can be performed once ${pendinfTasks?.[0]?.task_type?.replaceAll("_", " ").toLocaleUpperCase()} is completed`,
        status: "info",
      });
      return;
    }
    setIsLoading(true);
    const chainSpec = data.chainSpecFile.contents;
    if (chainSpec.para_id) chainSpec.para_id = data.paraId;
    if (chainSpec.properties?.tokenDecimals) chainSpec.properties.tokenDecimals = data.decimalValue;
    if (chainSpec.properties?.tokenSymbol) chainSpec.properties.tokenSymbol = data.tokenName;
    if (chainSpec.protocolId) chainSpec.protocolId = data.protocolId;
    if (chainSpec.id) chainSpec.id = data.id;
    if (chainSpec.genesis.runtimeGenesis.patch.parachainInfo.parachainId)
      chainSpec.genesis.runtimeGenesis.patch.parachainInfo.parachainId = data.paraId;
    if (chainSpec.properties.ss58Format) chainSpec.properties.ss58Format = data.ss58Format;
    chainSpec.name = data.chainName;
    chainSpec.relay_chain = data.relayChain.value?.toLowerCase();
    const runtimeGenesis = chainSpec.genesis.runtimeGenesis;

    runtimeGenesis.patch.balances.balances =
      data.accounts?.map((account) => [account?.address ?? "", account?.balance ?? "0"]) || [];

    runtimeGenesis.patch.collatorSelection.invulnerables = data.accounts.map((e) => e.address);

    runtimeGenesis.patch.session = {
      keys: data.accounts.map((e) => [
        e.address,
        e.address,
        {
          aura: e.sessionKey,
        },
      ]),
    };

    runtimeGenesis.patch.sudo = {
      key: data.sudoKey ?? "",
    };

    // if (chainSpec.) chainSpec.properties.tokenSymbol = data.tokenName;

    const explorers: string[] = [];
    if (data?.polkadotjsExplorer === "polkadotjs") {
      explorers.push(data.polkadotjsExplorer);
    }

    if (data?.statescanExplorer === "statescan") {
      explorers.push(data.statescanExplorer);
    }
    const payload: CreatePerfuseApiPayload = {
      network: {
        network_name: data.chainName,
        network_env: data?.networkEnvironment.value ?? "",
        network_template: data?.template.value ?? "",
        network_relay_chain_type: data?.relayChain.value ?? "",
        network_sidecar: data?.sidecar === "sidecar" ? 1 : 0,
        network_blockchain_explorer_type: explorers.join(),
        network_chain_spec_file_json: chainSpec,
        network_binary_path: data?.binaryFile.path ?? "",
        network_user_address: "",
      },
      nodes: [
        {
          node_name: "rpc-node",
          node_type: "rpc",
          node_auth_method: "api_key",
          node_password: "",
          node_username: "",
          node_https_enabled: data.rpcNode.http ?? false,
          node_wss_enabled: data.rpcNode.ws ?? false,
        },
        {
          node_name: "collator_1",
          node_rpc_cors: "*",
          node_type: "collator",
          node_address: data.accounts?.[0]?.address,
          node_balance: data.accounts?.[0]?.balance,
          node_collator_session_address: data.accounts?.[0]?.sessionKey,
        },
        {
          node_name: "collator_2",
          node_rpc_cors: "*",
          node_type: "collator",
          node_address: data.accounts?.[1]?.address,
          node_balance: data.accounts?.[1]?.balance,
          node_collator_session_address: data.accounts?.[1]?.sessionKey,
        },
      ],
    };
    const newNodes: unknown[] = nodesData?.map((node) => {
      if (node.node_type == "collator") {
        return {
          node_name: node?.node_name,
          node_rpc_cors: "*",
          node_type: "collator",
          node_address: node?.node_address ?? "",
          node_balance: node?.node_balance ?? 0,
          node_collator_session_address: node?.node_collator_session_address ?? "",
        };
      } else if (node.node_type == "rpc") {
        return {
          node_name: node.node_name,
          node_type: "rpc",
          node_auth_method: "api_key",
          node_password: "",
          node_username: "",
          node_https_enabled: !!node?.node_https_enabled,
          node_wss_enabled: !!node?.node_wss_enabled,
        };
      }
    });
    console.log("new col", newNodes);

    const rePayload: ReCreatePerfuseApiPayload = {
      prevApiKey: prevApiKey ?? "",
      network: {
        network_name: networkData?.network_name ?? "",
        network_env: data?.networkEnvironment.value ?? "",
        network_template: networkData?.network_template ?? "",
        network_relay_chain_type: data?.relayChain.value ?? "",
        network_sidecar: networkData?.network_sidecar === 1 ? 1 : 0,
        network_blockchain_explorer_type: networkData?.network_blockchain_explorer_type ?? "",
        network_chain_spec_file_json: JSON.parse(networkData?.network_chain_spec_file_json ?? "{}"),
        network_binary_path: networkData?.network_binary_path ?? "",
        network_user_address: networkData?.network_user_address ?? "",
      },
      nodes: [...newNodes] as any,
      networkId: networkData?.network_id ?? "",
    };

    if (deployed) {
      openModal("reDeployNetwork", {
        reDeployNetwork: { payLoad: rePayload },
      });
    } else {
      const response = await apis.createNetwork(payload);

      if (response.status === HTTP_STATUS.OK && response.data.success) {
        toast("Network created", {
          message: "Network creation is successful.",
          status: "success",
        });
        router.push("/dashboard/" + response.data?.data?.network_id);
      }
    }
    setIsLoading(false);
  };
  return (
    <Card tabIndex={3} className={className}>
      <div className="col-span-12 flex flex-col gap-3 text-theme-primary-content">
        <Typography variant="heading">Your Selection</Typography>
        <Typography variant="subtitle">Environment</Typography>
        {formWatchState.relayChain?.value && formWatchState.networkEnvironment?.value && (
          <div
            onClick={() => {
              focusOnComponent("step1");
            }}
          >
            <p>Network Environment</p>
            <Badge variant={"purple"}>
              {
                envAndRelayChainOption
                  .filter((e) => e.environment.value === formWatchState.networkEnvironment.value)?.[0]
                  .relayChainOption.filter((e) => e.value === formWatchState.relayChain.value)?.[0]?.label
              }
            </Badge>{" "}
            on{" "}
            <Badge variant={"default"}>
              {
                envAndRelayChainOption.filter(
                  (e) => e.environment.value === formWatchState.networkEnvironment.value,
                )?.[0].environment.label
              }
            </Badge>
          </div>
        )}
        {(formWatchState.chainName || formWatchState.tokenName) && (
          <>
            <hr />
            <div onClick={() => focusOnComponent("step2")}>
              {formWatchState.chainName && (
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Chain name</span>
                  <span>{formWatchState.chainName}</span>
                </div>
              )}
              {formWatchState.tokenName && (
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Token Symbol</span>
                  <span>{formWatchState.tokenName}</span>
                </div>
              )}
            </div>
            <hr />
          </>
        )}
        {formWatchState.template?.value ? (
          <div
            className="flex flex-col gap-3 rounded-md bg-theme-background p-3"
            onClick={() => {
              focusOnComponent("step3");
            }}
          >
            {formWatchState.template?.value && (
              <div className="flex justify-between text-sm">
                <span className="font-bold">Chain Template</span>
                <span>{templateOption.filter((e) => e.value === formWatchState.template.value)?.[0]?.label}</span>
              </div>
            )}
            {formWatchState.chainSpecFile?.name && (
              <div className="flex justify-between text-sm">
                <span className="font-bold">Chain-specification</span>
                <span
                  className={tx("bg-brand-light-teal  rounded-md  px-2 py-1 text-xs text-brand-gray", {
                    // "bg-brand-warning": error,
                  })}
                >
                  {
                    <>
                      <SvgCheck className="inline-block" /> Successfully Uploaded
                    </>
                  }
                </span>
              </div>
            )}
            {formWatchState.binaryFile?.name && (
              <div className="flex justify-between text-sm">
                <span className="font-bold">Binary-File</span>
                <span
                  className={tx("bg-brand-light-teal  rounded-md  px-2 py-1 text-xs text-brand-gray", {
                    // "bg-brand-warning": error,
                  })}
                >
                  {
                    <>
                      <SvgCheck className="inline-block" /> Successfully Uploaded
                    </>
                  }
                </span>
              </div>
            )}
            <hr />
            {formWatchState.paraId && (
              <div className="flex justify-between text-sm">
                <span className="font-semibold">ParaID</span>
                <span>{formWatchState.paraId}</span>
              </div>
            )}

            {(formWatchState.rpcNode?.http !== undefined || formWatchState.rpcNode?.ws !== undefined) && (
              <div className="flex justify-between text-sm">
                <span className="font-semibold">RPC API</span>
                <span className="flex flex-row gap-4">
                  <Checkbox isChecked={formWatchState.rpcNode?.http} isDisabled>
                    HTTPS
                  </Checkbox>
                  <Checkbox isChecked={formWatchState.rpcNode?.ws} isDisabled>
                    WSS
                  </Checkbox>
                </span>
              </div>
            )}

            {formWatchState.sidecar !== undefined && (
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Sidecar </span>

                <div className="col-span-12 flex items-center justify-start">
                  <Switch isChecked={formWatchState.sidecar === "sidecar"} colorScheme={"blue"} isDisabled>
                    Enable
                  </Switch>
                </div>
              </div>
            )}
            <hr />
            <p>Network Environment</p>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Collator nodes</span>
              <span>2</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Rpc nodes</span>
              <span>1</span>
            </div>
            <hr />
            <p> Gas Configuration</p>
            {formWatchState.decimalValue && (
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Token Decimal</span>
                <span>{formWatchState.decimalValue}</span>
              </div>
            )}
            {formWatchState.ss58Format && (
              <div className="flex justify-between text-sm">
                <span className="font-semibold">ss58Format</span>
                <span>{formWatchState.ss58Format}</span>
              </div>
            )}
          </div>
        ) : (
          <Image
            src={withBasePath("/assets/images/create/summary.svg")}
            alt="parachains-logo"
            width={400}
            height={300}
          />
        )}
        <form action="" className="" onSubmit={formData.handleSubmit(onSubmit)}>
          <Button
            className="w-full rounded-md"
            colorScheme="gradient"
            type="submit"
            isDisabled={!formData.formState.isValid}
            isLoading={isloading}
          >
            {deployed ? "Re-Deploy" : "Deploy"}
          </Button>
        </form>
        {formData.formState.isValid}
        <Link rel="stylesheet" href="https://github.com/Zeeve-App/perfuse/tree/main/docs/tutorial" target="_blank">
          <Button className="w-full rounded-md" variant={"outline"} colorScheme="accent">
            Docs
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default DeploySummary;
