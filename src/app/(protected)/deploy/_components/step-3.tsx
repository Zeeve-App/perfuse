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
import { Checkbox, Input, Label, Switch } from "@/lib/components/Form";

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
        <Card variant={"grid-no-pad"} className="col-span-12 gap-0 py-3">
          <Heading as="h5" className="col-span-12 p-2 px-4">
            Chain Template Selection
          </Heading>
          <Card variant={"grid"} className="col-span-12 gap-2 lg:gap-0">
            {templateOption.map((e) => (
              <RadioCard
                key={e.value}
                className="col-span-4 h-24 lg:h-14"
                value={e.value}
                hideRadioCircle
                {...formData.register("template.value")}
                isChecked={formData.watch("template.value") === e.value}
              >
                <div className="m-auto flex flex-col items-center justify-center gap-2 align-middle lg:flex-row">
                  {e.icon}
                  {e.label}
                </div>
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
                    text: formData.formState.errors.paraId?.message?.toString(),
                  }}
                >
                  <Heading as="h5" className="">
                    ParaID
                  </Heading>
                  <Input placeholder="DOT" {...formData.register("paraId")} isRequired />
                </FormField>
                <FormField
                  className="col-span-6"
                  helper={{
                    status: "error",
                    text: formData.formState.errors.decimalValue?.message?.toString(),
                  }}
                >
                  <Heading as="h5" className="">
                    Token Decimal
                  </Heading>
                  <Input placeholder="DOT" {...formData.register("decimalValue")} isRequired />
                </FormField>
                <Card variant={"grid-no-pad"} className="col-span-12 py-3 lg:col-span-6">
                  <Card variant={"grid-no-pad"} className="col-span-12 lg:col-span-6">
                    <Heading as="h5" className="col-span-12">
                      RPC API
                    </Heading>
                    <Checkbox
                      {...formData.register("rpcNode.http")}
                      checkboxLabelProps={{
                        className: "col-span-6",
                      }}
                    >
                      HTTPS
                    </Checkbox>
                    <Checkbox
                      {...formData.register("rpcNode.ws")}
                      checkboxLabelProps={{
                        className: "col-span-6",
                      }}
                    >
                      WSS
                    </Checkbox>
                  </Card>
                  <Card variant={"grid-no-pad"} className="col-span-12 lg:col-span-6">
                    <Heading as="h5" className="col-span-12">
                      Sidecar
                    </Heading>
                    <div className="col-span-12 flex items-center justify-start">
                      <Switch {...formData.register("sidecar")} colorScheme={"blue"}>
                        Enable
                      </Switch>
                    </div>
                  </Card>
                </Card>
                <FormField
                  className="col-span-6"
                  helper={{
                    status: "error",
                    text: formData.formState.errors.ss58Format?.message?.toString(),
                  }}
                >
                  <Heading as="h5" className="">
                    ss58Format
                  </Heading>
                  <Input placeholder="DOT" {...formData.register("ss58Format")} isRequired />
                </FormField>
              </Card>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
