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
      aura: {
        authorities: string[];
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
    };
  };
}

export type { ChainSpecFileType, Genesis, CodeSubstitutes, CollatorSelection, Runtime, Properties };
