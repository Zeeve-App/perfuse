import React, { useEffect, useState } from "react";
import { web3Enable, web3Accounts } from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import KeyValuePair from "../utils/key-value-pair";
import { Button } from "../Button";
import { DropdownMenu, DropdownMenuButton, DropdownMenuList } from "../DropdownMenu";
import { useSelectedAccount } from "./use-wallet";
import { toShortString } from "@/utils/helpers";
import { useToggle } from "@/hooks";
import { useNetworkStore } from "@/store/network";
import { envAndRelayChainOption, networkEnvType, relayChainOption } from "@/constants/create-network";

const relayChainRpc: Record<(typeof envAndRelayChainOption)[number]["relayChainOption"][number]["value"], string> = {
  paseo: "wss://paseo.rpc.amforc.com:443", // Placeholder RPC endpoint for the 'paseo' chain
  kusama: "wss://kusama-rpc.polkadot.io", // RPC endpoint for Kusama mainnet
  polkadot: "wss://rpc.polkadot.io", // RPC endpoint for Polkadot mainnet
};

const BalanceChecker = () => {
  const [accounts, setAccounts] = useState<(InjectedAccountWithMeta & { balance: string })[]>([]);
  // Custom hook to manage selected account with local storage
  const { selectedAccount, selectAccount } = useSelectedAccount(accounts);

  const [tokenSymbol, setTokenSymbol] = useState<string | null>(null);

  const {
    isOpen: isAddressDropdownOpen,
    handleToggle: handleAddressDropdownToggle,
    handleClose: handleAddressDropdownClose,
  } = useToggle();

  const network = useNetworkStore((e) => e.networkInfo);

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

  return (
    <>
      {tokenSymbol && selectedAccount?.address && (
        <DropdownMenu className="" isOpen={isAddressDropdownOpen} onClose={handleAddressDropdownClose}>
          <DropdownMenuButton as={Button} variant={"text"} onClick={handleAddressDropdownToggle}>
            <KeyValuePair
              className="text-right"
              label={toShortString(selectedAccount?.address)}
              value={selectedAccount?.balance + " " + tokenSymbol}
            />
          </DropdownMenuButton>
          <DropdownMenuList className="flex flex-col gap-2 p-4">
            {accounts.map((e) => (
              <KeyValuePair
                key={e.address}
                className=" cursor-pointer text-right"
                label={toShortString(e?.address, 8, 12)}
                value={e?.balance + " " + tokenSymbol}
                onClick={() => selectAccount(e)}
              />
            ))}
          </DropdownMenuList>
        </DropdownMenu>
      )}
    </>
  );
};

export default BalanceChecker;
