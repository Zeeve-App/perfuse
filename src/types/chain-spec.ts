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

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Properties {
  ss58Format: number;
  tokenDecimals: number;
  tokenSymbol: string;
}
interface ChainSpecFileType {
  name: string;
  id: string;
  chainType: string;
  bootNodes: any[];
  telemetryEndpoints: null | string;
  protocolId: string;
  properties?: Properties;
  relay_chain: string;
  para_id: number;
  codeSubstitutes: CodeSubstitutes;
  genesis: Genesis;
}

interface CodeSubstitutes {}

interface CollatorSelection {
  invulnerables: string[];
  candidacyBond: number;
  desiredCandidates: number;
}

interface Runtime {
  system: {
    code: string;
  };
  parachainSystem: null;
  parachainInfo: {
    parachainId: number;
  };
  balances: {
    balances: Array<Array<number | string>>;
  };
  transactionPayment: {
    multiplier: string;
  };
  collatorSelection: CollatorSelection;
  session: {
    keys: Array<
      Array<
        | {
            aura: string;
          }
        | string
      >
    >;
  };
  aura: {
    authorities: string[];
  };
  auraExt: null;
  polkadotXcm: {
    safeXcmVersion: number;
  };
  assets: {
    assets: any[];
    metadata: any[];
    accounts: any[];
  };
}

interface Genesis {
  runtime?: Runtime;
  runtimeGenesis?: {
    code: string;
    patch: {
      aura?: {
        authorities?: string[];
      };
      balances: {
        balances: [address: string, balance: string][];
      };
      parachainInfo: {
        parachainId: number;
      };
      polkadotXcm: {
        safeXcmVersion: number;
      };
      sudo: {
        key: string;
      };
      session?: {
        keys: [string, string, { aura: string }][];
      };
    };
  };
}

export type { ChainSpecFileType, Genesis, CodeSubstitutes, CollatorSelection, Runtime, Properties };
