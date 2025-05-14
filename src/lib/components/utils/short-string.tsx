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
import { CopyButton } from "@/lib/components/Button";
import { Tooltip } from "@/lib/components/Tooltip";
import { toShortString } from "@/utils/helpers";

const ShortString = ({
  text,
  copyButton,
  startCharCount,
}: {
  text: string;
  copyButton?: boolean;
  startCharCount: number;
}) => {
  return text?.length && text.length > startCharCount ? (
    <Tooltip text={text} placement="top-start">
      <div className="flex items-center">
        <div className="mr-2">{toShortString(text, startCharCount)}</div>
        {copyButton && <CopyButton text={text} />}
      </div>
    </Tooltip>
  ) : (
    text
  );
};

export default ShortString;
