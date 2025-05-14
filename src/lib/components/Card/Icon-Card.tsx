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
import { withBasePath } from "@/utils/helpers";
import { Card } from "@/lib/components/Card";
import { Button } from "@/lib/components/Button";
import { useToggle } from "@/hooks";
import { Typography } from "@/lib/components/Typography";
import { tx } from "@/utils/shared";

/** regionX props */
interface IconCardProps extends ComponentPropsWithoutRef<"div"> {
  protocolId: string;
  protocolName: string | JSX.Element;
  description: string;
  showDescription?: boolean;
  serviceLink: string;
  imageSrc?: string;
  docLink?: string;
  isSelected: boolean;
  btnText?: string;
  onClick: () => void;
  isLoading?: boolean;
  btnDisabled?: boolean;
}

/** regionX card for core time page */
const IconCard = (props: IconCardProps) => {
  const {
    protocolName,
    description,
    imageSrc,
    className,
    isSelected,
    btnText = "Visit",
    onClick,
    isLoading = false,
    btnDisabled = false,
  } = props;
  const { isOpen, handleToggle } = useToggle();

  return (
    <Card
      variant={"grid"}
      className={tx("col-span-12 items-center justify-between rounded-lg bg-theme-foreground", className)}
    >
      <div className="col-span-12 flex flex-col gap-4">
        <div className="flex flex-col items-baseline gap-4">
          <div className="flex gap-3">
            <Image
              src={withBasePath(imageSrc ?? `/assets/images/coretime/regionx.png`)}
              alt={`${protocolName} Icon`}
              width={25}
              height={25}
              className=" inline"
            />
            <Typography variant="title" className="col-span-12 inline capitalize">
              {protocolName ?? "NA"}
            </Typography>
          </div>
          {/* <SvgBubbles className=" text-brand-primary" /> */}
          {!isOpen && (
            <div>
              <Typography as="span" variant="paragraph">
                {description.slice(0, 90)}
              </Typography>
              <Typography
                as="span"
                variant="paragraph"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle();
                }}
                className="cursor-pointer text-theme-secondary"
              >
                see more
              </Typography>
            </div>
          )}
          {isOpen && (
            <div>
              <Typography as="span" variant="paragraph">
                {description}
              </Typography>
              <Typography
                variant="paragraph"
                as="span"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggle();
                }}
                className="cursor-pointer text-brand-blue"
              >
                see less
              </Typography>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            className="col-span-2 w-full"
            variant={"solid"}
            colorScheme={"gradient"}
            onClick={() => {
              onClick();
            }}
            isDisabled={btnDisabled}
            isLoading={isLoading}
            // isDisabled={!isSelected}
          >
            {btnText}
          </Button>
          {/* {props.docLink && (
            <Button
              className="col-span-2 w-full"
              variant={"outline"}
              colorScheme={"accent"}
              onClick={() => {
                window.open(props.docLink);
              }}
            >
              Docs
            </Button>
          )} */}
        </div>
      </div>
    </Card>
  );
};

IconCard.displayName = "Icon Card";
export type { IconCardProps };
export { IconCard };
