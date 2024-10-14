import { forwardRef, RefObject } from "react";
import { UseFormReturn } from "react-hook-form";
import { DeployStepTypes } from "../page";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import { Input } from "@/lib/components/Form";
import { DeployNetworkValidationSchemaType } from "@/schemas/validation-schema";
import { FormField } from "@/lib/components/Form/FormField";

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
      <Card variant={"grid-no-pad"} className="col-span-6 ">
        <FormField
          className="col-span-12"
          helper={{
            status: "error",
            text: formData.formState.errors.chainName?.message?.toString(),
          }}
        >
          <Heading as="h5" className="col-span-12">
            Chain Name
          </Heading>
          <Input
            placeholder="Chain Name"
            {...formData.register("chainName")}
            inputContainerProps={{ className: "col-span-12" }}
            isRequired
          />
        </FormField>
      </Card>
      <Card variant={"grid-no-pad"} className="col-span-6 ">
        <FormField
          className="col-span-12"
          helper={{
            status: "error",
            text: formData.formState.errors.tokenName?.message?.toString(),
          }}
        >
          <Heading as="h5" className="">
            Token Symbol
          </Heading>
          <Input placeholder="DOT" {...formData.register("tokenName")} isRequired />
        </FormField>
      </Card>
    </Card>
  );
});

DeployStep2.displayName = "DeployStep2";

export default DeployStep2;
