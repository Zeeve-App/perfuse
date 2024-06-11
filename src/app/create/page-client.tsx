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

  // urls
  const oldPlatformFrontendUrl = "#";

  return (
    <div className="flex flex-col gap-y-3 lg:gap-y-6">
      <Navigation
        heading={"Perfuse"}
        logo={
          <Image
            src={withBasePath("/assets/images/protocol/parachains-logo.svg")}
            alt="parachains-logo"
            width={32}
            height={32}
          />
        }
        breadcrumb={{
          items: [
            {
              label: "Dashboard",
              href: "#",
              as: "a",
            },
            {
              label: "Perfuse",
              href: "#",
            },
            {
              label: "Create",
              href: "#",
              isActive: true,
            },
          ],
        }}
      />
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
    </div>
  );
};

export default CreatePageClient;
