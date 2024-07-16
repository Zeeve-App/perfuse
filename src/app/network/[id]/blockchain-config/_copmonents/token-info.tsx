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

import { Heading } from "@/lib/components/Heading";
import KeyValuePairInput from "@/lib/components/utils/key-value-pair-input";
import { ChainSpecFileType } from "@/types/chain-spec";
import { formateNumber } from "@/utils/helpers";

interface ParachainConfigProps {
  data?: ChainSpecFileType;
  isLoading: boolean;
}

const TokenInfo = ({ data, isLoading }: ParachainConfigProps) => {
  return (
    <div className="col-span-12 flex flex-col gap-3 rounded-lg p-4 shadow-brand-shadow lg:gap-6">
      <div className="grid grid-cols-12 gap-3 lg:gap-6">
        <Heading as="h4" className="col-span-12">
          Token Info
        </Heading>
      </div>
      <div className="grid grid-cols-12 gap-3 lg:gap-6">
        <KeyValuePairInput
          className="col-span-3"
          label={"Name"}
          value={data?.properties?.tokenSymbol ?? "NA"}
          isLoading={isLoading}
        />
        <KeyValuePairInput
          className="col-span-3"
          label={"Decimal"}
          value={data?.properties?.tokenDecimals ?? "NA"}
          isLoading={isLoading}
        />
        <KeyValuePairInput
          className="col-span-3"
          label={"Encoding"}
          value={data?.properties ? "ss58Format" : "NA"}
          isLoading={isLoading}
        />
        <KeyValuePairInput
          className="col-span-3"
          label={"Candidacy Bond"}
          value={
            data?.genesis.runtime?.collatorSelection?.candidacyBond
              ? formateNumber(data.genesis.runtime.collatorSelection.candidacyBond, "standard")
              : "NA"
          }
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default TokenInfo;
