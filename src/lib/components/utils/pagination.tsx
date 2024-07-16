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

import React from "react";
import { IconButton } from "@/lib/components/Button";
import { Option, Select } from "@/lib/components/Form";
import { tx } from "@/utils/shared";

type PaginationState = {
  /** current page number or index */
  pageIndex: number;
  /** rows to show at a time */
  pageSize: number;
};

interface PaginationProps<T extends object> {
  pagination?: {
    /** set pagination state */
    setPagination: (pagination: { pageIndex: number; pageSize: number; pageCount: number }) => void;
    /** define page sizes to select from the dropdown */
    pageSizes?: number[];
    /** total number of pages or if you have number of total rows then calculate: Math.ceil(totalRows / pageSize) */
    pageCount: number;
  } & PaginationState;
  data: T[];
  /** className for parent div */
  className?: string;
}

const Pagination = <T extends object>({ pagination, data, className }: PaginationProps<T>) => {
  const canGoPrevious = pagination ? pagination.pageIndex > 0 : false;
  const canGoNext = pagination ? pagination.pageIndex + 1 < pagination.pageCount : false;
  return (
    <div className={tx("col-span-12", className)}>
      {data?.length && pagination ? (
        <div className="col-span-12 mt-4 flex w-full flex-row items-center justify-center gap-2 text-sm lg:justify-end lg:px-4">
          {pagination?.pageSizes?.length ? (
            <div className="flex items-center gap-2">
              <p>Rows:</p>
              <Select
                size="small"
                className="max-h-[36px] w-max cursor-pointer border bg-transparent bg-none p-0 px-1 text-sm outline-none"
                value={pagination.pageSize}
                onChange={(e) => {
                  pagination.setPagination({
                    pageCount: pagination.pageCount,
                    pageIndex: pagination.pageIndex,
                    pageSize: Number(e.target.value),
                  });
                }}
              >
                {pagination?.pageSizes?.map((pageSize) => (
                  <Option key={pageSize} value={pageSize}>
                    {pageSize}
                  </Option>
                ))}
              </Select>
            </div>
          ) : null}
          <IconButton
            size="small"
            title="Previous"
            variant="ghost"
            onClick={() =>
              pagination.setPagination({
                pageCount: pagination.pageCount,
                pageSize: pagination.pageSize,
                pageIndex: pagination.pageIndex - 1,
              })
            }
            isDisabled={!canGoPrevious}
          >
            &laquo;
          </IconButton>
          <span className="flex items-center gap-1">
            <p>
              Page{" "}
              <span>
                {pagination.pageIndex + 1} of {pagination.pageCount}
              </span>
            </p>
          </span>
          <IconButton
            size="small"
            title="Next"
            variant="ghost"
            onClick={() =>
              pagination.setPagination({
                pageCount: pagination.pageCount,
                pageSize: pagination.pageSize,
                pageIndex: pagination.pageIndex + 1,
              })
            }
            isDisabled={!canGoNext}
          >
            &raquo;
          </IconButton>
        </div>
      ) : null}
    </div>
  );
};
export type { PaginationState, PaginationProps };
export default Pagination;
