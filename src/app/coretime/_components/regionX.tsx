"use client";
import Link from "next/link";
import React, { ComponentPropsWithoutRef } from "react";
import Image from "next/image";

import { capitalizeFirstLetter, toShortString, withBasePath } from "@/utils/helpers";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import { Button } from "@/lib/components/Button";
import SvgBubbles from "@/lib/icons/essential/outline/Bubbles";

interface RegionXCardProps extends ComponentPropsWithoutRef<"div"> {
  protocolId: string;
  protocolName: string;
  description: string;
  showDescription?: boolean;
}

const RegionXCard = (props: RegionXCardProps) => {
  const { protocolId, protocolName, description, showDescription = true } = props;

  return (
    <Card className="col-span-12 w-auto rounded-lg shadow-brand-shadow md:col-span-6 lg:col-span-3">
      <div className="flex flex-col items-start justify-between gap-3">
        {/* <div className="rounded-lg bg-brand-outline p-2">
          <Image src={withBasePath(``)} alt={`${protocolName} Icon`} width={24} height={24} />
        </div> */}
        <div>
          <Heading as={"h1"}>{capitalizeFirstLetter(protocolName ?? "NA")}</Heading>
        </div>
      </div>
      <div className="flex items-center justify-between py-1 text-xs">
        <div className="flex items-baseline gap-2">
          <SvgBubbles className="text-brand-primary" />
          <div className="text-brand-gray">{description}</div>
        </div>
        <div></div>
      </div>
      <Link href={""}>
        <Button className="w-full" variant={"ghost"}>
          Visit
        </Button>
      </Link>
    </Card>
  );
};

RegionXCard.displayName = "RegionX Card";
export type { RegionXCardProps };
export { RegionXCard };
