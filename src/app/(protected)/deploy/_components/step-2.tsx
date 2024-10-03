import { RefObject } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import { Input } from "@/lib/components/Form";
import { DeployNetworkValidationSchemaType } from "@/schemas/validation-schema";
import { FormField } from "@/lib/components/Form/FormField";

export default function DeployStep2({
  ref,
  className,
  formData,
}: {
  className: string;
  ref: RefObject<HTMLDivElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: UseFormReturn<DeployNetworkValidationSchemaType, any, undefined>;
}) {
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
}
