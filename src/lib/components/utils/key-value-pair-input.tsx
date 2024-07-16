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
import { Label } from "../Form";
import { Tooltip } from "../Tooltip";
import { CopyButton } from "@/lib/components/Button";
import { Skeleton } from "@/lib/components/Skeleton";
import { tx } from "@/utils/shared";
import SvgEyeSlash from "@/lib/icons/security/outline/EyeSlash";
import SvgEye from "@/lib/icons/security/outline/Eye";

const KeyValuePairInput = ({
  label,
  value,
  enableBorder = false,
  isLoading = false,
  className,
  tooltipText,
  shouldAllowCopy,
  showPassword,
  type = "text",
  togglePasswordShow,
  copyText,
  suppressHydrationWarning = false,
}: {
  label: string | React.ReactElement;
  value: number | string;
  enableBorder?: boolean;
  isLoading?: boolean;
  className?: string;
  shouldAllowCopy?: boolean;
  tooltipText?: string;
  showPassword?: boolean;
  type?: "text" | "password";
  togglePasswordShow?: () => void;
  copyText?: string;
  suppressHydrationWarning?: boolean;
}) => {
  const sensitive = type === "password";
  return (
    <div
      className={tx("pb-1 justify-between flex flex-col gap-2", className, {
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
          {typeof label === "string" ? <Label>{label}</Label> : label}

          <Tooltip
            text={tooltipText ?? ""}
            placement="bottom-start"
            hidden={tooltipText === undefined || tooltipText === ""}
          >
            <div className="flex flex-row items-center justify-between rounded-lg border border-brand-outline bg-brand-light p-2 text-brand-gray lg:p-4">
              <span suppressHydrationWarning={suppressHydrationWarning}>
                {sensitive ? (showPassword ? value : "*****") : value}
              </span>
              {shouldAllowCopy && (
                <span className="flex flex-row gap-1">
                  <span className={tx({ "cursor-pointer text-brand-primary": true })}>
                    <CopyButton
                      text={copyText ?? value.toString()}
                      className={tx({
                        "cursor-pointer text-brand-primary": true,
                      })}
                    />
                  </span>
                  {sensitive && (
                    <span
                      className={tx({ "cursor-pointer text-brand-primary": true })}
                      onClick={() => togglePasswordShow && togglePasswordShow()}
                    >
                      {showPassword ? <SvgEyeSlash className="size-[20px]" /> : <SvgEye className="size-[20px]" />}
                    </span>
                  )}
                </span>
              )}
            </div>
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default KeyValuePairInput;
