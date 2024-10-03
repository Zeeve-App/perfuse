"use client";

import { useEffect, useRef } from "react";
import { ClassValue } from "class-variance-authority/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import DeployStep1 from "./_components/step-1";
import DeployStep2 from "./_components/step-2";
import DeployStep3 from "./_components/step-3";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import { tx } from "@/utils/shared";
import { deployNetworkValidationSchema, DeployNetworkValidationSchemaType } from "@/schemas/validation-schema";

export default function Home() {
  const formData = useForm<DeployNetworkValidationSchemaType>({
    resolver: yupResolver(deployNetworkValidationSchema),
    mode: "all",
    defaultValues: {},
  });

  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const focusClasses: ClassValue =
    "focus:outline-none focus-within:outline-none focus-within:ring-none focus-within:border focus-within:border-theme-secondary focus-within:opacity-100 focus:ring-none focus:border focus:border-theme-secondary focus:opacity-100";

  useEffect(() => {
    step1Ref.current?.focus();
  }, []);
  return (
    <>
      <Card variant={"grid"} className="gap-0">
        <Card variant={"grid"} className="col-span-12">
          <Heading as="h4" className="col-span-12">
            Set Up Your Parachain
          </Heading>
        </Card>
        {/* Form */}
        <Card variant={"grid"} className="col-span-8">
          {/* 1st step */}
          <DeployStep1 formData={formData} ref={step1Ref} className={tx("col-span-12 opacity-50", focusClasses)} />
          {/* 2nd step */}
          <DeployStep2 formData={formData} ref={step2Ref} className={tx("col-span-12 opacity-50", focusClasses)} />
          {/* 3rd step  */}
          <DeployStep3 formData={formData} ref={step3Ref} className={tx("col-span-12 opacity-50", focusClasses)} />
        </Card>
        {/* Your selects */}
        <Card variant={"grid"} className="col-span-4">
          <Card className="col-span-12"></Card>
        </Card>
      </Card>
    </>
  );
}
