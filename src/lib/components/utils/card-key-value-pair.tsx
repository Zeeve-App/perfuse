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
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import { Skeleton } from "@/lib/components/Skeleton";
import { tx } from "@/utils/shared";

interface CardKeyValuePairProps {
  label: string | React.ReactElement;
  value?: number | string | React.ReactElement;
  className?: string;
  isLoading?: boolean;
}

const CardKeyValuePair = ({ label, value, className, isLoading = false }: CardKeyValuePairProps) => {
  return (
    <div className={tx("rounded-lg text-left text-brand-light", className)}>
      {isLoading ? (
        <Skeleton role="status" as="div" className="max-w-sm">
          <div className="mx-auto mb-6 mt-2.5 h-3 max-w-[50px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mx-auto mb-3.5 h-2.5 max-w-[200px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </Skeleton>
      ) : (
        <>
          {typeof value === "string" || typeof value === "number" || typeof value === "undefined" ? (
            <Heading className="text-brand-light" as="h2">
              {value ?? "NA"}
            </Heading>
          ) : (
            value
          )}
          {typeof label === "string" ? (
            <Heading className="text-brand-light" as="h4">
              {label}
            </Heading>
          ) : (
            { label }
          )}
        </>
      )}
    </div>
  );
};

export type { CardKeyValuePairProps };
export default CardKeyValuePair;
