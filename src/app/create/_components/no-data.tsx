"use client";
import React from "react";
import Link from "next/link";
import { Card } from "@/lib/components/Card";
import SvgInfoSquare from "@/lib/icons/essential/outline/InfoSquare";

const NoData = () => {
  return (
    <Card className="col-span-12 min-h-[255px] items-center justify-center rounded-lg border-0">
      <Link href={"/create"}>
        <SvgInfoSquare className="m-auto text-4xl text-brand-blue" />
        <p className="text-center text-base font-semibold">Already Deployed</p>
        <p className="text-sm text-brand-gray">Hey! There is devnet deployed right now, can&apos;t deploy a new one.</p>
      </Link>
    </Card>
  );
};

export default NoData;
