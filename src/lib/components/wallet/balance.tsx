import React, { useEffect, useState } from "react";
import { web3Enable, web3Accounts } from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import KeyValuePair from "../utils/key-value-pair";
import { Button } from "../Button";
import { DropdownMenu, DropdownMenuButton, DropdownMenuItem, DropdownMenuList } from "../DropdownMenu";
import { toShortString } from "@/utils/helpers";
import SvgPlusSquare from "@/lib/icons/essential/outline/PlusSquare";
import { useToggle } from "@/hooks";

const BalanceChecker = () => {
  const [accounts, setAccounts] = useState<(InjectedAccountWithMeta & { balance: string })[]>([]);

  const [tokenSymbol, setTokenSymbol] = useState<string | null>(null);

  const {
    isOpen: isAddressDropdownOpen,
    handleToggle: handleAddressDropdownToggle,
    handleClose: handleAddressDropdownClose,
  } = useToggle();

  useEffect(() => {
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
      const provider = new WsProvider("wss://rpc.polkadot.io"); // Change to your network if needed
      const api = await ApiPromise.create({ provider });

      // Set the currency symbol from the chain registry
      const symbol = api.registry.chainTokens[0];

      setTokenSymbol(symbol);

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
  }, []);

  return (
    <>
      {tokenSymbol && accounts?.[0]?.address && (
        <DropdownMenu className="" isOpen={isAddressDropdownOpen} onClose={handleAddressDropdownClose}>
          <DropdownMenuButton as={Button} variant={"text"} onClick={handleAddressDropdownToggle}>
            <KeyValuePair
              className="text-right"
              label={toShortString(accounts?.[0]?.address)}
              value={accounts?.[0]?.balance + " " + tokenSymbol}
            />
          </DropdownMenuButton>
          <DropdownMenuList className="flex flex-col gap-2 p-4">
            {accounts.map((e) => (
              <KeyValuePair
                key={e.address}
                className=" text-right"
                label={toShortString(e?.address, 8, 12)}
                value={e?.balance + " " + tokenSymbol}
              />
            ))}
          </DropdownMenuList>
        </DropdownMenu>
      )}
    </>
  );
};

export default BalanceChecker;
