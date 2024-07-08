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
import { Heading } from "@/lib/components/Heading";
interface InfoProps {
  className?: string;
  show: boolean;
}
const RegisterParachainInfo = ({ className, show }: InfoProps) => {
  const { openModal } = useModalStore();
  const networkInfo = useNetworkStore((e) => e.networkInfo);
  const params = useParams();
  const networkId = params.id as string;
  return networkInfo.data?.networkStatus === "completed" && show ? (
    <Card
      className={tx(
        "col-span-12 flex flex-row items-center border border-brand-green bg-brand-green/5 gap-3",
        className,
      )}
    >
      {/* <StatusIcon status={"warning"} />  */}
      <div className="2xl:flex 2xl:grow 2xl:flex-row 2xl:items-center 2xl:justify-between">
        <div className="flex flex-col gap-2 text-brand-dark">
          <Heading as="h6">Important</Heading>
          <p>
            Parachain setup is pending, please <span className="font-bold">authorize</span> your parachain by completing
            its <span className="font-bold">registration</span>
          </p>
        </div>
        <Tooltip text={"Click here to see the registration process"} placement={"top-start"}>
          <Button
            size={"large"}
            onClick={() => {
              openModal("registerParachain", { registerParachain: { networkId } });
            }}
            className="font-semibold bg-brand-gradient-blue"
          >
            Register Now
          </Button>
        </Tooltip>
      </div>
    </Card>
  ) : null;
};

export default RegisterParachainInfo;
