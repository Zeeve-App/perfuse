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
interface ChainSpecFileType {
  name: string;
  id: string;
  chainType: string;
  bootNodes: any[];
  telemetryEndpoints: null;
  protocolId: string;
  properties: Properties;
  relay_chain: string;
  para_id: number;
  codeSubstitutes: CodeSubstitutes;
  genesis: Genesis;
}

interface CodeSubstitutes {}

interface Genesis {
  runtimeGenesis: RuntimeGenesis;
}

interface RuntimeGenesis {
  code: string;
  patch: Patch;
}

interface Patch {
  balances: Balances;
  collatorSelection: CollatorSelection;
  parachainInfo: ParachainInfo;
  polkadotXcm: PolkadotXcm;
  session: Session;
  sudo: Sudo;
}

interface Balances {
  balances: Array<Array<number | string>>;
}

interface CollatorSelection {
  candidacyBond: number;
  invulnerables: string[];
}

interface ParachainInfo {
  parachainId: number;
}

interface PolkadotXcm {
  safeXcmVersion: number;
}

interface Session {
  keys: Array<Array<KeyClass | string>>;
}

interface KeyClass {
  aura: string;
}

interface Sudo {
  key: string;
}

interface Properties {
  ss58Format: number;
  tokenDecimals: number;
  tokenSymbol: string;
}

export type { ChainSpecFileType, Genesis, CodeSubstitutes, CollatorSelection, Properties };
