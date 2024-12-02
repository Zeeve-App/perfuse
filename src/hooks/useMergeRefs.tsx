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

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";

/**
 * Merges multiple React refs (callback or object refs) into a single ref callback.
 * Useful when multiple components or libraries need access to the same DOM element.
 */
const mergeRefs = (...refs: any[]) => {
  return (node: any) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref !== null) {
        ref.current = node;
      } else {
        return;
      }
    });
  };
};

const useMergeRefs = (...refs: any[]) => {
  return useMemo(() => mergeRefs(...refs), refs);
};

export { mergeRefs };
export default useMergeRefs;
