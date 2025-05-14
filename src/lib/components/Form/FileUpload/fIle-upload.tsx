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
import React, { forwardRef, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Heading } from "../../Heading";
import { Button } from "../../Button";
import { useID } from "@/hooks";
import SvgArrowUpFromBucket from "@/lib/icons/arrows/outline/ArrowUpFromBucket";
import { Progress } from "@/lib/components/Progress";
import { tx } from "@/utils/shared";
import SvgCheck from "@/lib/icons/essential/outline/Check";
import SvgXMark from "@/lib/icons/essential/outline/XMark";
import { Typography } from "@/lib/components/Typography";
import { Card } from "@/lib/components/Card";

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
  accept?: string;
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
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onChange(e); // Handle the first dropped file
    }
  };

  return (
    <div
      className="relative flex h-max w-full"
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label
        htmlFor={_id}
        className="peer w-full appearance-none truncate rounded-lg bg-[#F5F5F5] text-sm font-medium leading-5 text-brand-dark placeholder:text-base placeholder:text-brand-dark/60 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 lg:p-4 dark:bg-[#1E222D]"
      >
        <div className="flex flex-col gap-2  lg:gap-4">
          <Heading as="h6">{floatingLabelText}</Heading>
          {id === "chainSpecFile" && (
            <Card
              className={tx(
                "col-span-12 flex flex-row items-center border border-brand-yellow bg-brand-yellow/5 gap-3",
              )}
            >
              <div className="2xl:flex 2xl:grow 2xl:flex-row 2xl:items-center 2xl:justify-between">
                <div className="">
                  <Typography variant="paragraph" className="font-bold">
                    Note:{" "}
                  </Typography>
                  <Typography variant="paragraph">Please ensure the chain spec file is in plain JSON form.</Typography>
                </div>
              </div>
            </Card>
          )}
          <div className="flex items-center justify-between gap-2 rounded-xl border-2 border-dashed bg-white text-theme-primary-content lg:gap-4 lg:p-3 dark:bg-[#11141C]">
            <span>{iconRight}</span>
            <div className="p-2">
              <div className="whitespace-normal font-normal text-theme-primary-content">
                Select a file or drag and drop here
              </div>
              <p className="text-brand-gray">Supported format: {fileType}</p>
              <Button
                onClick={() => document.getElementById(_id)?.click()}
                variant={"outline"}
                colorScheme={"accent"}
                className="md:hidden"
              >
                Select File
              </Button>
            </div>
            <Button
              onClick={() => document.getElementById(_id)?.click()}
              variant={"outline"}
              colorScheme={"accent"}
              className="hidden md:block"
            >
              Select File
            </Button>
          </div>
          {fileName && (
            <p className="text-theme-primary-content">
              <span className="text-brand-gray ">File Name:</span> {fileName}{" "}
              <SvgXMark
                className="inline size-4 place-content-around text-brand-red"
                onClick={(e) => {
                  e.preventDefault();
                  onChange();

                  // Clear the file input
                  if (ref && typeof ref !== "function" && ref.current) {
                    ref.current.value = ""; // Reset file input
                  }
                }}
              />
            </p>
          )}
          {fileName && (
            <div>
              <span
                className={tx("bg-brand-light-teal  rounded-md  px-2 py-1 text-xs text-brand-gray", {
                  "bg-brand-warning": error,
                })}
              >
                {error && (
                  <>
                    <SvgCheck className="inline-block" /> {error}
                  </>
                )}
                {fileName && (
                  <>
                    <SvgCheck className="inline-block" /> Successfully Uploaded
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
        accept={props.accept}
        id={_id}
        ref={ref}
      />
    </div>
  );
});

FileUpload.displayName = "FileUpload";
export { FileUpload };
