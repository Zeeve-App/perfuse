"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useModalStore } from "@/store/modal";
import { Button } from "@/lib/components/Button";
import { Card } from "@/lib/components/Card";
import { StatusIcon } from "@/lib/components/StatusIcon";
import { Tooltip } from "@/lib/components/Tooltip";
import { tx } from "@/utils/shared";
import { useNetworkStore } from "@/store/network";
interface InfoProps {
  className?: string;
  show: boolean;
}
const RegisterParachainInfo = ({ className, show }: InfoProps) => {
  const { openModal } = useModalStore();
  const networkInfo = useNetworkStore((e) => e.networkInfo);
  const params = useParams();
  const networkId = params.id as string;
  return show ? (
    <Card
      className={tx(
        "col-span-12 flex flex-row items-center border border-brand-yellow bg-brand-yellow/5 gap-3",
        className,
      )}
    >
      <StatusIcon status={"warning"} />
      <div className="2xl:flex 2xl:grow 2xl:flex-row 2xl:items-center 2xl:justify-between">
        <div className="font-medium text-brand-dark">
          Parachain setup is pending, please <span className="text-brand-red">authorize</span> your parachain by
          completing its <span className="text-brand-primary">registration</span>.
        </div>
        <Tooltip text={"Click here to see the registration process"} placement={"top-start"}>
          <Button
            size={"small"}
            onClick={() => {
              openModal("registerParachain", { registerParachain: { networkId } });
            }}
          >
            Register Now
          </Button>
        </Tooltip>
      </div>
    </Card>
  ) : null;
};

export default RegisterParachainInfo;
