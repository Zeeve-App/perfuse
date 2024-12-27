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
import React from "react";
import { forwardRef, RefObject } from "react";
import { UseFormReturn } from "react-hook-form";
import { DeployStepTypes } from "../page-client";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import { Input } from "@/lib/components/Form";
import { DeployNetworkValidationSchemaType } from "@/schemas/validation-schema";
import { FormField } from "@/lib/components/Form/FormField";

/** deploy step 2 */
const DeployStep2 = forwardRef<
  HTMLDivElement,
  {
    className: string;
    ref: RefObject<HTMLDivElement>;
    focusOnComponent: (component: DeployStepTypes) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formData: UseFormReturn<DeployNetworkValidationSchemaType, any, undefined>;
  }
>(({ className, formData }, ref) => {
  return (
    <Card tabIndex={1} ref={ref} className={className}>
      {/* chain name */}
      <Card variant={"grid-no-pad"} className="col-span-12 lg:col-span-6 ">
        <FormField
          className="col-span-12"
          helper={{
            status: "error",
            text: formData.formState.errors.chainName?.message?.toString(),
          }}
          label={{
            text: "Chain Name",
            isRequired: true,
          }}
        >
          <Input
            placeholder="Chain Name"
            {...formData.register("chainName")}
            inputContainerProps={{ className: "col-span-12" }}
            isRequired
          />
        </FormField>
      </Card>
      {/* token name */}
      <Card variant={"grid-no-pad"} className="col-span-12 lg:col-span-6 ">
        <FormField
          className="col-span-12"
          helper={{
            status: "error",
            text: formData.formState.errors.tokenName?.message?.toString(),
          }}
          label={{
            text: "Token Symbol",
            isRequired: true,
          }}
        >
          <Input placeholder="DOT" {...formData.register("tokenName")} isRequired />
        </FormField>
      </Card>
    </Card>
  );
});

DeployStep2.displayName = "DeployStep2";

export default DeployStep2;
