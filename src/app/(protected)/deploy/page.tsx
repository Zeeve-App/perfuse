"use client";

import { useEffect, useRef } from "react";
import { ClassValue } from "class-variance-authority/types";
import { Card } from "@/lib/components/Card";
import { Input } from "@/lib/components/Form";
import { Heading } from "@/lib/components/Heading";
import { tx } from "@/utils/shared";

export default function Home() {
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
          <Card tabIndex={0} ref={step1Ref} className={tx("col-span-12 opacity-50", focusClasses)}>
            <Heading as="h5" className="col-span-12">
              Select your Network Environment
            </Heading>
            <div className="col-span-6"></div>
            <div className="col-span-6"></div>
          </Card>
          {/* 2nd step */}
          <Card tabIndex={0} ref={step2Ref} className={tx("col-span-12 opacity-50 ", focusClasses)}>
            <Card variant={"grid-no-pad"} className="col-span-6 ">
              <Heading as="h5" className="col-span-12">
                Chain Name
              </Heading>
              <Input
                // {...register("tokenName")}
                placeholder="Chain Name"
                inputContainerProps={{ className: "col-span-12" }}
                isRequired
                // floatingLabel={{
                //   labelText: "Token Symbol",
                // }}
              />
            </Card>
            <Card variant={"grid-no-pad"} className="col-span-6 ">
              <Heading as="h5" className="col-span-12">
                Token Symbol
              </Heading>
              <Input
                // {...register("tokenName")}
                placeholder="DOT"
                inputContainerProps={{ className: "col-span-12" }}
                isRequired
                // floatingLabel={{
                //   labelText: "Token Symbol",
                // }}
              />
            </Card>
          </Card>
          {/* 3rd step  */}
          <Card tabIndex={0} ref={step3Ref} className={tx("col-span-12 opacity-50", focusClasses)}></Card>
        </Card>
        {/* Your selects */}
        <Card variant={"grid"} className="col-span-4">
          <Card className="col-span-12"></Card>
        </Card>
      </Card>
    </>
  );
}
