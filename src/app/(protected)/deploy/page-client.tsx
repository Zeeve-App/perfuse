"use client";
import { useEffect, useRef } from "react";
import { ClassValue } from "class-variance-authority/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import DeployStep1 from "./_components/step-1";
import DeployStep2 from "./_components/step-2";
import DeployStep3 from "./_components/step-3";
import DeploySummary from "./_components/summary";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import { tx } from "@/utils/shared";
import { deployNetworkValidationSchema, DeployNetworkValidationSchemaType } from "@/schemas/validation-schema";
import { Badge } from "@/lib/components/Badge/Badge";
import SvgExclamationTriangle from "@/lib/icons/essential/outline/ExclamationTriangle";

const componentNameForDeploy = ["step1", "step2", "step3", "summary"] as const;
export type DeployStepTypes = (typeof componentNameForDeploy)[number];
export default function DeployPage({ deployed }: { deployed: boolean }) {
  const formData = useForm<DeployNetworkValidationSchemaType>({
    resolver: yupResolver(deployNetworkValidationSchema),
    mode: "all",
    defaultValues: {
      rpcNode: {
        http: true,
        ws: true,
      },
      sidecar: true,
      networkEnvironment: {
        value: "testnet",
      },
      relayChain: {
        value: "local",
      },
    },
  });

  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const focusOnComponent = (component: DeployStepTypes) => {
    console.log({ component, step1Ref });
    switch (component) {
      case "step1":
        step1Ref.current?.focus();
        break;
      case "step2":
        step2Ref.current?.focus();
        break;
      case "step3":
        step3Ref.current?.focus();
        break;
      case "summary":
        summaryRef.current?.focus();
        break;

      default:
        break;
    }
  };

  const focusClasses: ClassValue =
    "focus:outline-none focus-within:outline-none focus-within:ring-none focus-within:border focus-within:border-theme-secondary focus-within:opacity-100 focus:ring-none focus:border focus:border-theme-secondary focus:opacity-100";

  useEffect(() => {
    step1Ref.current?.focus();
  }, []);
  return (
    <>
      <Card variant={"grid"} className="gap-0">
        <Card variant={"grid"} className="col-span-12">
          {deployed && (
            <Badge className="col-span-12 flex items-center gap-4 rounded-md p-4 text-lg" variant="red">
              <SvgExclamationTriangle className="size-10" /> Network already deployed, Please delete the network and
              then visit this page
            </Badge>
          )}
          <Heading as="h4" className="col-span-12">
            Set Up Your Parachain
          </Heading>
        </Card>
        {/* Form */}
        <Card variant={"grid"} className="col-span-12 lg:col-span-8">
          {/* 1st step */}
          <DeployStep1
            focusOnComponent={focusOnComponent}
            formData={formData}
            ref={step1Ref}
            className={tx("col-span-12 opacity-50", focusClasses)}
          />
          {/* 2nd step */}
          <DeployStep2
            focusOnComponent={focusOnComponent}
            formData={formData}
            ref={step2Ref}
            className={tx("col-span-12 opacity-50", focusClasses)}
          />
          {/* 3rd step  */}
          <DeployStep3
            formData={formData}
            focusOnComponent={focusOnComponent}
            ref={step3Ref}
            className={tx("col-span-12 opacity-50", focusClasses)}
          />
        </Card>
        {/* Your selects */}
        <Card variant={"grid"} className="col-span-12 lg:col-span-4">
          <DeploySummary
            focusOnComponent={focusOnComponent}
            formData={formData}
            // ref={summaryRef}
            className={tx("col-span-12")}
            deployed={deployed}
          />
        </Card>
      </Card>
    </>
  );
}
