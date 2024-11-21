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

/** file upload component props */
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

/** file upload component */
const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>((props, ref) => {
  const {
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
        className="peer w-full appearance-none truncate rounded-lg bg-[#F5F5F5] p-4 pr-12 text-sm font-medium leading-5 text-brand-dark placeholder:text-base placeholder:text-brand-dark/60 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#1E222D]"
      >
        <div className="flex flex-col gap-2  lg:gap-4">
          <Heading as="h6">{floatingLabelText}</Heading>
          <div className="flex items-center justify-between gap-2 rounded-xl border-2 border-dashed bg-white p-3 text-theme-primary-content lg:gap-4 dark:bg-[#11141C]">
            {iconRight}
            <div>
              <p className="font-normal text-theme-primary-content">Select a file or drag and drop here</p>
              <p className="text-brand-gray">Supported format: {fileType}</p>
            </div>
            <Button variant={"outline"} colorScheme={"accent"}>
              Select File
            </Button>
          </div>
          {fileName && (
            <p className="text-theme-primary-content">
              <span className="text-brand-gray ">File Name:</span> {fileName}
            </p>
          )}
          {(error || fileName) && (
            <div>
              <span
                className={tx("bg-brand-light-teal  rounded-md  px-2 py-1 text-xs text-brand-gray", {
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
