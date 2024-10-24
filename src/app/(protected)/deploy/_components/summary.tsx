import { RefObject } from "react";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DeployStepTypes } from "../page";
import { CreatePerfuseApiPayload } from "../../api/create/route";
import { Card } from "@/lib/components/Card";
import { DeployNetworkValidationSchemaType } from "@/schemas/validation-schema";
import { Heading } from "@/lib/components/Heading";
import { Button } from "@/lib/components/Button";
import { envAndRelayChainOption, templateOption } from "@/constants/create-network";
import { Checkbox, Switch } from "@/lib/components/Form";
import HTTP_STATUS from "@/constants/http";
import { ChainSpecFileType } from "@/types/chain-spec";
import useApi from "@/api-client";
import { Typography } from "@/lib/components/Typography/Typography";
import { Badge } from "@/lib/components/Badge/Badge";
import { withBasePath } from "@/utils/helpers";

export default function DeploySummary({
  ref,
  className,
  formData,
  focusOnComponent,
}: {
  className: string;
  ref: RefObject<HTMLDivElement>;
  focusOnComponent: (component: DeployStepTypes) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<DeployNetworkValidationSchemaType, any, undefined>;
}) {
  const formWatchState = formData.watch();
  const router = useRouter();
  const apis = useApi();

  const onSubmit = async (data: DeployNetworkValidationSchemaType) => {
    const chainSpec = data.chainSpecFile.contents;
    if (chainSpec.para_id) chainSpec.para_id = data.paraId;
    if (chainSpec.properties?.tokenDecimals) chainSpec.properties.tokenDecimals = data.decimalValue;
    if (chainSpec.properties?.tokenSymbol) chainSpec.properties.tokenSymbol = data.tokenName;
    // if (chainSpec.) chainSpec.properties.tokenSymbol = data.tokenName;

    const payload: CreatePerfuseApiPayload = {
      network: {
        network_name: data.chainName,
        network_env: data?.networkEnvironment.value ?? "",
        network_template: data?.template.value ?? "",
        network_relay_chain_type: data?.relayChain.value ?? "",
        network_sidecar: Boolean(data?.sidecar) ? 1 : 0,
        network_blockchain_explorer_type: "polkdotjs",
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
      ],
    };

    const response = await apis.createNetwork(payload);

    if (response.status === HTTP_STATUS.OK && response.data.success) {
      router.push("/" + response.data?.data?.network_id);
      // goToNextStep();
    }
  };
  return (
    <Card tabIndex={3} ref={ref} className={className}>
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
                  <Switch isChecked={formWatchState.sidecar} colorScheme={"blue"} isDisabled>
                    Enable
                  </Switch>
                </div>
              </div>
            )}
            <hr />
            <p>Network Environment</p>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Collator nodes</span>
              <span>4</span>
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
          <>
            <Image
              src={withBasePath("/assets/images/create/summary.svg")}
              alt="parachains-logo"
              width={400}
              height={300}
            />
          </>
        )}
        <form action="" className="" onSubmit={formData.handleSubmit(onSubmit)}>
          <Button
            className="w-full rounded-md"
            colorScheme="gradient"
            type="submit"
            isDisabled={!formData.formState.isValid}
          >
            Deploy
          </Button>
        </form>
        <Button className="w-full rounded-md" variant={"outline"} colorScheme="accent">
          Docs
        </Button>
      </div>
    </Card>
  );
}
