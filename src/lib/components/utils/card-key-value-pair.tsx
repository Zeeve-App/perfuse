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
    <Card className={tx("rounded-lg bg-brand-purple text-center text-brand-light", className)}>
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
    </Card>
  );
};

export type { CardKeyValuePairProps };
export default CardKeyValuePair;
