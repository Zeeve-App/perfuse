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
import React, { useState } from "react";
import ConfigureNetwork from "./_components/form-steps/step-1-configure-network";
import ConfigureRelayChain from "./_components/form-steps/step-2-configure-relay-chain";
// import ROUTES from "@/routes";
// import { getConfig } from "@/config";
import DeploySucceed from "./_components/form-steps/step-3-success";
import {
  ProgressiveForm,
  ProgressiveFormHeader,
  ProgressiveFormHeaderItem,
  ProgressiveFormBody,
} from "@/lib/components/ProgressiveForm";
import { Heading } from "@/lib/components/Heading";
import SvgCheckCircle from "@/lib/icons/essential/outline/CheckCircle";
import { Card } from "@/lib/components/Card";
import { RadioCard } from "@/lib/components/RadioCard";
import SvgApiConnect from "@/lib/icons/product/outline/ApiConnect";

const getIcons = (step: number) => ({
  idle: (
    <div className="flex size-5 items-center justify-center rounded-full border border-brand-gray text-brand-gray">
      <span>{step}</span>
    </div>
  ),
  active: (
    <div className="flex size-5 items-center justify-center rounded-full border-2 border-theme-secondary  bg-theme-secondary text-white">
      <span>{step}</span>
    </div>
  ),
  completed: <SvgCheckCircle className="fill-brand-green text-white" height={25} width={25} />,
});

const CreatePageClient = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <ProgressiveForm activeStep={activeStep} setActiveStep={setActiveStep} className="bg-white">
      <Heading as="h3" className="p-3 lg:p-6">
        Set Up Your Parachain
      </Heading>
      <ProgressiveFormHeader>
        <ProgressiveFormHeaderItem title="Select Environment" icons={getIcons(1)} />
        <ProgressiveFormHeaderItem title="Configuration" icons={getIcons(2)} />
        <ProgressiveFormHeaderItem
          title="Complete Deployment"
          icons={{ ...getIcons(3), active: getIcons(3).completed }}
        />
      </ProgressiveFormHeader>
      <ProgressiveFormBody>
        <ConfigureNetwork />
        <ConfigureRelayChain />
        <DeploySucceed />
      </ProgressiveFormBody>
    </ProgressiveForm>
    // <>
    //   <span className="flex flex-col gap-4 p-4">
    //     <Heading as="h3" className="">
    //       Set Up Your Parachain
    //     </Heading>
    //     <div className="grid grid-cols-12 gap-4">
    //       <div className="col-span-8">
    //         <Card>
    //           <div className="col-span-12 flex flex-col gap-3 lg:gap-6">
    //             <div className="flex flex-row items-center gap-1">
    //               <Heading as="h5">Select Your Network Environment</Heading>
    //               {/* <Tooltip text="Select environment for your deployment." placement="top-start">
    //               <IconButton variant="text" colorScheme="gray">
    //                 <SvgInfoCircle className="text-base" />
    //               </IconButton>
    //             </Tooltip> */}
    //             </div>
    //             <div className="grid grid-cols-12 gap-3 lg:gap-6">
    //               {networkEnvOption.length
    //                 ? networkEnvOption.map((environment, index) => {
    //                     return (
    //                       <RadioCard
    //                         key={index}
    //                         value={environment.value}
    //                         className="col-span-12 md:col-span-3"
    //                         // {...register("networkEnviorment.value")}
    //                         // isChecked={watch("networkEnviorment")?.value == environment?.value}
    //                         hideRadioCircle={true}
    //                         isDisabled={environment.isDisabled}
    //                         // tooltipText={environment.tooltipText}
    //                       >
    //                         <>
    //                           <SvgApiConnect width={25} height={25} />
    //                           {environment.label}
    //                         </>
    //                       </RadioCard>
    //                     );
    //                   })
    //                 : null}
    //             </div>
    //           </div>
    //         </Card>
    //       </div>
    //       <div className="col-span-4">
    //         <Card></Card>
    //       </div>
    //     </div>
    //   </span>
    // </>
  );
};

export default CreatePageClient;
