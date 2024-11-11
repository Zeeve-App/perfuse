import { useState, useEffect } from "react";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

const SELECTED_ACCOUNT_KEY = "selectedAccount";

export const useSelectedAccount = (accounts: (InjectedAccountWithMeta & { balance: string })[]) => {
  const [selectedAccount, setSelectedAccount] = useState<(InjectedAccountWithMeta & { balance: string }) | null>(null);

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

  // Save selected account to local storage whenever it changes
  const selectAccount = (account: InjectedAccountWithMeta & { balance: string }) => {
    setSelectedAccount(account);
    localStorage.setItem(SELECTED_ACCOUNT_KEY, JSON.stringify(account));
  };

  return {
    selectedAccount,
    selectAccount,
  };
};
