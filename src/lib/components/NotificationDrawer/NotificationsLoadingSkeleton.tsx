import React from "react";
import { Skeleton } from "../Skeleton";

const NotificationsLoadingSkeleton = () => {
  return (
    <Skeleton className="flex flex-row gap-4 border-b p-6">
      <div className="size-12 rounded-lg bg-brand-outline p-4"></div>
      <div className="w-full">
        <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 w-4/5 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2 w-2/3 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </Skeleton>
  );
};

export { NotificationsLoadingSkeleton };
