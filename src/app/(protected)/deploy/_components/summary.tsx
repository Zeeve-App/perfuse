import { RefObject } from "react";
import { UseFormReturn } from "react-hook-form";
import { DeployStepTypes } from "../page";
import { Card } from "@/lib/components/Card";
import { DeployNetworkValidationSchemaType } from "@/schemas/validation-schema";
import { Heading } from "@/lib/components/Heading";
import { Button } from "@/lib/components/Button";
import { envAndRelayChainOption, templateOption } from "@/constants/create-network";
import { Checkbox, Switch } from "@/lib/components/Form";

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
  return (
    <Card tabIndex={3} ref={ref} className={className}>
      <div className="col-span-12 flex flex-col gap-3">
        <p>Your Selection</p>
        <Heading as="h4">Your environment</Heading>
        {formWatchState.relayChain?.value && formWatchState.networkEnvironment?.value && (
          <div
            onClick={() => {
              focusOnComponent("step1");
            }}
          >
            <p>Network Environment</p>
            <Button variant={"outline"} className="h-5">
              {
                envAndRelayChainOption
                  .filter((e) => e.environment.value === formWatchState.networkEnvironment.value)?.[0]
                  .relayChainOption.filter((e) => e.value === formWatchState.relayChain.value)?.[0]?.label
              }
            </Button>{" "}
            on{" "}
            <Button variant={"outline"} className="h-5">
              {
                envAndRelayChainOption.filter(
                  (e) => e.environment.value === formWatchState.networkEnvironment.value,
                )?.[0].environment.label
              }
            </Button>
          </div>
        )}
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
      </div>
    </Card>
  );
}
