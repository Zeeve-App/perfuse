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
import React, { Suspense, lazy } from "react";
import { useParams } from "next/navigation";
import { downloadFile } from "@/utils/helpers";
import { ChainSpecFileType } from "@/types/chain-spec";
import SvgDownload from "@/lib/icons/product/outline/Download";
import { IconButton } from "@/lib/components/Button";
import { Spinner } from "@/lib/components/Spinner";
import { Tooltip } from "@/lib/components/Tooltip";
import { tx } from "@/utils/shared";
import { Typography } from "@/lib/components/Typography";
import { Card } from "@/lib/components/Card";

interface ParachainSpecFileProps {
  data?: ChainSpecFileType;
  isLoading: boolean;
}

const ParachainSpecFile = ({ data, isLoading }: ParachainSpecFileProps) => {
  const params = useParams();
  const networkId = params.id as string;
  const ExtraComponent = lazy(() => import("./parachain-chainspec-preview"));

  return (
    <Card className="col-span-12 flex h-96 flex-col overflow-hidden rounded-lg shadow-brand-shadow lg:col-span-6">
      <div className="mb-1 flex items-center justify-between">
        <Typography variant="subtitle">Parachain Spec File</Typography>
        <Tooltip text={"Download Parachain Spec File"} placement="top-start">
          <IconButton
            colorScheme="primary"
            variant={"ghost"}
            size={"small"}
            isDisabled={!data}
            onClick={() => {
              if (data) {
                downloadFile(JSON.stringify(data, null, 4), `${networkId}-parachain-spec-file.json`);
              }
            }}
          >
            <SvgDownload className="text-lg" />
          </IconButton>
        </Tooltip>
      </div>
      <div
        className={tx("col-span-12 row-span-3 flex h-72 flex-col rounded-lg border border-brand-outline", {
          "h-52": !data,
        })}
      >
        {data && !isLoading && (
          <Suspense
            fallback={
              <div className="flex  items-center justify-center">
                <Spinner />
              </div>
            }
          >
            <ExtraComponent data={data} />
          </Suspense>
        )}
        {!data && !isLoading && (
          <div className="flex  items-center justify-center text-sm text-brand-gray">No data available.</div>
        )}
        {isLoading && (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </Card>
  );
};

export default ParachainSpecFile;
