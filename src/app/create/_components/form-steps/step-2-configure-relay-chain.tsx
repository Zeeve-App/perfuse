"use client";
import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { configureRelayChainValidationSchema } from "./validation-schema";
import AddCollatorForm from "./_components/add-collator";
import AddRpcForm from "./_components/add-rpc";
import { useCreateNetworkFormStore } from "@/store/create-network";
import { relayChainTypeOptions } from "@/constants/parachain-options";
import { Button } from "@/lib/components/Button";
import { FormField } from "@/lib/components/Form/FormField";
import { Heading } from "@/lib/components/Heading";
import { useProgressiveFormContext, ProgressiveFormStepFooter } from "@/lib/components/ProgressiveForm";
import { Input, Label } from "@/lib/components/Form";

import HTTP_STATUS from "@/constants/http";
import { CreatePerfuseApiPayload } from "@/app/api/create/route";
import { ChainSpecFileType } from "@/types/chain-spec";
import useApi from "@/api-client";

type ConfigureRelayChainSchemaType = yup.InferType<typeof configureRelayChainValidationSchema>;

const ConfigureRelayChain = () => {
  const { configureNetwork, configureRelayChain, setFormData } = useCreateNetworkFormStore();
  const apis = useApi();

  const {
    handleSubmit,
    control,
    getValues,
    register,
    unregister,
    watch,
    formState: { errors, isValid },
  } = useForm<ConfigureRelayChainSchemaType>({
    resolver: yupResolver(configureRelayChainValidationSchema),
    mode: "all",
    defaultValues: configureRelayChain ?? {
      relay_chain: relayChainTypeOptions.find((e) => e.value === configureNetwork?.chainSpecFile?.contents.relay_chain),
      rpcNodes: [
        {
          type: "rpc",
          http: true,
          ws: true,
          credentials: {
            type: "api_key",
          },
        },
      ],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "rpcNodes",
  });

  const { fields: collatorFields, append: appendCollator } = useFieldArray({
    control,
    name: "collatorNodes",
  });

  const { goToPreviousStep, goToNextStep } = useProgressiveFormContext();

  const handleBack = () => {
    const data = getValues();
    setFormData({ step: "configureRelayChain", data });
    goToPreviousStep();
  };

  const onSubmit = async (data: ConfigureRelayChainSchemaType) => {
    setFormData({ step: "configureRelayChain", data });
    const chainspec = configureNetwork?.chainSpecFile.contents;

    const payload: CreatePerfuseApiPayload = {
      network: {
        network_name: data.name,
        network_env: configureNetwork?.networkEnviorment.value ?? "",
        network_template: configureNetwork?.template.value ?? "",
        network_relay_chain: configureNetwork?.relayChain.value ?? "",
        network_sidecar: configureNetwork?.sidecar.value ?? 0,
        network_blockchain_explorer: configureNetwork?.explorer.value ?? "",
        network_chain_spec_file_json: {
          ...chainspec,
          telemetryEndpoints: data.telemetryEndpoint,
          properties: { ...chainspec?.properties, tokenSymbol: data.tokenName },
        } as ChainSpecFileType,
        network_binary_path: configureNetwork?.binaryFile.path ?? "",
      },
      nodes: [
        ...(data.collatorNodes?.map
          ? data.collatorNodes?.map((e): CreatePerfuseApiPayload["nodes"][0] => {
              return {
                node_name: e.collatorName ?? "",
                node_type: "collator",
                node_address: e.collatorAddress ?? "",
                node_rpc_cors: e.rpcCors ?? "",
                node_balance: e.collatorBalance ?? 0,
              };
            })
          : []),
        ...(data.rpcNodes?.map
          ? data.rpcNodes?.map((e): CreatePerfuseApiPayload["nodes"][0] => {
              return {
                node_name: e.name ?? "",
                node_type: "rpc",
                node_auth_method: e.credentials.type ?? "api_key",
                node_https_enabled: e.http ?? false,
                node_username: e.credentials.username ?? "",
                node_password: e.credentials.password ?? "",
                node_wss_enabled: e.ws ?? false,
              };
            })
          : []),
      ],
    };

    const response = await apis.createNetwork(payload);

    if (response.status === HTTP_STATUS.OK && response.data.success) {
      // router.push("/" + response.data?.data?.network_id);
      goToNextStep();
    }
  };

  const watchRPCNodes = watch(["rpcNodes"])[0];

  return (
    <form autoComplete="off" className="" onSubmit={handleSubmit(onSubmit)}>
      {/* form fields */}
      <div className="flex flex-col gap-3 p-3 shadow-brand-shadow lg:gap-6 lg:p-6">
        <div className="flex flex-col gap-3 lg:gap-6">
          <Heading as="h4" className="text-brand-dark-blue">
            Parachain Configuration
          </Heading>
          <div className="grid grid-cols-12 items-start gap-3 lg:gap-6">
            {/* para Id */}
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-3"
              helper={{
                status: "error",
                text: errors.paraId?.message?.toString(),
              }}
            >
              <Label>Para Id</Label>
              <Input {...register("paraId")} placeholder="Para Id" isRequired isDisabled />
            </FormField>
            {/* Chain Type */}
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-3"
              helper={{
                status: "error",
                text: errors.chainType?.message?.toString(),
              }}
            >
              <Label>Chain Type</Label>

              <Input {...register("chainType")} placeholder="Chain Type" isDisabled isRequired />
            </FormField>
            {/* Name */}
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-3"
              helper={{
                status: "error",
                text: errors.name?.message?.toString(),
              }}
            >
              <Label>Name</Label>
              <Input {...register("name")} placeholder="Name" isDisabled isRequired />
            </FormField>
            {/* protocol Id */}
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-3"
              helper={{
                status: "error",
                text: errors.protocolId?.message?.toString(),
              }}
            >
              <Label>Protocol Id</Label>
              <Input {...register("protocolId")} placeholder="NA" isDisabled isRequired />
            </FormField>
            {/* Decimal */}
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-3"
              helper={{
                status: "error",
                text: errors.decimalValue?.message?.toString(),
              }}
            >
              <Label>Decimal</Label>
              <Input {...register("decimalValue")} placeholder="NA" isDisabled isRequired />
            </FormField>
            {/* Candidacy Bond */}
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-3"
              helper={{
                status: "error",
                text: errors.candidacyBond?.message?.toString(),
              }}
            >
              <Label>Candidacy Bond</Label>
              <Input {...register("candidacyBond")} placeholder="NA" isDisabled isRequired />
            </FormField>
            {/* Encoding */}
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-3"
              helper={{
                status: "error",
                text: errors.encoding?.message?.toString(),
              }}
            >
              <Label>Encoding</Label>
              <Input {...register("encoding")} placeholder="NA" isDisabled isRequired />
            </FormField>
            {/* Telemetry Endpoint */}
            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-3"
              helper={{
                status: "error",
                text: errors.telemetryEndpoint?.message?.toString(),
              }}
            >
              <Label>Telemetry</Label>

              <Input {...register("telemetryEndpoint")} placeholder="NA" isDisabled />
            </FormField>

            <FormField
              className="col-span-12 md:col-span-6 lg:col-span-3"
              helper={{
                status: "error",
                text: errors.tokenName?.message?.toString(),
              }}
            >
              <Label>Token Name</Label>
              <Input
                {...register("tokenName")}
                placeholder="Token Symbol"
                isRequired
                floatingLabel={{
                  labelText: "Token Symbol",
                }}
              />
            </FormField>
          </div>

          <AddCollatorForm
            appendCollator={appendCollator}
            collatorFields={collatorFields}
            errors={errors}
            register={register}
          />

          <AddRpcForm
            errors={errors}
            fields={fields}
            register={register}
            unregister={unregister}
            watchRPCNodes={watchRPCNodes}
          />
        </div>

        {/* <hr className="border-brand-outline" /> */}
      </div>
      <ProgressiveFormStepFooter>
        {/* <Button variant="outline" iconLeft={<SvgChevronLeftSquare />} onClick={handleBack}>
          Back
        </Button> */}
        <Button
          // className="bg-brand-gradient-blue"
          type="submit"
          variant={"outline"}
          // iconRight={<SvgChevronRightSquare />}
          isDisabled={!isValid}
        >
          Deploy
        </Button>
      </ProgressiveFormStepFooter>
    </form>
  );
};

export type { ConfigureRelayChainSchemaType };
export default ConfigureRelayChain;
