"use client";
import React from "react";
import { Input, Label } from "../Form";
import { CopyButton } from "@/lib/components/Button";
import { Skeleton } from "@/lib/components/Skeleton";
import { tx } from "@/utils/shared";

const KeyValuePairInput = ({
  label,
  value,
  enableBorder = false,
  isLoading = false,
  className,
  shouldAllowCopy,
}: {
  label: string | React.ReactElement;
  value: number | string;
  enableBorder?: boolean;
  isLoading?: boolean;
  className?: string;
  shouldAllowCopy?: boolean;
}) => {
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
          {/* <div
            className={tx("text-sm", {
              "flex flex-row items-center gap-2": shouldAllowCopy,
            })}
          >
            {value}
            {shouldAllowCopy && (typeof value === "string" || typeof value === "number") ? (
              <CopyButton text={value.toString()} />
            ) : null}
          </div> */}
          <div className="relative">
            <Input type="text" isDisabled value={value} />
            {shouldAllowCopy && (typeof value === "string" || typeof value === "number") ? (
              <CopyButton text={value.toString()} className="absolute right-3 top-5 " />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default KeyValuePairInput;
