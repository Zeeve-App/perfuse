"use client";
import React from "react";
import Link from "next/link";
import { Card } from "@/lib/components/Card";
import SvgPlusSquare from "@/lib/icons/essential/outline/PlusSquare";

const NoData = () => {
  return (
    <Card className="col-span-12 min-h-[255px] items-center justify-center rounded-lg border-0">
      <Link href={"/create"}>
        <SvgPlusSquare className="m-auto text-4xl text-brand-blue" />
        <p className="text-center text-base font-semibold">Deploy Devnet</p>
        <p className="text-sm text-brand-gray">Hey! There is no devnet deployed right now, deploy a new one.</p>
      </Link>
    </Card>
  );
};

export default NoData;
