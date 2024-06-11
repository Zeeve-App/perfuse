// /* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import HTTP_STATUS from "@/constants/http";
import { Heading } from "@/lib/components/Heading";
import { ReactTable } from "@/lib/components/ReactTable";
import { Tooltip } from "@/lib/components/Tooltip";
import { tx } from "@/utils/shared";

const columnHelper = createColumnHelper<any>();
// table columns
const alertTableColumns: ColumnDef<any, any>[] = [
  columnHelper.accessor("alertName", {
    header: "Name",
    cell: (info) => (
      <Tooltip text={info.getValue()} placement="top-start">
        <div>{info.getValue()}</div>
      </Tooltip>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <div
        className={tx(
          "rounded-md p-1 text-center text-xs font-bold",
          { "bg-brand-red": info.getValue() === "firing" },
          { "bg-brand-green": info.getValue() === "resolved" },
          { " text-brand-light": info.getValue() },
        )}
      >
        {info.getValue() ? info.getValue().toUpperCase() : "NA"}
      </div>
    ),
  }),
  columnHelper.accessor("alertType", {
    header: "Type",
    cell: (info) => (
      <Tooltip text={info.getValue() ? info.getValue().toUpperCase() : "NA"} placement="top-start">
        <div>{info.getValue() ? info.getValue().toUpperCase() : "NA"}</div>
      </Tooltip>
    ),
  }),
  columnHelper.accessor("severity", {
    header: "Severity",
    cell: (info) => (
      <div
        className={tx(
          "rounded-md  p-1 text-center text-xs font-bold",
          {
            "bg-brand-yellow": info.getValue() === "warning",
          },
          {
            "bg-brand-red": info.getValue() === "critical",
          },
          {
            "text-brand-light": info.getValue(),
          },
          {
            "bg-brand-primary": info.getValue() === "info",
          },
        )}
      >
        {info.getValue() ? info.getValue().toUpperCase() : "NA"}
      </div>
    ),
  }),
  columnHelper.accessor("alertTimestamp", {
    header: "Timestamp",
    cell: (info) => (
      <Tooltip text={info.getValue()} placement="top-start">
        <div>{info.getValue()}</div>
      </Tooltip>
    ),
  }),
];
const Alerts = ({ agentId }: { agentId?: string }) => {
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });
  const [data, setData] = useState<Array<any>>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getAlertList = useCallback(async () => {
    try {
      if (agentId) {
        // const response = await request(url, {
        //   filter: [{ fieldName: "agentId", compare: "equal", val: agentId }],
        //   sort: [{ fieldName: "alertTimestamp", orderBy: "desc" }],
        //   meta: {
        //     pageNum: pageIndex + 1,
        //     numRecords: pageSize,
        //   },
        // });
        // if (response.status === HTTP_STATUS.OK && response.data.success) {
        //   console.log(response);
        //   setData(response.data.data.results);
        //   setTotal(response.data.data.meta.totalNumRecords);
        // }
      }
    } catch (error) {
      console.log("getAlertList: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [agentId, pageIndex, pageSize]);

  useEffect(() => {
    getAlertList();
  }, [getAlertList]);

  return (
    <div className="col-span-12 flex flex-col overflow-hidden rounded-lg border border-brand-outline lg:col-span-12 2xl:col-span-6">
      <div className="p-4">
        <Heading as="h4">Alerts ({total})</Heading>
      </div>
      <div className="m-2">
        <ReactTable
          data={data}
          columns={alertTableColumns}
          isLoading={isLoading}
          classNames={{
            table: "table-auto lg:table-fixed",
          }}
          pagination={{
            pageSizes: [3, 5, 10, 20, 50],
            pageCount: total && pageSize ? Math.ceil(total / pageSize) : 0,
            pageIndex,
            pageSize,
            setPagination,
          }}
        />
      </div>
    </div>
  );
};

export default Alerts;
