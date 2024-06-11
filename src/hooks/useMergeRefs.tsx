/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";

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
