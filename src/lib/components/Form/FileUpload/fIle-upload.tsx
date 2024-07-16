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
import React, { forwardRef } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Heading } from "../../Heading";
import { Button } from "../../Button";
import { useID } from "@/hooks";
import SvgArrowUpFromBucket from "@/lib/icons/arrows/outline/ArrowUpFromBucket";
import { Progress } from "@/lib/components/Progress";
import SvgCheckCircle from "@/lib/icons/essential/outline/CheckCircle";
import { tx } from "@/utils/shared";

interface FileUploadProps {
  field: ControllerRenderProps;
  progressValue: number;
  progressTotal: number;
  fileName?: string;
  id: string;
  floatingLabelText: string;
  error?: string;
  fileType: string;
  iconRight?: React.ReactElement;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>((props, ref) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    field: { value, onChange, ...field },
    progressValue,
    fileType,
    progressTotal,
    fileName,
    id,
    floatingLabelText,
    error,
    iconRight = <SvgArrowUpFromBucket fontSize={24} className="mx-4" />,
  } = props;

  const [_id] = useID(id, "file-upload");
  return (
    <div className="relative flex h-max w-full">
      <label
        htmlFor={_id}
        className="peer w-full appearance-none truncate rounded-lg border border-brand-blue p-4 pr-12 text-sm font-medium leading-5 text-brand-dark placeholder:text-base placeholder:text-brand-dark/60 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        <div className="flex flex-col gap-2 lg:gap-4">
          <Heading as="h6">{floatingLabelText}</Heading>
          <div className="flex items-center justify-between gap-2 rounded-xl border-2 border-dashed p-3 lg:gap-4">
            {iconRight}
            <div>
              <p className="font-normal text-brand-dark-blue">Select a file or drag and drop here</p>
              <p className="text-brand-gray">Supported format: {fileType}</p>
            </div>
            <Button variant={"outline"}>Select File</Button>
          </div>
          {fileName && (
            <p>
              <span className="text-brand-gray ">File Name:</span> {fileName}
            </p>
          )}
          {(error || fileName) && (
            <div>
              <span
                className={tx("bg-brand-light-teal rounded-md  px-2 py-1 text-xs text-brand-gray", {
                  "bg-brand-warning": error,
                })}
              >
                {error && (
                  <>
                    <SvgCheckCircle className="inline-block" /> {error}
                  </>
                )}
                {fileName && (
                  <>
                    <SvgCheckCircle className="inline-block" /> Successfully Uploaded
                  </>
                )}
              </span>
            </div>
          )}
        </div>
        {/* {fileName && (
          <Label
            className={
              "absolute inset-x-4 right-12 top-4 origin-[0] -translate-y-4 scale-75 cursor-text gap-1 font-sans text-sm font-medium text-brand-dark/60 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-base peer-focus:left-4 peer-focus:top-4 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-sm"
            }
            isRequired
          >
            <span className="line-clamp-1">{floatingLabelText}</span>
          </Label>
        )}
        {fileName ? (
          <ShortString text={fileName} startCharCount={15} />
        ) : (
          <span className="font-sans text-base font-medium text-brand-dark/60 after:ml-1 after:text-brand-red after:content-['*']">
            {floatingLabelText}
          </span>
        )} */}
        {/* <div className={"absolute inset-y-0 right-0 flex items-center"}>{iconRight}</div> */}
        {progressValue !== progressTotal && progressValue !== 0 && (
          <Progress className="mt-0.5 h-1" value={progressValue} max={progressTotal} />
        )}
      </label>
      <input
        {...field}
        onChange={(e) => {
          onChange(e);
        }}
        type="file"
        className="hidden"
        id={_id}
        ref={ref}
      />
    </div>
  );
});

FileUpload.displayName = "FileUpload";
export { FileUpload };
