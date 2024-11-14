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
import { ChainSpecFileType } from "@/types/chain-spec";
import { REGEX_NODE_NAME } from "@/constants/regex";
import { networkEnvType, AuthenticationMethods, templateOption } from "@/constants/create-network";

export const configureNetworkValidationSchema = yup
  .object({
    chainSpecFile: yup
      .object({
        contents: yup.mixed<ChainSpecFileType>().required("Chain spec file is required."),
      })
      .required("Chain spec file is required."),
    binaryFile: yup.object({
      name: yup.string(),
      path: yup.string(),
    }),

    networkEnviorment: yup.object({
      value: yup.string<networkEnvType>().required("Select a network environment."),
    }),
    template: yup.object({
      value: yup.string().required("Select a template."),
    }),
    relayChain: yup.object({
      value: yup.string().required("Select a relay chain."),
      label: yup.string(),
    }),
    sidecar: yup.object({
      value: yup.number<0 | 1>().required("Select a sidecar."),
    }),
    explorer: yup.object({
      value: yup.string().required("Select a explorer."),
    }),
  })
  .required();

export const configureRelayChainValidationSchema = yup
  .object({
    version: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    relay_chain: yup.object({
      value: yup.string(),
      label: yup.string(),
    }),
    paraId: yup.number(),
    name: yup.string().required(),
    chainType: yup.string(),
    telemetryEndpoint: yup.string(),
    decimalValue: yup.number(),
    tokenName: yup
      .string()
      .required("Token name is required")
      .matches(/^[A-Za-z]+$/, "Token name can only contains alphabets, no other character"),
    encoding: yup.string(),
    candidacyBond: yup.number(),
    protocolId: yup.string(),
    collatorNodes: yup.array().of(
      yup.object({
        collatorName: yup.string(),
        collatorAddress: yup.string(),
        collatorBalance: yup.number(),
        rpcCors: yup.string(),
      }),
    ),
    rpcNodes: yup.array().of(
      yup.object({
        type: yup.mixed<"rpc">().required(),
        name: yup
          .string()
          .required("Name is required.")
          .matches(
            REGEX_NODE_NAME,
            "Name can have lowercase letters, hyphens (-) or digits and must start & end with an alphabet or digit.",
          ),
        http: yup.boolean(),
        ws: yup.boolean(),
        credentials: yup
          .object({
            type: yup.mixed<AuthenticationMethods>().required("Select authentication method."),
            username: yup.string().when("type", {
              is: "basic_auth",
              then: (schema) => schema.required("Username is required."),
              otherwise: (schema) => schema.optional(),
            }),
            password: yup.string().when("type", {
              is: "basic_auth",
              then: (schema) => schema.required("Password is required."),
              otherwise: (schema) => schema.optional(),
            }),
          })
          .required(),
      }),
    ),
  })
  .required();

// Custom method to check for unique addresses
const uniqueAddresses = (accounts: Array<{ address: string; balance: string }>): boolean => {
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
    sudoKey: yup.string().required(),
    relayChain: yup.object({
      value: yup.string().required("Select a relay chain."),
    }),
    tokenName: yup
      .string()
      .required("Token name is required")
      .matches(/^[A-Za-z]+$/, "Token name can only contains alphabets, no other character"),
    chainName: yup
      .string()
      .required("Token name is required")
      .matches(/^[A-Za-z]+$/, "Token name can only contains alphabets, no other character"),
    template: yup.object({
      value: yup.string<(typeof templateOption)[number]["value"]>().required("Select a template."),
    }),
    paraId: yup.number().required(),
    decimalValue: yup.number().required(),
    id: yup.string().required(),
    protocolId: yup.string().required(),
    ss58Format: yup.number().required(),
    rpcNode: yup.object({
      http: yup.boolean(),
      ws: yup.boolean(),
    }),
    sidecar: yup.boolean(),
    accounts: yup
      .array(
        yup.object({
          address: yup.string().required(),
          balance: yup.string().required(),
          sessionKey: yup.string().required(),
        }),
      )
      .test({
        message: "All addresses must be unique",
        test: (value) => Array.isArray(value) && uniqueAddresses(value),
      })
      .required(),
    chainSpecFile: yup
      .object({
        contents: yup.mixed<ChainSpecFileType>().required("Chain spec file is required."),
        name: yup.string(),
      })
      .required("Chain spec file is required."),
    binaryFile: yup.object({
      name: yup.string(),
      path: yup.string(),
    }),
  })
  .required();

export type DeployNetworkValidationSchemaType = yup.InferType<typeof deployNetworkValidationSchema>;
