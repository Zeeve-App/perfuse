"use client";
import React, { useEffect, useRef, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import {
  explorerOption,
  networkEnvOption,
  relayChainOption,
  sideCardOptions,
  templateOption,
} from "../constants/create-network";
import { configureNetworkValidationSchema } from "./validation-schema";
import { useCreateNetworkFormStore } from "@/store/create-network";
import { ChainSpecFileType } from "@/types/chain-spec";
import { Button } from "@/lib/components/Button";
import { Heading } from "@/lib/components/Heading";
import { useProgressiveFormContext, ProgressiveFormStepFooter } from "@/lib/components/ProgressiveForm";
import { Spinner } from "@/lib/components/Spinner";
import { useToast } from "@/lib/components/Toast";
import HTTP_STATUS from "@/constants/http";
import { FormField } from "@/lib/components/Form/FormField";
import SvgArrowUpFromBucket from "@/lib/icons/arrows/outline/ArrowUpFromBucket";
import SvgChevronRightSquare from "@/lib/icons/arrows/outline/ChevronRightSquare";
import { ReactSelect } from "@/lib/components/ReactSelect";
import { FileUpload } from "@/lib/components/Form/FileUpload";
import { withBasePath } from "@/utils/helpers";
import useApi from "@/api-client";

type ConfigureNetworkSchemaType = yup.InferType<typeof configureNetworkValidationSchema>;

const ConfigureNetwork = () => {
  // form state
  const {
    configureNetwork,
    chainSpecFile,
    setChainSpecFile,
    isBinaryFileUploading,
    setIsBinaryFileUploading,
    binaryFile,
    setBinaryFile,
    setGlobalNetworkId,
    setFormData,
  } = useCreateNetworkFormStore();
  const [progressValue, setProgressValue] = useState(0);
  const [progressTotal, setProgressTotal] = useState(1);
  const apis = useApi();

  const binaryFileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    watch,
    reset,
    getValues,
    formState: { errors, isValid, defaultValues },
  } = useForm<ConfigureNetworkSchemaType>({
    resolver: yupResolver(configureNetworkValidationSchema),
    mode: "all",
    defaultValues: configureNetwork ?? {},
  });

  const templateWatcher = watch("template");
  const networkEnvWatcher = watch("networkEnviorment");

  useEffect(() => {
    if (templateWatcher?.value === "substrate" || templateWatcher?.value === "evm_frontier") {
      axios
        .get(`/template/${templateWatcher?.value}.json`)
        .then((res) => res.data)
        .then((e) => {
          setValue("chainSpecFile.contents", e);
        });
    }
  }, [setValue, templateWatcher?.value]);

  useEffect(() => {
    setValue("relayChain", "" as unknown as { label: string; value: string });
  }, [networkEnvWatcher]);

  // progressive form context
  const { goToNextStep } = useProgressiveFormContext();

  /**
   * Reading uploaded chain spec json file and applying values to fields.
   */
  const handleChainSpecFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files ? e.target?.files[0] : undefined;
    if (selectedFile) {
      // set selected chain spec file name
      setChainSpecFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        console.log(content);
        const chainSpec: ChainSpecFileType = JSON.parse(content);

        // setting values from chain spec file
        setValue("chainSpecFile.contents", chainSpec);
        // trigger validation
        trigger();
      };

      reader.readAsText(selectedFile);
    }
  };

  // reset binary file input field
  const handleBinaryFileInputReset = () => {
    if (binaryFileInputRef.current) {
      binaryFileInputRef.current.value = "";
      binaryFileInputRef.current.type = "text";
      binaryFileInputRef.current.type = "file";
    }
  };

  // upload binary api
  // const { request: uploadBinaryRequest, url: uploadBinaryUrl } = useParachainsService().file.uploadBinary();

  // toast
  const toast = useToast();

  /**
   * Upload binary file to server.
   */
  const handleBinaryFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: handle abort controller
    try {
      if (event?.target?.files?.length) {
        const selectedFile = event?.target?.files[0];

        // set binary file states
        setBinaryFile(selectedFile);
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
          console.log(response.data.data.path);

          setValue("binaryFile.path", response.data.data.path);
        }
      }
    } catch (error) {
      // reset states
      handleBinaryFileInputReset();
      setBinaryFile(null);
      setGlobalNetworkId(null);

      toast("Error uploading binary file.", {
        status: "error",
      });
    } finally {
      setIsBinaryFileUploading(false);
    }
  };

  useEffect(() => {
    console.log(!isValid, isBinaryFileUploading);
  }, [isBinaryFileUploading, isValid]);

  // action to perform while submitting the form
  const onSubmit = (data: ConfigureNetworkSchemaType) => {
    console.log(data);

    setFormData({
      step: "configureNetwork",
      data: {
        ...data,
        binaryFile: {
          name: binaryFile?.name ?? "",
          path: data.binaryFile.path,
        },
        chainSpecFile: {
          contents: {
            ...data.chainSpecFile.contents,
          } as ChainSpecFileType,
        },
      },
    });

    const chainspecContent = data.chainSpecFile.contents;
    const runtimeGenesis = chainspecContent.genesis.runtimeGenesis;
    setFormData({
      step: "configureRelayChain",
      data: {
        relay_chain: { value: chainspecContent.relay_chain, label: chainspecContent.relay_chain },
        version: { value: chainspecContent.relay_chain, label: chainspecContent.relay_chain },
        paraId: chainspecContent.para_id,
        decimalValue: chainspecContent.properties?.tokenDecimals,
        tokenName: chainspecContent.properties?.tokenSymbol,
        telemetryEndpoint: chainspecContent.telemetryEndpoints ?? undefined,
        name: chainspecContent.name ?? undefined,
        chainType: chainspecContent.chainType ?? undefined,
        candidacyBond: chainspecContent.genesis.runtime?.collatorSelection.candidacyBond ?? undefined,
        collatorNodes: runtimeGenesis?.patch.aura.authorities.map((col, idx) => {
          const bal = runtimeGenesis?.patch?.balances?.balances?.find((e) => e[0] === col)?.[1];
          return {
            collatorName: `collator_name_${idx + 1}`,
            collatorAddress: col,
            collatorBalance: bal ? Number(bal) : 0,
            rpcCors: "*",
          };
        }),
        rpcNodes: [
          {
            type: "rpc",
            http: true,
            ws: true,
            credentials: {
              type: "api_key",
            },
            name: "",
          },
        ],
      },
    });

    goToNextStep();
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 p-3 lg:gap-6 lg:p-6">
        {/* Network Config */}
        <div className="flex flex-col gap-3 lg:gap-6">
          <Heading as="h5">Network Config</Heading>
          <div className="grid grid-cols-12 items-start gap-3 lg:gap-6">
            {/* Network Environment */}
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-4"
              helper={{
                status: "error",
                text: errors.networkEnviorment?.message?.toString(),
              }}
            >
              <Controller
                name="networkEnviorment"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    isRequired
                    options={networkEnvOption}
                    placeholder="Select Network Environment"
                    {...field}
                  />
                )}
              />
            </FormField>
            {/* Template */}
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-4"
              helper={{
                status: "error",
                text: errors.template?.message?.toString(),
              }}
            >
              <Controller
                name="template"
                control={control}
                render={({ field }) => (
                  <ReactSelect isRequired options={templateOption} placeholder="Select Template" {...field} />
                )}
              />
            </FormField>
            {/* Relay Chain */}
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-4"
              helper={{
                status: "error",
                text: errors.relayChain?.message?.toString(),
              }}
            >
              <Controller
                name="relayChain"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    isRequired
                    options={relayChainOption[networkEnvWatcher?.value ?? "testnet"]}
                    placeholder="Select Relay Chain"
                    {...field}
                  />
                )}
              />
            </FormField>
            {/* Sidecar */}
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-4"
              helper={{
                status: "error",
                text: errors.sidecar?.message?.toString(),
              }}
            >
              <Controller
                name="sidecar"
                control={control}
                render={({ field }) => (
                  <ReactSelect isRequired options={sideCardOptions} placeholder="Select Sidecar" {...field} />
                )}
              />
            </FormField>
            {/* Blockchain Explorer */}
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-4"
              helper={{
                status: "error",
                text: errors.explorer?.message?.toString(),
              }}
            >
              <Controller
                name="explorer"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    isRequired
                    options={explorerOption}
                    placeholder="Select Blockchain Explorer"
                    {...field}
                  />
                )}
              />
            </FormField>
          </div>
        </div>

        <hr className="border-brand-outline" />

        {/* Parachain Config */}
        {templateWatcher?.value === "custom" && (
          <div className="flex flex-col gap-3 lg:gap-6">
            <Heading as="h5">Parachain Config</Heading>
            <div className="grid grid-cols-12 items-start gap-3 lg:gap-6">
              {/* Chain Spec File */}
              <FormField
                className="col-span-12 md:col-span-6 lg:col-span-4"
                helper={{
                  status: "error",
                  text: errors.chainSpecFile?.message?.toString(),
                }}
              >
                <Controller
                  control={control}
                  name={"chainSpecFile.contents"}
                  render={({ field: { value, onChange, ...field } }) => {
                    return (
                      <FileUpload
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
                        fileName={chainSpecFile?.name ?? ""}
                        id={"chainSpecFile"}
                        floatingLabelText={"Chain Spec File"}
                      />
                    );
                  }}
                />
              </FormField>

              {/* Binary File */}
              <FormField
                className="col-span-12 md:col-span-6 lg:col-span-4"
                helper={{
                  status: "error",
                  text: errors.binaryFile?.name?.message?.toString(),
                }}
              >
                <Controller
                  control={control}
                  name={"binaryFile.name"}
                  render={({ field: { value, onChange, ...field } }) => {
                    return (
                      <FileUpload
                        field={{
                          ...field,
                          value,
                          onChange: async (event) => {
                            onChange(event);
                            await handleBinaryFile(event);
                          },
                        }}
                        progressValue={progressValue}
                        progressTotal={progressTotal}
                        fileName={binaryFile?.name ?? ""}
                        id={"binaryFile"}
                        floatingLabelText={"Binary File"}
                        iconRight={
                          isBinaryFileUploading ? (
                            <Spinner fontSize={24} className="mx-4" />
                          ) : (
                            <SvgArrowUpFromBucket fontSize={24} className="mx-4" />
                          )
                        }
                        ref={binaryFileInputRef}
                      />
                    );
                  }}
                />
              </FormField>
            </div>
          </div>
        )}
      </div>
      <ProgressiveFormStepFooter>
        <Button type="submit" iconRight={<SvgChevronRightSquare />} isDisabled={!isValid || isBinaryFileUploading}>
          Next
        </Button>
      </ProgressiveFormStepFooter>
    </form>
  );
};

export type { ConfigureNetworkSchemaType };
export default ConfigureNetwork;
