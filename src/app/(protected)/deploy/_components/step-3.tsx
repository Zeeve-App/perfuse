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
import React, { forwardRef, RefObject, useEffect, useState } from "react";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";
import axios from "axios";
import { DeployStepTypes } from "../page-client";
import { Card } from "@/lib/components/Card";
import { RadioCard } from "@/lib/components/RadioCard";
import { DeployNetworkValidationSchemaType } from "@/schemas/validation-schema";
import { templateOption } from "@/constants/create-network";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from "@/lib/components/Accordion";
import { tx } from "@/utils/shared";
import { Heading } from "@/lib/components/Heading";
import { FormField } from "@/lib/components/Form/FormField";
import { Checkbox, Input, Label, Switch } from "@/lib/components/Form";
import { Button } from "@/lib/components/Button";
import HTTP_STATUS from "@/constants/http";
import { ChainSpecFileType } from "@/types/chain-spec";
import useApi from "@/api-client";
import { FileUpload } from "@/lib/components/Form/FileUpload";
import { Spinner } from "@/lib/components/Spinner";
import SvgArrowUpFromBucket from "@/lib/icons/arrows/outline/ArrowUpFromBucket";
import { getSessionKey } from "@/utils/helpers";
import { useToast } from "@/lib/components/Toast";

/** template and there location in the repo */
const templatesMap: Record<(typeof templateOption)[number]["value"], string> = {
  // substrate: "standard/stable2409/standard.json",
  evm_frontier: "evm_frontier/stable2407/evm_frontier.json",
  standard: "standard/stable2409/standard.json",
  custom: "",
  assets: "assets/stable2409/assets.json",
  contracts: "contracts/stable2409/contracts.json",
};

/** step 3 component for deploy page */
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
  const toast = useToast();

  const {
    fields: accountFields,
    append: appendAccount,
    remove: removeAccount,
    update: updateAccount,
  } = useFieldArray({
    control: formData.control,
    name: "accounts",
  });

  useEffect(() => {
    if (formState.template?.value !== "custom") {
      axios
        .get(`/template/${templatesMap[formState.template?.value]}`)
        .then((res) => res.data)
        .then((e) => {
          formData.setValue("chainSpecFile.contents", e);
          removeAccount();
          fillValuesWithChainSpecData(e);
        });
    }
  }, [formData, formState.template?.value, removeAccount]);

  const fillValuesWithChainSpecData = (chainSpec: ChainSpecFileType) => {
    try {
      const runtimeGenesis = chainSpec.genesis.runtimeGenesis;

      formData.setValue("paraId", chainSpec.para_id);
      formData.setValue("decimalValue", chainSpec.properties?.tokenDecimals ?? 12);
      formData.setValue("protocolId", chainSpec.protocolId ?? "m2perfuse");
      formData.setValue("id", chainSpec.id ?? "new_testnet");
      formData.setValue("ss58Format", chainSpec.properties?.ss58Format ?? 42);
      formData.setValue("sudoKey", runtimeGenesis.patch.sudo.key ?? "");
      formData.setValue("id", formState.chainName + "_" + formState.relayChain.value.toLowerCase());

      const collatorAddresses = runtimeGenesis?.patch?.balances.balances;

      updateAccount(0, {
        address: collatorAddresses?.[0]?.[0].toString() ?? "",
        sessionKey: getSessionKey(runtimeGenesis, collatorAddresses?.[0]?.[0].toString() ?? ""),
        balance: parseInt(collatorAddresses?.[0]?.[1].toString() ?? "0").toString(),
      });

      updateAccount(1, {
        address: collatorAddresses?.[1]?.[0].toString() ?? "",
        balance: parseInt(collatorAddresses?.[1]?.[1].toString() ?? "0").toString(),
        sessionKey: getSessionKey(runtimeGenesis, collatorAddresses?.[1]?.[0].toString() ?? ""),
      });

      console.log(chainSpec);

      // setting values from chain spec file
      formData.setValue("chainSpecFile.contents", chainSpec);
      // trigger validation
      // formData.trigger();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast("Error while Loading chain spec file", {
        message: "Please enter a valid chain spec file",
        status: "error",
      });
    }
  };

  /**
   * Reading uploaded chain spec json file and applying values to fields.
   */
  const handleChainSpecFile = (e: React.ChangeEvent<HTMLInputElement> & React.DragEvent<HTMLDivElement>) => {
    const selectedFile = e.dataTransfer?.files?.[0] ?? e.target?.files?.[0];
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
  const handleBinaryFile = async (event: React.ChangeEvent<HTMLInputElement> & React.DragEvent<HTMLDivElement>) => {
    // TODO: handle abort controller
    console.log({ event });

    try {
      const files = event?.dataTransfer?.files ?? event?.target?.files;
      if (files?.length) {
        const selectedFile = files[0];

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

  useEffect(() => {
    appendAccount({
      address: "",
      balance: "",
      sessionKey: "",
    });
    appendAccount({
      address: "",
      balance: "",
      sessionKey: "",
    });
  }, []);

  return (
    <div className="col-span-12">
      <div tabIndex={2} ref={ref} className={tx(className, "bg-theme-foreground rounded-lg")}>
        <Card variant={"grid-no-pad"} className="col-span-12 gap-0 py-3">
          <Heading as="h5" className="col-span-12 p-2 px-4">
            Chain Template Selection
          </Heading>
          <Card variant={"grid"} className="col-span-12 gap-2 ">
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
          <div className="flex flex-col gap-3 p-2 px-4 lg:gap-6">
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
                <FormField
                  className="col-span-6"
                  helper={{
                    status: "error",
                    text: formData.formState.errors.protocolId?.message?.toString(),
                  }}
                >
                  <Heading as="h5" className="">
                    Protocol Id
                  </Heading>
                  <Input placeholder="Protocol Id" {...formData.register("protocolId")} isRequired />
                </FormField>
                <FormField
                  className="col-span-6"
                  helper={{
                    status: "error",
                    text: formData.formState.errors.id?.message?.toString(),
                  }}
                >
                  <Heading as="h5" className="">
                    id
                  </Heading>
                  <Input placeholder="Id" {...formData.register("id")} isRequired />
                </FormField>
                <FormField
                  className="col-span-6"
                  helper={{
                    status: "error",
                    text: formData.formState.errors.sudoKey?.message?.toString(),
                  }}
                >
                  <Heading as="h5" className="">
                    Sudo Key
                  </Heading>
                  <Input placeholder="Id" {...formData.register("sudoKey")} isRequired />
                </FormField>
                <Heading as="h5" className="col-span-12">
                  Accounts
                </Heading>
                {accountFields.map((e, idx) => {
                  return (
                    <div key={idx + e.address} className="col-span-12 grid grid-cols-12 gap-3">
                      <FormField
                        className="col-span-6 lg:col-span-4"
                        helper={{
                          status: "error",
                          text:
                            formData.formState.errors.accounts?.message?.toString() ||
                            formData.formState.errors.accounts?.[idx]?.address?.message?.toString() ||
                            formData.formState.errors.accounts?.[idx]?.message?.toString(),
                        }}
                      >
                        <Label>Address {idx + 1}</Label>
                        <Input placeholder="Address" {...formData.register(`accounts.${idx}.address`)} isRequired />
                      </FormField>
                      <FormField
                        className="col-span-6 lg:col-span-4"
                        helper={{
                          status: "error",
                          text:
                            formData.formState.errors.accounts?.message?.toString() ||
                            formData.formState.errors.accounts?.[idx]?.sessionKey?.message?.toString(),
                        }}
                      >
                        <Label>Session Key {idx + 1}</Label>
                        <Input placeholder="Address" {...formData.register(`accounts.${idx}.sessionKey`)} isRequired />
                      </FormField>
                      <FormField
                        className="col-span-6 lg:col-span-4"
                        helper={{
                          status: "error",
                          text: formData.formState.errors.accounts?.[idx]?.balance?.message?.toString(),
                        }}
                      >
                        <Label>Balance {idx + 1}</Label>

                        <Input placeholder="Balance" {...formData.register(`accounts.${idx}.balance`)} isRequired />
                      </FormField>
                      {/* TODO: uncomment for deleting address */}
                      {/* <FormField className="col-span-1">
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
                    </FormField> */}
                    </div>
                  );
                })}
                <div className="col-span-12 flex justify-end">
                  <Button
                    variant={"outline"}
                    colorScheme={"blue"}
                    className="rounded-md"
                    isDisabled
                    onClick={() => {
                      appendAccount({
                        address: "",
                        balance: "",
                        sessionKey: "",
                      });
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
    </div>
  );
});

DeployStep3.displayName = "DeployStep3";
export default DeployStep3;
