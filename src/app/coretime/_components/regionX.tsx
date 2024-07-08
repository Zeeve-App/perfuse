"use client";
import Link from "next/link";
import React, { ComponentPropsWithoutRef } from "react";
import Image from "next/image";

import { capitalizeFirstLetter, toShortString, withBasePath } from "@/utils/helpers";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import { Button } from "@/lib/components/Button";

interface RegionXCardProps extends ComponentPropsWithoutRef<"div"> {
  protocolId: string;
  protocolName: string;
  description: string;
  showDescription?: boolean;
}

const RegionXCard = (props: RegionXCardProps) => {
  const { protocolId, protocolName, description, showDescription = true } = props;

  return (
    <Card className="w-auto col-span-12 md:col-span-6 lg:col-span-3 rounded-lg">
      <div className="flex flex-row items-center justify-between gap-3">
        <div>
          <Heading as={"h5"}>{capitalizeFirstLetter(protocolName ?? "NA")}</Heading>
        </div>
        <div className="rounded-lg bg-brand-outline p-2">
          <Image
            src={withBasePath(``)}
            alt={`${protocolName} Icon`}
            width={24}
            height={24}
          />
        </div>
      </div>
      {showDescription ? <div className="border-b pb-2">{toShortString(description, 80, 10)}</div> : null}
      <Link
        href={""}
      >
        <Button className="w-full">Subscribe</Button>
      </Link>
    </Card>
  );
};

RegionXCard.displayName = "RegionX Card";
export type { RegionXCardProps };
export { RegionXCard };
