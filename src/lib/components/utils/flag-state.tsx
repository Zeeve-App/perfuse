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
import SvgCheckCircle from "@/lib/icons/essential/outline/CheckCircle";
import SvgXMarkCircle from "@/lib/icons/essential/outline/XMarkCircle";

const FlagState = ({ flag }: { flag?: boolean | 0 | 1 }) => {
  const val = Boolean(flag);
  return (
    <>
      {val ? (
        <div className="flex items-center">
          <SvgCheckCircle className="mr-2 text-brand-green" />
          ENABLED
        </div>
      ) : (
        <div className="flex items-center">
          <SvgXMarkCircle className="mr-2 text-brand-red" />
          DISABLED
        </div>
      )}
    </>
  );
};

export default FlagState;
