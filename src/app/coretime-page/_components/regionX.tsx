"use client";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";

import Image from "next/image";
import { capitalizeFirstLetter, withBasePath } from "@/utils/helpers";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import { Button } from "@/lib/components/Button";
import { useToggle } from "@/hooks";

interface RegionXCardProps extends ComponentPropsWithoutRef<"div"> {
  protocolId: string;
  protocolName: string;
  description: string;
  showDescription?: boolean;
}

const RegionXCard = (props: RegionXCardProps) => {
  const { protocolId, protocolName, description, showDescription = true } = props;
  const { isOpen, handleToggle } = useToggle();
  const [hostname, setHostname] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(`${window.location.protocol}//${window.location.hostname}`);
    }
  }, []);

  return (
    <Card className="col-span-12 w-auto rounded-lg shadow-brand-shadow md:col-span-6 lg:col-span-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Heading as={"h2"}>{capitalizeFirstLetter(protocolName ?? "NA")}</Heading>
        </div>
        <div className="rounded-lg">
          <Image
            src={withBasePath(`/assets/images/coretime/regionx.png`)}
            alt={`${protocolName} Icon`}
            width={48}
            height={48}
          />
        </div>
      </div>
      <div className="flex items-center justify-between py-4 text-sm">
        <div className="flex items-baseline gap-2">
          {/* <SvgBubbles className=" text-brand-primary" /> */}
          {!isOpen && (
            <div className="text-brand-gray">
              {description.slice(0, 90)}
              <a
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle();
                }}
                className="cursor-pointer text-brand-blue"
              >
                ...see more
              </a>
            </div>
          )}
          {isOpen && (
            <div className="text-brand-gray">
              {description}
              <a
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle();
                }}
                className="cursor-pointer text-brand-blue"
              >
                see less
              </a>
            </div>
          )}
        </div>
      </div>
      <Button
        className="w-full"
        variant={"outline"}
        onClick={() => {
          window.open(`${hostname}:3030`);
        }}
      >
        Visit
      </Button>
    </Card>
  );
};

RegionXCard.displayName = "RegionX Card";
export type { RegionXCardProps };
export { RegionXCard };
