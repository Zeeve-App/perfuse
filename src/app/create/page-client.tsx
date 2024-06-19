"use client";
import Image from "next/image";
import React, { useState } from "react";
import ConfigureNetwork from "./_components/form-steps/step-1-configure-network";
import ConfigureRelayChain from "./_components/form-steps/step-2-configure-relay-chain";
// import ROUTES from "@/routes";
// import { getConfig } from "@/config";
import { withBasePath } from "@/utils/helpers";
import { Navigation } from "@/lib/components/navigation";
import {
  ProgressiveForm,
  ProgressiveFormHeader,
  ProgressiveFormHeaderItem,
  ProgressiveFormBody,
} from "@/lib/components/ProgressiveForm";
import { useCreateNetworkFormStore } from "@/store/create-network";

const CreatePageClient = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const createNetworkForm = useCreateNetworkFormStore();

  return (
    <ProgressiveForm
      activeStep={activeStep}
      setActiveStep={setActiveStep}
      className="bg-white"
      onSubmit={() => {
        console.log(JSON.stringify(createNetworkForm));
      }}
    >
      <ProgressiveFormHeader>
        <ProgressiveFormHeaderItem title="Configure Network" />
        <ProgressiveFormHeaderItem title="Configure Relay Chain" />
      </ProgressiveFormHeader>
      <ProgressiveFormBody>
        <ConfigureNetwork />
        <ConfigureRelayChain />
      </ProgressiveFormBody>
    </ProgressiveForm>
  );
};

export default CreatePageClient;
