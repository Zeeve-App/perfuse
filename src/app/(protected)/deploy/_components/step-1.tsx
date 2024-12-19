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
import { forwardRef, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { DeployStepTypes } from "../page-client";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import { RadioCard } from "@/lib/components/RadioCard";
import { Radio } from "@/lib/components/Form";
import { DeployNetworkValidationSchemaType } from "@/schemas/validation-schema";
import { envAndRelayChainOption } from "@/constants/create-network";

/** deploy page step 1 */
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
      {/* env and relay chain options */}
      <Heading as="h5" className="col-span-12">
        Select your Network Environment <span className="text-brand-red">*</span>
      </Heading>
      {/* env option */}
      {envAndRelayChainOption.map((e) => {
        const isChecked = formData.watch("networkEnvironment.value") === e.environment.value;
        return (
          <div key={e.environment.value} className="col-span-12 lg:col-span-6">
            <RadioCard
              value={e.environment.value}
              {...formData.register("networkEnvironment.value")}
              isChecked={isChecked}
              hideRadioCircle
              isDisabled={e.environment?.isDisabled}
            >
              {e.environment.label}
            </RadioCard>
            <Card variant={"grid"}>
              {/* relay chain option */}
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
