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
    <Card className="bg-brand-light">
      <div className="flex justify-between items-center">
        <div className="text-brand-gray">Address</div>
        <div className="flex items-center">
          {toShortString(accountAddress)}
          <CopyButton text={accountAddress} className="ml-1" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-brand-gray">Balance</div>
        <div className="flex items-center">
          {formateNumber(accountBalance)} <span className={tx("text-sm capitalize")}>{tokenSymbol}</span>
          <CopyButton text={accountAddress} className="ml-1" />
        </div>
      </div>
    </Card>
  );
};

export default PreMiningCard;
