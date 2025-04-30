/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * Copyright (C) 2024 [Perfuse]
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

"use client";
import React, { ComponentPropsWithoutRef } from "react";

import Image from "next/image";
import { capitalizeFirstLetter, withBasePath } from "@/utils/helpers";
import { Card } from "@/lib/components/Card";
import { Button } from "@/lib/components/Button";
import { useToggle } from "@/hooks";
import { Typography } from "@/lib/components/Typography";

/** regionX props */
interface CoreTimeCardProps extends ComponentPropsWithoutRef<"div"> {
  protocolId: string;
  protocolName: string;
  description: string;
  showDescription?: boolean;
  regionXLink: string;
}

/** regionX card for core time page */
const CoreTimeCard = (props: CoreTimeCardProps) => {
  const { protocolName, description, className } = props;
  const { isOpen, handleToggle } = useToggle();

  return (
    <Card
      variant={"grid"}
      className={`col-span-12 items-center justify-between rounded-lg bg-theme-foreground ${className}`}
    >
      <div className="col-span-10">
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex gap-3">
            <Image
              src={withBasePath(`/assets/images/coretime/${protocolName.toLowerCase()}.png`)}
              alt={`${protocolName} Icon`}
              width={25}
              height={25}
              className=" inline"
            />
            <Typography variant="subtitle" className="col-span-12 inline">
              {capitalizeFirstLetter(protocolName ?? "NA")}
            </Typography>
          </div>
          {/* <SvgBubbles className=" text-brand-primary" /> */}
          {!isOpen && (
            <>
              <Typography variant="paragraph">{description.slice(0, 90)}</Typography>
              <Typography
                variant="paragraph"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle();
                }}
                className="cursor-pointer text-theme-secondary"
              >
                see more
              </Typography>
            </>
          )}
          {isOpen && (
            <>
              <Typography variant="paragraph">{description}</Typography>
              <Typography
                variant="paragraph"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle();
                }}
                className="cursor-pointer text-brand-blue"
              >
                see less
              </Typography>
            </>
          )}
        </div>
      </div>
      <Button
        className="col-span-2 w-full"
        variant={"solid"}
        colorScheme={"gradient"}
        onClick={() => {
          window.open(props.regionXLink);
        }}
      >
        Visit
      </Button>
    </Card>
  );
};

CoreTimeCard.displayName = "RegionX Card";
export type { CoreTimeCardProps };
export { CoreTimeCard };
