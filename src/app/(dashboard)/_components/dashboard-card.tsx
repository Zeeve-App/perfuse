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

import Link from "next/link";
import React from "react";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import SvgBubbles from "@/lib/icons/essential/outline/Bubbles";
import { Button } from "@/lib/components/Button";
import SvgArrow1Right from "@/lib/icons/arrows/outline/Arrow1Right";

const DashboardCard = ({
  title,
  description,
  Icon,
  href,
}: {
  title: string;
  description: string;
  href: string;
  Icon: React.ElementType;
}) => {
  return (
    <Card className={"col-span-12 flex-col rounded-lg md:col-span-6 lg:col-span-4 xl:col-span-3"}>
      <div className="flex flex-row items-center gap-3">
        <div className="rounded-lg bg-brand-outline p-2">
          <Icon />
        </div>
        <div>
          <Heading as={"h5"}>{title}</Heading>
          {/* {networkId ? (
            <Tooltip text={networkId} placement={"top-start"}>
              <div className="flex items-center gap-2 text-xs text-brand-gray">
                ID: {toShortString(networkId)}
                <CopyButton text={networkId} />
              </div>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-2 text-xs text-brand-gray">ID: NA</div>
          )} */}
        </div>
      </div>
      <div className="border-b pb-2">
        <div className="flex items-center justify-between py-1 text-xs">
          <div className="flex items-baseline gap-2">
            <SvgBubbles className="text-brand-primary" />
            <div className="text-brand-gray">{description}</div>
          </div>
        </div>
      </div>
      <Link href={href}>
        <Button className="w-full justify-start px-0" colorScheme="primary" variant={"text"}>
          Learn more <SvgArrow1Right />
        </Button>
      </Link>
    </Card>
  );
};

export { DashboardCard };
