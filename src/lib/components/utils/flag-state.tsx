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
