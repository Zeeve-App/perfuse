import { forwardRef, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { DeployStepTypes } from "../page-client";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import { RadioCard } from "@/lib/components/RadioCard";
import { Radio } from "@/lib/components/Form";
import { DeployNetworkValidationSchemaType } from "@/schemas/validation-schema";
import { envAndRelayChainOption } from "@/constants/create-network";

// Using forwardRef to pass the ref correctly
const DeployStep1 = forwardRef<
  HTMLDivElement,
  {
    className: string;
    formData: UseFormReturn<DeployNetworkValidationSchemaType>;
    focusOnComponent: (component: DeployStepTypes) => void;
  }
>(({ className, formData }, ref) => {
  const env = formData.watch("networkEnvironment.value");

  useEffect(() => {
    if (env) {
      formData.setValue("relayChain.value", "");
    }
  }, [env, formData]);

  return (
    <Card tabIndex={0} ref={ref} className={className}>
      <Heading as="h5" className="col-span-12">
        Select your Network Environment
      </Heading>
      {envAndRelayChainOption.map((e) => {
        const isChecked = formData.watch("networkEnvironment.value") === e.environment.value;
        return (
          <div key={e.environment.value} className="col-span-12 lg:col-span-6">
            <RadioCard
              value={e.environment.value}
              {...formData.register("networkEnvironment.value")}
              isChecked={isChecked}
              hideRadioCircle
              isDisabled={e.environment.isDisabled}
            >
              {e.environment.label}
            </RadioCard>
            <Card variant={"grid"}>
              {e.relayChainOption.map((relayChain) => (
                <Radio
                  key={relayChain.value}
                  radioLabelProps={{
                    className: "col-span-6 lg:col-span-4",
                  }}
                  value={relayChain.value}
                  {...formData.register("relayChain.value")}
                  isDisabled={!isChecked || relayChain.isDisabled}
                  // isChecked={formData.watch("relayChain.value") === relayChain.value}
                >
                  {relayChain.label}
                </Radio>
              ))}
            </Card>
          </div>
        );
      })}
    </Card>
  );
});

DeployStep1.displayName = "deployStep1";
export default DeployStep1;
