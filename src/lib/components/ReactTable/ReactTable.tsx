import React, { useCallback, useMemo } from "react";
import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IconButton } from "../Button";
import { Option, Select } from "../Form";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Tfoot } from "../Table";
import { tx } from "@/utils/shared";

interface ReactTablePaginationProps {
  /** current page number or index */
  pageIndex: number;
  /** rows to show at a time */
  pageSize: number;
  /** total number of pages or if you have number of total rows then calculate: Math.ceil(totalRows / pageSize) */
  pageCount: number;
  /** set pagination state */
  setPagination: OnChangeFn<PaginationState> | undefined;
  /** define page sizes to select from the dropdown */
  pageSizes?: number[];
}

interface ReactTableStatusProps {
  /** set custom error message */
  error?: string;
  /** set custom message when there is no data */
  noData?: string;
}

interface ReactTableClassNamesProps {
  tableContainer?: string;
  table?: string;
  thead?: {
    thead?: string;
    tr?: string;
    th?: string;
  };
  tbody?: {
    tbody?: string;
    tr?: string;
    td?: string;
  };
  tfoot?: {
    tfoot?: string;
    tr?: string;
    th?: string;
  };
}

interface ReactTableProps<T extends object> {
  /** table columns */
  columns: ColumnDef<T>[];
  /** table data */
  data: T[];
  /** is data loading? */
  isLoading: boolean;
  /** show footer (default false) */
  shouldShowFooter?: boolean;
  /** show pagination with options */
  pagination?: ReactTablePaginationProps;
  /** status messages */
  status?: ReactTableStatusProps;
  /** classNames for table components */
  classNames?: ReactTableClassNamesProps;
}

const ReactTable = <T extends object>(props: ReactTableProps<T>) => {
  const { columns, data, isLoading, shouldShowFooter = false, pagination, status, classNames } = props;

  const _pagination = useMemo(
    () => ({
      pageIndex: pagination?.pageIndex as number,
      pageSize: pagination?.pageSize as number,
    }),
    [pagination?.pageIndex, pagination?.pageSize],
  );

  /** skeleton to show when table data is loading */
  const Skeleton = useCallback(() => <div className="h-[18px] w-auto animate-pulse bg-gray-300" />, []);

  const arraySize = (pagination?.pageSize as number) > 10 ? 10 : pagination?.pageSize;
  const _data = useMemo(() => (isLoading ? Array(arraySize).fill({}) : data), [isLoading, data, arraySize]);

  const _columns = useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
            ...column,
            cell: Skeleton,
          }))
        : columns,
    [isLoading, columns, Skeleton],
  );

  /** react table setup */
  const table = useReactTable({
    data: _data,
    columns: _columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      pagination: _pagination,
    },
    pageCount: pagination?.pageCount,
    onPaginationChange: pagination?.setPagination,
    columnResizeMode: "onChange",
  });

  return (
    <>
      <div className="relative">
        {/* table */}
        <TableContainer className={tx(classNames?.tableContainer)}>
          <Table className={tx("border-collapse overflow-hidden rounded-none border-none", classNames?.table)}>
            <Thead className={tx("h-auto rounded-none px-4 py-3", classNames?.thead?.thead)}>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id} className={tx(classNames?.thead?.tr)}>
                  {headerGroup.headers.map((header) => (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={tx(
                        "group relative p-3 font-semibold uppercase first-of-type:rounded-none last-of-type:rounded-none",
                        classNames?.thead?.th,
                      )}
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      <div
                        {...{
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `absolute right-0 top-0 group-hover:opacity-100 opacity-0 h-full w-1 bg-brand-primary/50 cursor-col-resize select-none touch-none ${
                            header.column.getIsResizing() ? "bg-brand-primary/100 opacity-1" : ""
                          }`,
                        }}
                      />
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>

            <Tbody className={tx(classNames?.tbody?.tbody)}>
              {table.getRowModel().rows.map((row) => (
                <Tr
                  key={row.id}
                  className={tx("border-b border-brand-outline hover:bg-gray-50", classNames?.tbody?.tr)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      className={tx(
                        "overflow-hidden text-ellipsis p-3 text-sm first-of-type:rounded-none last-of-type:rounded-none",
                        classNames?.tbody?.td,
                      )}
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>

            {shouldShowFooter ? (
              <Tfoot className={tx("h-auto rounded-none px-4 py-3", classNames?.tfoot?.tfoot)}>
                {table.getFooterGroups().map((footerGroup) => (
                  <Tr key={footerGroup.id} className={tx(classNames?.tfoot?.tr)}>
                    {footerGroup.headers.map((header) => (
                      <Th
                        key={header.id}
                        className={tx(
                          "p-3 font-semibold uppercase first-of-type:rounded-none last-of-type:rounded-none",
                          classNames?.tfoot?.th,
                        )}
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Tfoot>
            ) : null}
          </Table>
        </TableContainer>
        {/* if there is no data or there is an error */}
        {!isLoading && data && data.length === 0 ? (
          <div className="absolute inset-0 flex w-full items-center justify-center overflow-y-auto rounded-none bg-white/70 p-2 text-center text-xs font-medium text-dark-500 lg:p-4 lg:text-base">
            {status?.error ? (
              <p className="break-words">{status?.error ? status.error : "Error loading data."}</p>
            ) : (
              <p className="break-words">{status?.noData ? status.noData : "No data available."}</p>
            )}
          </div>
        ) : null}
      </div>

      {/* pagination */}
      {data?.length && pagination ? (
        <div className="mt-4 flex w-full flex-row items-center justify-center gap-2 text-sm lg:justify-end lg:px-4">
          {pagination?.pageSizes?.length ? (
            <div className="flex items-center gap-2">
              <p>Rows:</p>
              <Select
                size="small"
                className="max-h-[36px] w-max cursor-pointer border bg-transparent bg-none p-0 px-1 text-sm outline-none"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
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
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          >
            &laquo;
          </IconButton>
          <span className="flex items-center gap-1">
            <p>
              Page{" "}
              <span>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
            </p>
          </span>
          <IconButton
            size="small"
            title="Next"
            variant="ghost"
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          >
            &raquo;
          </IconButton>
        </div>
      ) : null}
    </>
  );
};

export type { ReactTableProps };
export { ReactTable };
