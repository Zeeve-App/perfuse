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
