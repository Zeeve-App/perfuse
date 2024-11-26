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
import { useState, useEffect } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { useNetworkStore } from "@/store/network";
import { envAndRelayChainOption } from "@/constants/create-network";

const SELECTED_ACCOUNT_KEY = "selectedAccount";

const relayChainRpc: Record<(typeof envAndRelayChainOption)[number]["relayChainOption"][number]["value"], string> = {
  paseo: "wss://paseo.rpc.amforc.com:443", // Placeholder RPC endpoint for the 'paseo' chain
  kusama: "wss://kusama-rpc.polkadot.io", // RPC endpoint for Kusama mainnet
  polkadot: "wss://rpc.polkadot.io", // RPC endpoint for Polkadot mainnet
};

export const useSelectedAccount = () => {
  const [selectedAccount, setSelectedAccount] = useState<(InjectedAccountWithMeta & { balance: string }) | null>(null);
  const [accounts, setAccounts] = useState<(InjectedAccountWithMeta & { balance: string })[]>([]);
  const [tokenSymbol, setTokenSymbol] = useState<string | null>(null);
  const [relayChainApi, setRelayChainApi] = useState<ApiPromise | null>();
  const network = useNetworkStore((e) => e.networkInfo);

  useEffect(() => {
    // Load the selected account from local storage on mount
    const savedAccount = localStorage.getItem(SELECTED_ACCOUNT_KEY);
    if (savedAccount && accounts.length > 0) {
      const account = accounts.find((acc) => acc.address === JSON.parse(savedAccount)?.address);
      setSelectedAccount(account || accounts[0]);
    } else if (accounts.length > 0) {
      setSelectedAccount(accounts[0]);
    }
  }, [accounts]);

  useEffect(() => {
    console.log(network);

    const initialize = async () => {
      // Enable Polkadot extension
      const extensions = await web3Enable("YourApp");
      if (extensions.length === 0) {
        console.log("No extension found");
        return;
      }

      // Fetch accounts from the extension
      const allAccounts = await web3Accounts();

      // Connect to Polkadot
      let provider = new WsProvider("wss://rpc.polkadot.io");
      if (network.data?.relayChainType)
        provider = new WsProvider(
          Object.keys(relayChainRpc).includes(network.data.relayChainType ?? "")
            ? relayChainRpc[network.data.relayChainType as keyof typeof relayChainRpc]
            : "wss://rpc.polkadot.io",
        ); // Change to your network if needed

      console.log("endpoint", provider.endpoint);

      const api = await ApiPromise.create({ provider });

      setRelayChainApi(api);

      // Set the currency symbol from the chain registry
      const symbol = api.registry.chainTokens[0];
      setTokenSymbol(symbol);

      // Get account balances and store them
      const accs = await Promise.all(
        allAccounts.map(async (e) => {
          const data = await api.query.system.account(e.address);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const d = data.toJSON() as any;
          return {
            ...e,
            balance: d.data.free,
          };
        }),
      );
      setAccounts(accs);
    };

    initialize();
  }, [network]);

  // Save selected account to local storage whenever it changes
  const selectAccount = (account: InjectedAccountWithMeta & { balance: string }) => {
    setSelectedAccount(account);
    localStorage.setItem(SELECTED_ACCOUNT_KEY, JSON.stringify(account));
  };

  return {
    selectedAccount,
    selectAccount,
    tokenSymbol,
    accounts,
    relayChainApi,
  };
};
