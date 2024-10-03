import { RefObject } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card } from "@/lib/components/Card";
import { RadioCard } from "@/lib/components/RadioCard";
import { DeployNetworkValidationSchemaType } from "@/schemas/validation-schema";
import { templateOption } from "@/constants/create-network";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from "@/lib/components/Accordion";
import { tx } from "@/utils/shared";
import { Heading } from "@/lib/components/Heading";
import { FormField } from "@/lib/components/Form/FormField";
import { Input } from "@/lib/components/Form";

export default function DeployStep3({
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
    <>
      <div tabIndex={2} ref={ref} className={tx(className, "bg-white rounded-lg")}>
        <Card variant={"grid"} className="col-span-12 gap-0">
          <Heading as="h5" className="col-span-12 p-2 px-4">
            Chain Template Selection
          </Heading>
          <Card variant={"grid"} className="col-span-12 gap-0">
            {templateOption.map((e) => (
              <RadioCard
                key={e.value}
                className="col-span-4 "
                value={e.value}
                hideRadioCircle
                {...formData.register("template.value")}
                isChecked={formData.watch("template.value") === e.value}
              >
                {e.label}
              </RadioCard>
            ))}
          </Card>
        </Card>
        <Accordion className="rounded-none bg-theme-background">
          <AccordionItem>
            <AccordionHeader>Advance</AccordionHeader>
            <AccordionBody>
              <Card variant={"grid"}>
                <hr className="col-span-12" />
                <FormField
                  className="col-span-6"
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
                <FormField
                  className="col-span-6"
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
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
