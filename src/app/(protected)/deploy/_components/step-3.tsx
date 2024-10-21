import { forwardRef, RefObject, useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";
import { errors } from "jose";
import axios from "axios";
import { DeployStepTypes } from "../page";
import { Card } from "@/lib/components/Card";
import { RadioCard } from "@/lib/components/RadioCard";
import { DeployNetworkValidationSchemaType } from "@/schemas/validation-schema";
import { templateOption } from "@/constants/create-network";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from "@/lib/components/Accordion";
import { tx } from "@/utils/shared";
import { Heading } from "@/lib/components/Heading";
import { FormField } from "@/lib/components/Form/FormField";
import { Checkbox, Input, Label, Switch } from "@/lib/components/Form";
import { Button, IconButton } from "@/lib/components/Button";
import SvgTrash from "@/lib/icons/essential/outline/Trash";
import HTTP_STATUS from "@/constants/http";
import { ChainSpecFileType } from "@/types/chain-spec";
import useApi from "@/api-client";
import { FileUpload } from "@/lib/components/Form/FileUpload";
import { Spinner } from "@/lib/components/Spinner";
import SvgArrowUpFromBucket from "@/lib/icons/arrows/outline/ArrowUpFromBucket";

const DeployStep3 = forwardRef<
  HTMLDivElement,
  {
    className: string;
    ref: RefObject<HTMLDivElement>;
    focusOnComponent: (component: DeployStepTypes) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formData: UseFormReturn<DeployNetworkValidationSchemaType, any, undefined>;
  }
>(({ className, formData }, ref) => {
  const [progressValue, setProgressValue] = useState(0);
  const [progressTotal, setProgressTotal] = useState(1);
  const [isBinaryFileUploading, setIsBinaryFileUploading] = useState(false);
  const apis = useApi();
  const formState = formData.watch();

  const {
    fields: accountFields,
    append: appendAccount,
    remove: removeAccount,
  } = useFieldArray({
    control: formData.control,
    name: "accounts",
  });

  useEffect(() => {
    if (formState.template?.value === "substrate" || formState.template?.value === "evm_frontier") {
      axios
        .get(`/template/${formState.template?.value}.json`)
        .then((res) => res.data)
        .then((e) => {
          formData.setValue("chainSpecFile.contents", e);
          removeAccount();
          fillValuesWithChainSpecData(e);
        });
    }
  }, [formData, formState.template?.value]);

  const fillValuesWithChainSpecData = (chainSpec: ChainSpecFileType) => {
    const runtimeGenesis = chainSpec.genesis.runtimeGenesis;

    formData.setValue("paraId", chainSpec.para_id);
    formData.setValue("decimalValue", chainSpec.properties?.tokenDecimals);
    formData.setValue("ss58Format", chainSpec.properties?.ss58Format?.toString());

    const collatorAddresses = runtimeGenesis?.patch?.aura?.authorities?.length
      ? runtimeGenesis?.patch?.aura?.authorities
      : [runtimeGenesis?.patch.session?.keys?.[0]?.[0], runtimeGenesis?.patch.session?.keys?.[0]?.[1]];

    collatorAddresses?.forEach((col, idx) => {
      const balance = runtimeGenesis?.patch?.balances?.balances?.find((e) => e[0] === col)?.[1];
      console.log({ address: col, balance });

      col && appendAccount({ address: col, balance });
    });

    console.log(chainSpec);

    // setting values from chain spec file
    formData.setValue("chainSpecFile.contents", chainSpec);
    // trigger validation
    // formData.trigger();
  };

  /**
   * Reading uploaded chain spec json file and applying values to fields.
   */
  const handleChainSpecFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files ? e.target?.files[0] : undefined;
    if (selectedFile) {
      // set selected chain spec file name
      formData.setValue("chainSpecFile.name", selectedFile.name);

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const chainSpec: ChainSpecFileType = JSON.parse(content);
        fillValuesWithChainSpecData(chainSpec);
      };

      reader.readAsText(selectedFile);
    }
  };

  /**
   * Upload binary file to server.
   */
  const handleBinaryFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: handle abort controller
    console.log({ event });

    try {
      if (event?.target?.files?.length) {
        const selectedFile = event?.target?.files[0];

        // set binary file states
        formData.setValue("binaryFile.name", selectedFile.name);
        // setIsBinaryFileUploading(true);

        // prepare form data
        const form = new FormData();
        form.append("file", selectedFile);

        // upload binary file
        const response = await apis.uploadApi(form, {
          onUploadProgress(progressEvent) {
            if (progressEvent.lengthComputable) {
              setProgressTotal(progressEvent.total);
              setProgressValue(progressEvent.loaded);
            }
          },
        });

        console.log("---------");

        if (response.status === HTTP_STATUS.OK && response.data.success) {
          // set global network id
          // setBinaryFile()

          formData.setValue("binaryFile.path", response.data.data.path);
        }
      } else throw new Error("File not uploaded properly");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // reset states
      formData.setValue("binaryFile", {});

      formData.setError("binaryFile.name", { message: error?.message ?? "Something Wrong" });
      // toast("Error uploading binary file.", {
      //   status: "error",
      // });
      formData.trigger();
    } finally {
      setIsBinaryFileUploading(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <div tabIndex={2} ref={ref} className={tx(className, "bg-theme-foreground rounded-lg")}>
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
      {/* Parachain Config */}
      {formState?.template?.value === "custom" && (
        <div className="flex flex-col gap-3 lg:gap-6">
          <Heading as="h5">Upload</Heading>
          <div className="grid grid-cols-12 items-start gap-3 lg:gap-6">
            {/* Chain Spec File */}
            <FormField
              className="col-span-12"
              helper={{
                status: "error",
                text: formData.formState.errors.chainSpecFile?.message?.toString(),
              }}
            >
              <Controller
                control={formData.control}
                name={"chainSpecFile.contents"}
                render={({ field: { value, onChange, ...field } }) => {
                  return (
                    <FileUpload
                      fileType="json"
                      field={{
                        ...field,
                        onChange: (event) => {
                          onChange(event);
                          handleChainSpecFile(event);
                        },
                        value,
                      }}
                      progressValue={0}
                      progressTotal={0}
                      fileName={formState.chainSpecFile?.name}
                      id={"chainSpecFile"}
                      floatingLabelText={"Upload Chain-specification"}
                    />
                  );
                }}
              />
            </FormField>

            {/* Binary File */}
            <FormField
              className="col-span-12"
              helper={{
                status: "error",
                text: formData.formState.errors.binaryFile?.name?.message?.toString(),
              }}
            >
              <Controller
                control={formData.control}
                name={"binaryFile.name"}
                render={({ field: { value, onChange, ...field } }) => {
                  return (
                    <FileUpload
                      fileType="binary"
                      field={{
                        ...field,
                        onChange: async (event) => {
                          onChange(event);
                          await handleBinaryFile(event);
                        },
                        value,
                      }}
                      error={formData.formState.errors.binaryFile?.name?.message}
                      progressValue={progressValue}
                      progressTotal={progressTotal}
                      fileName={formState.binaryFile?.name}
                      id={"binaryFile"}
                      floatingLabelText={"Upload Binary"}
                      iconRight={
                        isBinaryFileUploading ? (
                          <Spinner fontSize={24} className="mx-4" />
                        ) : (
                          <SvgArrowUpFromBucket fontSize={24} className="mx-4" />
                        )
                      }
                    />
                  );
                }}
              />
            </FormField>
          </div>
        </div>
      )}
      <Accordion className="rounded-none bg-theme-background">
        <AccordionItem>
          <AccordionHeader>Advance</AccordionHeader>
          <AccordionBody>
            <Card variant={"grid"} className="lg:gap-4">
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
              <Heading as="h5" className="col-span-12">
                Accounts
              </Heading>
              {accountFields.map((e, idx) => {
                return (
                  <>
                    <FormField
                      className="col-span-6"
                      key={e.id + "address"}
                      helper={{
                        status: "error",
                        text: formData.formState.errors.ss58Format?.message?.toString(),
                      }}
                    >
                      <Label>Address {idx + 1}</Label>
                      <Input placeholder="DOT" {...formData.register(`accounts.${idx}.address`)} isRequired />
                    </FormField>
                    <FormField
                      className="col-span-5"
                      key={e.id + "balance"}
                      helper={{
                        status: "error",
                        text: formData.formState.errors.ss58Format?.message?.toString(),
                      }}
                    >
                      <Label>Balance {idx + 1}</Label>

                      <Input placeholder="DOT" {...formData.register(`accounts.${idx}.balance`)} isRequired />
                    </FormField>
                    <FormField className="col-span-1">
                      <Label>&nbsp;</Label>
                      <IconButton
                        colorScheme={"blue"}
                        className="h-14 w-full"
                        key={e.id + "delete"}
                        onClick={() => {
                          removeAccount(idx);
                        }}
                      >
                        <SvgTrash fontSize={30} />
                      </IconButton>
                    </FormField>
                  </>
                );
              })}
              <div className="col-span-12 flex justify-end">
                <Button
                  variant={"outline"}
                  colorScheme={"blue"}
                  className="rounded-md"
                  onClick={() => {
                    appendAccount({});
                  }}
                >
                  + Add Address
                </Button>
              </div>
            </Card>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
});

DeployStep3.displayName = "DeployStep3";
export default DeployStep3;
