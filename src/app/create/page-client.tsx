"use client";
import React, { useState } from "react";
import ConfigureNetwork from "./_components/form-steps/step-1-configure-network";
import ConfigureRelayChain from "./_components/form-steps/step-2-configure-relay-chain";
// import ROUTES from "@/routes";
// import { getConfig } from "@/config";
import DeploySucceed from "./_components/form-steps/step-3-success";
import {
  ProgressiveForm,
  ProgressiveFormHeader,
  ProgressiveFormHeaderItem,
  ProgressiveFormBody,
} from "@/lib/components/ProgressiveForm";
import { Heading } from "@/lib/components/Heading";
import SvgCheckCircle from "@/lib/icons/essential/outline/CheckCircle";

const getIcons = (step: number) => ({
  idle: (
    <div className="flex size-5 items-center justify-center rounded-full border border-brand-gray text-brand-gray">
      <span>{step}</span>
    </div>
  ),
  active: (
    <div className="flex size-5 items-center justify-center rounded-full border-2 border-brand-blue  bg-brand-blue text-white">
      <span>{step}</span>
    </div>
  ),
  completed: <SvgCheckCircle className="fill-brand-green text-white" height={25} width={25} />,
});

const CreatePageClient = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <ProgressiveForm activeStep={activeStep} setActiveStep={setActiveStep} className="bg-white">
      <Heading as="h3" className="p-3 lg:p-6">
        Set Up Your Parachain
      </Heading>
      <ProgressiveFormHeader>
        <ProgressiveFormHeaderItem title="Select Environment" icons={getIcons(1)} />
        <ProgressiveFormHeaderItem title="Configuration" icons={getIcons(2)} />
        <ProgressiveFormHeaderItem
          title="Complete Deployment"
          icons={{ ...getIcons(3), active: getIcons(3).completed }}
        />
      </ProgressiveFormHeader>
      <ProgressiveFormBody>
        <ConfigureNetwork />
        <ConfigureRelayChain />
        <DeploySucceed />
      </ProgressiveFormBody>
    </ProgressiveForm>
  );
};

export default CreatePageClient;
