"use client";
import React, { forwardRef } from "react";
import { ControllerRenderProps } from "react-hook-form";
import ShortString from "../../utils/short-string";
import { useID } from "@/hooks";
import { Label } from "@/lib/components/Form";
import SvgArrowUpFromBucket from "@/lib/icons/arrows/outline/ArrowUpFromBucket";
import { Progress } from "@/lib/components/Progress";

interface FileUploadProps {
  field: ControllerRenderProps;
  progressValue: number;
  progressTotal: number;
  fileName: string;
  id: string;
  floatingLabelText: string;
  iconRight?: React.ReactElement;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>((props, ref) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    field: { value, onChange, ...field },
    progressValue,
    progressTotal,
    fileName,
    id,
    floatingLabelText,
    iconRight = <SvgArrowUpFromBucket fontSize={24} className="mx-4" />,
  } = props;

  const [_id] = useID(id, "file-upload");
  return (
    <div className="relative flex h-max w-full">
      <label
        htmlFor={_id}
        className="peer h-[60px] w-full appearance-none truncate rounded-lg border border-brand-outline bg-brand-light p-4 pr-12 text-sm font-medium leading-5 text-brand-dark placeholder:text-base placeholder:text-brand-dark/60 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {fileName && (
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
        )}
        <div className={"absolute inset-y-0 right-0 flex items-center"}>{iconRight}</div>
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
