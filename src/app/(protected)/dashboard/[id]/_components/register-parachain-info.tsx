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

"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useModalStore } from "@/store/modal";
import { Button } from "@/lib/components/Button";
import { Card } from "@/lib/components/Card";
import { Tooltip } from "@/lib/components/Tooltip";
import { tx } from "@/utils/shared";
import { useNetworkStore } from "@/store/network";
import { Typography } from "@/lib/components/Typography";

/** register parachain props */
interface InfoProps {
  className?: string;
  show: boolean;
}

/** register parachain component to open modal to download wasm & genesis*/
const RegisterParachainInfo = ({ className, show }: InfoProps) => {
  const { openModal } = useModalStore();
  const networkInfo = useNetworkStore((e) => e.networkInfo);
  const params = useParams();
  const networkId = params.id as string;
  return true ? (
    <Card
      className={tx(
        "col-span-12 flex flex-row items-center border border-brand-green bg-brand-green/5 gap-3",
        className,
      )}
    >
      <div className="2xl:flex 2xl:grow 2xl:flex-row 2xl:items-center 2xl:justify-between">
        <div className="flex flex-col gap-2 text-brand-dark">
          <Typography variant="subtitle">Important</Typography>
          <Typography className="font-normal">
            Parachain setup is pending, please <span className="font-bold">authorize</span> your parachain by completing
            its <span className="font-bold">registration</span>
          </Typography>
        </div>
        <Tooltip text={"Click here to see the registration process"} placement={"top-start"}>
          <Button
            size={"large"}
            onClick={() => {
              openModal("registerParachain", { registerParachain: { networkId } });
            }}
            colorScheme={"gradient"}
          >
            Register Now
          </Button>
        </Tooltip>
      </div>
    </Card>
  ) : null;
};

export default RegisterParachainInfo;
