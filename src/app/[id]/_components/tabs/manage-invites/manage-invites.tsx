/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IconPlusSquare } from "@zeeve-platform/icons/essential/outline";
import { Heading, Tooltip, Button } from "@zeeve-platform/ui";
import { ColumnDef, ReactTable, createColumnHelper } from "@zeeve-platform/ui-common-components";
import React from "react";
import RegisterParachainInfo from "../../../overview/register-parachain-info";

type ProposedInvite = {
  proposalId: string;
  proposalSender: string;
  proposalReceiver: string;
  proposalStatus: string;
  proposalCreatedAt: string;
};

const columnHelper = createColumnHelper<ProposedInvite>();

// table columns
const proposedInviteTableColumn: ColumnDef<ProposedInvite, any>[] = [
  columnHelper.accessor("proposalSender", {
    header: "Sender",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("proposalReceiver", {
    header: "Recipient",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("proposalCreatedAt", {
    header: "Created On",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("proposalStatus", {
    header: "Status",
  }),
  columnHelper.display({
    header: "Action",
  }),
];

const ManageInvites = () => {
  return (
    <div className="grid grid-cols-12 gap-3 text-brand-dark lg:gap-6">
      <RegisterParachainInfo />
      <div className="col-span-12 flex flex-col overflow-hidden rounded-lg border border-brand-outline">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Heading as="h4" className="mr-2 text-brand-gray/50">
              Proposed Invites (0)
            </Heading>
            <span className="rounded-md p-1.5 text-xs font-bold text-brand-light bg-brand-gradient-80">
              Coming Soon
            </span>
          </div>
          <Tooltip text={"Click to add transition in order to update blockchain configurations"} placement="top-start">
            <Button colorScheme="primary" isDisabled={true}>
              Invite New Partner <IconPlusSquare />
            </Button>
          </Tooltip>
        </div>
        <div className="p-4">
          <ReactTable data={[]} columns={proposedInviteTableColumn} isLoading={false} />
        </div>
      </div>
    </div>
  );
};

export default ManageInvites;
