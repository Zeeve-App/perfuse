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
import HTTP_STATUS from "@/constants/http";
import { FormField } from "@/lib/components/Form/FormField";
import SvgArrowUpFromBucket from "@/lib/icons/arrows/outline/ArrowUpFromBucket";
import SvgChevronRightSquare from "@/lib/icons/arrows/outline/ChevronRightSquare";
import { FileUpload } from "@/lib/components/Form/FileUpload";
import useApi from "@/api-client";
import { RadioCard } from "@/lib/components/RadioCard";
import SvgApiConnect from "@/lib/icons/product/outline/ApiConnect";
import { Radio } from "@/lib/components/Form";

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
    register,
    reset,
    setError,
    formState: { errors, isValid },
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
    // setValue("relayChain", { label: undefined });
    reset((e) => ({ ...e, relayChain: { value: "" } }));
  }, [networkEnvWatcher?.value, reset]);

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

          setValue("binaryFile.path", response.data.data.path);
        }
      }
    } catch (error) {
      // reset states
      handleBinaryFileInputReset();
      setBinaryFile(null);
      setGlobalNetworkId(null);

      setError("binaryFile", { message: "Something Wrong" });
      // toast("Error uploading binary file.", {
      //   status: "error",
      // });
    } finally {
      setIsBinaryFileUploading(false);
    }
  };

  // action to perform while submitting the form
  const onSubmit = (data: ConfigureNetworkSchemaType) => {
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
    console.log(chainspecContent);

    const runtimeGenesis = chainspecContent.genesis.runtimeGenesis;
    const collatorAddresses = runtimeGenesis?.patch?.aura?.authorities ?? [
      runtimeGenesis?.patch.session?.keys?.[0]?.[0],
      runtimeGenesis?.patch.session?.keys?.[0]?.[1],
    ];
    setFormData({
      step: "configureRelayChain",
      data: {
        relay_chain: { value: chainspecContent.relay_chain, label: chainspecContent.relay_chain },
        version: { value: chainspecContent.relay_chain, label: chainspecContent.relay_chain },
        paraId: chainspecContent.para_id,
        decimalValue: chainspecContent.properties?.tokenDecimals,
        protocolId: chainspecContent.protocolId ?? undefined,
        tokenName: chainspecContent.properties?.tokenSymbol,
        telemetryEndpoint: chainspecContent.telemetryEndpoints ?? undefined,
        name: chainspecContent.name ?? undefined,
        encoding: chainspecContent.properties ? "ss58Format" : undefined,
        chainType: chainspecContent.chainType ?? undefined,
        candidacyBond: chainspecContent.genesis.runtime?.collatorSelection.candidacyBond ?? undefined,
        collatorNodes: collatorAddresses?.map((col, idx) => {
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
    <form autoComplete="off" className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 p-6 shadow-brand-shadow lg:gap-6 lg:p-9">
        {/* Network Config */}
        <div className="flex flex-col gap-3 lg:gap-6">
          {/* <Heading as="h5">Network Config</Heading> */}
          <div className="grid grid-cols-12 items-start gap-3 lg:gap-6">
            {/* Network Environment */}
            <div className="col-span-12 flex flex-col gap-3 lg:gap-6">
              <div className="flex flex-row items-center gap-1">
                <Heading as="h5">Select Your Network Environment</Heading>
                {/* <Tooltip text="Select environment for your deployment." placement="top-start">
                  <IconButton variant="text" colorScheme="gray">
                    <SvgInfoCircle className="text-base" />
                  </IconButton>
                </Tooltip> */}
              </div>
              <div className="grid grid-cols-12 gap-3 lg:gap-6">
                {networkEnvOption.length
                  ? networkEnvOption.map((environment, index) => {
                      return (
                        <RadioCard
                          key={index}
                          value={environment.value}
                          className="col-span-12 md:col-span-3"
                          {...register("networkEnviorment.value")}
                          isChecked={watch("networkEnviorment")?.value == environment?.value}
                          hideRadioCircle={true}
                          isDisabled={environment.isDisabled}
                        >
                          <SvgApiConnect width={25} height={25} />
                          {environment.label}
                        </RadioCard>
                      );
                    })
                  : null}
              </div>
            </div>
            {/* Template */}
            {watch("networkEnviorment")?.value ? (
              <div className="col-span-12 flex flex-col gap-3 lg:gap-6">
                <div className="flex flex-row items-center gap-1">
                  <Heading as="h5">Select Template</Heading>
                  {/* <Tooltip text="Select environment for your deployment." placement="top-start">
                    <IconButton variant="text" colorScheme="gray">
                      <SvgInfoCircle className="text-base" />
                    </IconButton>
                  </Tooltip> */}
                </div>
                <div className="grid grid-cols-12 gap-3 lg:gap-6">
                  {templateOption.length
                    ? templateOption.map((template, index) => {
                        return (
                          <RadioCard
                            key={template.value}
                            value={template.value}
                            className="col-span-12 md:col-span-3"
                            isDisabled={template.isDisabled}
                            {...register("template.value")}
                            isChecked={watch("template")?.value == template?.value}
                            hideRadioCircle={true}
                          >
                            {template.label}
                          </RadioCard>
                        );
                      })
                    : null}
                </div>
              </div>
            ) : null}
            {/* Relay chain */}
            {watch("template")?.value ? (
              <div className="col-span-12 flex flex-col gap-3 lg:gap-6">
                <div className="flex flex-row items-center gap-1">
                  <Heading as="h5">Select Relay chain</Heading>
                  {/* <Tooltip text="Select environment for your deployment." placement="top-start">
                    <IconButton variant="text" colorScheme="gray">
                      <SvgInfoCircle className="text-base" />
                    </IconButton>
                  </Tooltip> */}
                </div>
                <div className="grid grid-cols-12 gap-3 lg:gap-6">
                  {relayChainOption[networkEnvWatcher?.value ?? "testnet"].length
                    ? relayChainOption[networkEnvWatcher?.value ?? "testnet"].map((relayChain, index) => {
                        return (
                          <RadioCard
                            key={index}
                            value={relayChain.value}
                            className="col-span-12 md:col-span-3"
                            {...register("relayChain.value")}
                            isChecked={watch("relayChain")?.value == relayChain?.value}
                            hideRadioCircle={true}
                          >
                            {relayChain.label}
                          </RadioCard>
                        );
                      })
                    : null}
                </div>
                {/* Sidecar */}
                <div className="flex flex-row items-center gap-1">
                  <Heading as="h5">Sidecar</Heading>
                  {/* <Tooltip text="Select environment for your deployment." placement="top-start">
                    <IconButton variant="text" colorScheme="gray">
                      <SvgInfoCircle className="text-base" />
                    </IconButton>
                  </Tooltip> */}
                </div>
                <div className="grid grid-cols-12 gap-3 lg:gap-6">
                  {sideCardOptions.length
                    ? sideCardOptions.map((sidecar, index) => {
                        return (
                          <Radio
                            key={index}
                            value={sidecar.value}
                            className="col-span-12 md:col-span-3"
                            colorScheme={"blue"}
                            {...register("sidecar.value")}
                            isChecked={watch("sidecar")?.value == sidecar?.value}
                            // hideRadioCircle={true}
                          >
                            {sidecar.label}
                          </Radio>
                        );
                      })
                    : null}
                </div>
              </div>
            ) : null}
            {watch("sidecar")?.value !== undefined ? (
              <div className="col-span-12 flex flex-col gap-3 lg:gap-6">
                <div className="flex flex-row items-center gap-1">
                  <Heading as="h5">Explorer</Heading>
                  {/* <Tooltip text="Select environment for your deployment." placement="top-start">
                    <IconButton variant="text" colorScheme="gray">
                      <SvgInfoCircle className="text-base" />
                    </IconButton>
                  </Tooltip> */}
                </div>
                <div className="grid grid-cols-12 gap-3 lg:gap-6">
                  {explorerOption.length
                    ? explorerOption.map((explorer, index) => {
                        return (
                          <RadioCard
                            key={index}
                            value={explorer.value}
                            className="col-span-12 md:col-span-3"
                            isDisabled={explorer.isDisabled}
                            {...register("explorer.value")}
                            isChecked={watch("explorer")?.value == explorer?.value}
                            hideRadioCircle={true}
                          >
                            {explorer.label}
                          </RadioCard>
                        );
                      })
                    : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* <hr className="border-brand-outline" /> */}

        {/* Parachain Config */}
        {templateWatcher?.value === "custom" && (
          <div className="flex flex-col gap-3 lg:gap-6">
            <Heading as="h5">Upload</Heading>
            <div className="grid grid-cols-12 items-start gap-3 lg:gap-6">
              {/* Chain Spec File */}
              <FormField
                className="col-span-12 2xl:col-span-6"
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
                        fileName={chainSpecFile?.name}
                        id={"chainSpecFile"}
                        floatingLabelText={"Upload Chain-specification"}
                      />
                    );
                  }}
                />
              </FormField>

              {/* Binary File */}
              <FormField
                className="col-span-12 2xl:col-span-6"
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
                        error={errors.binaryFile?.message}
                        progressValue={progressValue}
                        progressTotal={progressTotal}
                        fileName={binaryFile?.name}
                        id={"binaryFile"}
                        floatingLabelText={"Upload Binary"}
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
        <Button
          className="bg-brand-gradient-blue"
          type="submit"
          iconRight={<SvgChevronRightSquare />}
          isDisabled={!isValid || isBinaryFileUploading}
        >
          Next
        </Button>
      </ProgressiveFormStepFooter>
    </form>
  );
};

export type { ConfigureNetworkSchemaType };
export default ConfigureNetwork;
