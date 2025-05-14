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

import * as yup from "yup";
import { isAddress } from "@polkadot/util-crypto";
import { ChainSpecFileType } from "@/types/chain-spec";
import { networkEnvType, templateOption } from "@/constants/create-network";

// Custom method to check for unique addresses
const uniqueAddresses = (accounts: Array<{ address: string; balance: number }>): boolean => {
  if (accounts.length <= 1) return true; // Empty or single item arrays are unique by default

  const seenAddresses = new Set<string>();

  for (const account of accounts) {
    if (seenAddresses.has(account.address)) {
      return false; // Duplicate found
    }
    seenAddresses.add(account.address);
  }

  return true; // All addresses are unique
};

export const deployNetworkValidationSchema = yup
  .object({
    networkEnvironment: yup.object({
      value: yup.string<networkEnvType>().required("Select a network environment."),
    }),
    sudoKey: yup
      .string()
      .required("Sudo Key is required")
      .test({
        test: (publicKey: string) => {
          // Ensure it's a hex string, has 64 characters (32 bytes) and that the length is correct when converted to U8 array
          return isAddress(publicKey);
        },
        message: "invalid sudo key",
      }),
    relayChain: yup.object({
      value: yup.string().required("Select a relay chain."),
    }),
    tokenName: yup
      .string()
      .required("Token symbol is required")
      .matches(/^[A-Za-z]+$/, "Token symbol can only contains alphabets, no other character")
      .max(30)
      .min(2),
    chainName: yup
      .string()
      .required("Chain name is required")
      .matches(
        /^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/,
        "Chain name can only contains alphanumeric and '-', no other character",
      )
      .max(30)
      .min(2),

    paraId: yup
      .number()
      .typeError("ParaId must be a valid number")
      .required("ParaId is required")
      .max(99999, "ParaId must be less than or equal to 99999")
      .min(1000, "ParaId must be greater than or equal to 1000"),
    decimalValue: yup
      .number()
      .typeError("Decimal value must be a valid number")
      .required("Decimal value is required")
      .max(18, "Decimal value must be less than or equal to 18")
      .min(1, "Decimal value must be greater than or equal to 1"),
    id: yup
      .string()
      .required("Id is required")
      .matches(
        /^[A-Za-z0-9_]+([-_][A-Za-z0-9_]+)*$/,
        "Id can only contains alphanumeric, '_' and '-', no other character",
      )
      .max(30)
      .min(2),
    protocolId: yup
      .string()
      .required("Protocol Id is required")
      .matches(
        /^[A-Za-z0-9_]+([-_][A-Za-z0-9_]+)*$/,
        "Protocol Id can only contains alphanumeric, '_' and '-', no other character",
      )
      .max(30)
      .min(2),
    ss58Format: yup
      .number()
      .typeError("ss58Format must be a valid number")
      .required("ss58Format is required")
      .max(255, "ss58Format must be less than or equal to 255")
      .min(0, "ss58Format must be greater than or equal to 0"),
    rpcNode: yup.object({
      http: yup.boolean().default(true),
      ws: yup.boolean().default(true),
    }),
    sidecar: yup.boolean().default(true),
    accounts: yup
      .array(
        yup.object({
          address: yup
            .string()
            .required("Address is required")
            .test({
              test: (publicKey: string) => {
                // Ensure it's a hex string, has 64 characters (32 bytes) and that the length is correct when converted to U8 array
                return isAddress(publicKey);
              },
              message: "invalid address",
            }),
          balance: yup
            .number()
            .typeError("Balance must be a valid number")
            .required("Balance is required")
            .min(1152921504606847000, "Balance must be greater than or equal to 1152921504606847000"),
          sessionKey: yup
            .string()
            .required("Session address is required")
            .test({
              test: (publicKey: string) => {
                // Ensure it's a hex string, has 64 characters (32 bytes) and that the length is correct when converted to U8 array
                return isAddress(publicKey);
              },
              message: "invalid session key",
            }),
        }),
      )
      .test({
        message: "All addresses must be unique",
        test: (value) => Array.isArray(value) && uniqueAddresses(value),
      })
      .required(),
    template: yup
      .object({
        value: yup.string<(typeof templateOption)[number]["value"]>().required("Select a template."),
      })
      .required(),
    chainSpecFile: yup
      .object({
        contents: yup.mixed<ChainSpecFileType>().required("Chain spec file is required."),
        name: yup.string().when("template.value", {
          is: "custom",
          then: (schema) => schema.required("Chain spec file is required for custom template."),
          otherwise: (schema) => schema.notRequired(),
        }),
      })
      .required("Chain spec file is required."),
    binaryFile: yup
      .object({
        name: yup.string(),
        path: yup.string(),
      })
      .test({
        name: "is-custom-template",
        message: "Binary file is required for custom template.",
        test(value) {
          if (this.parent.template?.value === "custom") {
            if (!this.parent.binaryFile.name || !this.parent.binaryFile.path) {
              return false;
            }
          }
          return true;
        },
      }),
  })
  .required();

export type DeployNetworkValidationSchemaType = yup.InferType<typeof deployNetworkValidationSchema>;
