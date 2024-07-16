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

import { FieldArrayWithId, FieldErrors, UseFieldArrayAppend, UseFormRegister } from "react-hook-form";
import { ConfigureRelayChainSchemaType } from "../step-2-configure-relay-chain";
import { Accordion, AccordionItem, AccordionHeader, AccordionBody } from "@/lib/components/Accordion";
import { IconButton } from "@/lib/components/Button";
import { Input, Label } from "@/lib/components/Form";
import { FormField } from "@/lib/components/Form/FormField";
import { Heading } from "@/lib/components/Heading";
import SvgPlusSquare from "@/lib/icons/essential/outline/PlusSquare";

const AddCollatorForm = ({
  collatorFields,
  register,
  errors,
  appendCollator,
}: {
  collatorFields: FieldArrayWithId<ConfigureRelayChainSchemaType, "collatorNodes", "id">[];
  register: UseFormRegister<ConfigureRelayChainSchemaType>;
  errors: FieldErrors<ConfigureRelayChainSchemaType>;
  appendCollator: UseFieldArrayAppend<ConfigureRelayChainSchemaType, "collatorNodes">;
}) => {
  return (
    <>
      <Heading as="h4" className="text-brand-dark-blue">
        Collator Nodes
      </Heading>
      {collatorFields.map((e, i) => {
        return (
          <Accordion key={i}>
            <AccordionItem>
              <AccordionHeader className="p-3 font-medium">{`Collator ${i + 1}`}</AccordionHeader>
              <AccordionBody>
                <div key={i} className="grid grid-cols-12 items-start gap-3 p-3 lg:gap-6">
                  {/* Collator Name */}
                  <FormField
                    className="col-span-12 md:col-span-6 lg:col-span-3"
                    helper={{
                      status: "error",
                      text: errors.collatorNodes?.[i]?.collatorName?.message?.toString(),
                    }}
                  >
                    <Label>Collator Name</Label>
                    <Input
                      {...register(`collatorNodes.${i}.collatorName`)}
                      type="text"
                      isRequired
                      isDisabled
                      placeholder="Collator Name"
                    />
                  </FormField>
                  {/* Address */}
                  <FormField
                    className="col-span-12 md:col-span-6 lg:col-span-3"
                    helper={{
                      status: "error",
                      text: errors.collatorNodes?.[i]?.collatorAddress?.message?.toString(),
                    }}
                  >
                    <Label>Address</Label>
                    <Input
                      {...register(`collatorNodes.${i}.collatorAddress`)}
                      type="text"
                      isRequired
                      isDisabled
                      placeholder="Address"
                    />
                  </FormField>
                  {/* Balance */}
                  <FormField
                    className="col-span-12 md:col-span-6 lg:col-span-3"
                    helper={{
                      status: "error",
                      text: errors.collatorNodes?.[i]?.collatorBalance?.message?.toString(),
                    }}
                  >
                    <Label>Balance</Label>
                    <Input
                      {...register(`collatorNodes.${i}.collatorBalance`)}
                      type="text"
                      isRequired
                      isDisabled
                      placeholder="Balance"
                    />
                  </FormField>
                  {/* Rpc Cors */}
                  <FormField
                    className="col-span-12 md:col-span-6 lg:col-span-3"
                    helper={{
                      status: "error",
                      text: errors.collatorNodes?.[i]?.rpcCors?.message?.toString(),
                    }}
                  >
                    <Label>Rpc Cors</Label>
                    <Input
                      {...register(`collatorNodes.${i}.rpcCors`)}
                      type="text"
                      isRequired
                      isDisabled
                      placeholder="Rpc Cors"
                    />
                  </FormField>
                </div>
              </AccordionBody>
              <hr className="col-span-12 border-brand-light" />
            </AccordionItem>
          </Accordion>
        );
      })}
      <div className="flex justify-end">
        <IconButton
          size={"large"}
          variant={"text"}
          className="font-bold"
          isDisabled
          onClick={() => {
            appendCollator({});
          }}
        >
          Add More <SvgPlusSquare className="pl-2" height={30} width={30} />
        </IconButton>
      </div>
    </>
  );
};

export default AddCollatorForm;
