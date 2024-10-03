import { RefObject, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import { RadioCard } from "@/lib/components/RadioCard";
import { Radio } from "@/lib/components/Form";
import { DeployNetworkValidationSchemaType } from "@/schemas/validation-schema";
import { envAndRelayChainOption } from "@/constants/create-network";

export default function DeployStep1({
  ref,
  className,
  formData,
}: {
  className: string;
  ref: RefObject<HTMLDivElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<DeployNetworkValidationSchemaType, any, undefined>;
}) {
  const env = formData.watch("networkEnvironment.value");
  useEffect(() => {
    env && formData.setValue("relayChain.value", "");
  }, [env, formData]);
  return (
    <Card tabIndex={0} ref={ref} className={className}>
      <Heading as="h5" className="col-span-12">
        Select your Network Environment
      </Heading>
      {envAndRelayChainOption.map((e) => {
        const isChecked = formData.watch("networkEnvironment.value") === e.environment.value;
        return (
          <div key={e.environment.value} className="col-span-6">
            <RadioCard
              value={e.environment.value}
              {...formData.register("networkEnvironment.value")}
              isChecked={isChecked}
              hideRadioCircle
            >
              {e.environment.label}
            </RadioCard>
            <Card variant={"grid"}>
              {e.relayChainOption.map((relayChain) => {
                return (
                  <Radio
                    key={relayChain.value}
                    radioLabelProps={{
                      className: "col-span-4",
                    }}
                    value={relayChain.value}
                    {...formData.register("relayChain.value")}
                    isDisabled={!isChecked}
                  >
                    {relayChain.label}
                  </Radio>
                );
              })}
            </Card>
          </div>
        );
      })}
    </Card>
  );
}
