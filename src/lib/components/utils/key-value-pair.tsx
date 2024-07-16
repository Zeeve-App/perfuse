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
import React from "react";
import { CopyButton } from "@/lib/components/Button";
import { Skeleton } from "@/lib/components/Skeleton";
import { tx } from "@/utils/shared";

const KeyValuePair = ({
  label,
  value,
  enableBorder = true,
  isLoading = false,
  className,
  shouldAllowCopy,
}: {
  label: string | React.ReactElement;
  value: number | string | React.ReactElement;
  enableBorder?: boolean;
  isLoading?: boolean;
  className?: string;
  shouldAllowCopy?: boolean;
}) => {
  return (
    <div
      className={tx("mx-2 pb-1 justify-between flex flex-col col-span-12 lg:col-span-6", className, {
        "border-b border-gray-200": enableBorder,
      })}
    >
      {isLoading ? (
        <Skeleton role="status" as="div" className="max-w-sm">
          <div className="mb-4 h-2.5 w-28 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </Skeleton>
      ) : (
        <>
          {typeof label === "string" ? <div className="text-sm text-gray-500">{label}</div> : label}
          <div
            className={tx("text-sm", {
              "flex flex-row items-center gap-2": shouldAllowCopy,
            })}
          >
            {value}
            {shouldAllowCopy && (typeof value === "string" || typeof value === "number") ? (
              <CopyButton text={value.toString()} />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default KeyValuePair;
