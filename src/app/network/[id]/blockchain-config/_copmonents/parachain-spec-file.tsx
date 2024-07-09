"use client";
import React, { Suspense, lazy } from "react";
import { useParams } from "next/navigation";
import { downloadFile } from "@/utils/helpers";
import { ChainSpecFileType } from "@/types/chain-spec";
import SvgDownload from "@/lib/icons/product/outline/Download";
import { IconButton } from "@/lib/components/Button";
import { Heading } from "@/lib/components/Heading";
import { Spinner } from "@/lib/components/Spinner";
import { Tooltip } from "@/lib/components/Tooltip";
import { tx } from "@/utils/shared";

interface ParachainSpecFileProps {
  data?: ChainSpecFileType;
  isLoading: boolean;
}

const ParachainSpecFile = ({ data, isLoading }: ParachainSpecFileProps) => {
  const params = useParams();
  const networkId = params.id as string;
  const ExtraComponent = lazy(() => import("./parachain-chainspec-preview"));

  return (
    <div className="col-span-12 flex flex-col overflow-hidden rounded-lg shadow-brand-shadow ">
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <Heading as="h4">Parachain Spec File</Heading>
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
          className={tx("col-span-12 row-span-3 flex max-h-52 flex-col rounded-lg border border-brand-outline", {
            "h-52": !data,
          })}
        >
          {data && !isLoading && (
            <Suspense
              fallback={
                <div className="flex h-screen items-center justify-center">
                  <Spinner />
                </div>
              }
            >
              <ExtraComponent data={data} />
            </Suspense>
          )}
          {!data && !isLoading && (
            <div className="flex h-screen items-center justify-center text-sm text-brand-gray">No data available.</div>
          )}
          {isLoading && (
            <div className="flex h-screen items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParachainSpecFile;
