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
import React from "react";
import KeyValuePair from "../utils/key-value-pair";
import { Button } from "../Button";
import { DropdownMenu, DropdownMenuButton, DropdownMenuList } from "../DropdownMenu";
import { useSelectedAccount } from "./use-wallet";
import { toShortString } from "@/utils/helpers";
import { useToggle } from "@/hooks";

const BalanceChecker = () => {
  // Custom hook to manage selected account with local storage
  const { selectedAccount, selectAccount, tokenSymbol, accounts } = useSelectedAccount();

  const {
    isOpen: isAddressDropdownOpen,
    handleToggle: handleAddressDropdownToggle,
    handleClose: handleAddressDropdownClose,
  } = useToggle();

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
