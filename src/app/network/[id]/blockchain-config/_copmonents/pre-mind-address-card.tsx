"use client";
import React from "react";
import { Card } from "@/lib/components/Card";
import { CopyButton } from "@/lib/components/Button";
import { formateNumber, toShortString } from "@/utils/helpers";
import { tx } from "@/utils/shared";

interface PreMiningCardProps {
  accountAddress: string;
  accountBalance: number;
  tokenSymbol: string;
}

const PreMiningCard = ({ accountAddress, accountBalance, tokenSymbol }: PreMiningCardProps) => {
  return (
    <div className="rounded-lg border border-brand-outline bg-brand-light p-2 text-sm">
      <div className="flex items-center justify-between">
        <div className="text-brand-gray">Address</div>
        <div className="flex items-center">
          {toShortString(accountAddress)}
          <CopyButton text={accountAddress} className="ml-1" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-brand-gray">Balance</div>
        <div className="flex items-center">
          {formateNumber(accountBalance)} <span className={tx("text-sm capitalize")}>{tokenSymbol}</span>
          <CopyButton text={accountAddress} className="ml-1" />
        </div>
      </div>
    </div>
  );
};

export default PreMiningCard;
