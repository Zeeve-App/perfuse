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

import SyntaxHighlighter from "react-syntax-highlighter";
import * as theme from "react-syntax-highlighter/dist/esm/styles/prism";
import { ChainSpecFileType } from "@/types/chain-spec";

export default function ParachainChainSpecPrev({ data }: { data?: ChainSpecFileType }) {
  return (
    <SyntaxHighlighter
      customStyle={{
        fontSize: "12px",
        backgroundColor: "transparent",
        padding: "1em",
        margin: "0",
        background: "#f4f7fe",
        overflowX: "hidden",
      }}
      language="json"
      style={theme.solarizedlight}
    >
      {JSON.stringify(data, null, 4)}
    </SyntaxHighlighter>
  );
}
