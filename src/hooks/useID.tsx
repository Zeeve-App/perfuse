import { useId, useMemo } from "react";

const useID = (id?: string, ...prefixes: string[]) => {
  const reactId = useId();
  const ID = id ? id : reactId;
  return useMemo(() => {
    return prefixes.map((p) => `${p}-${ID}`);
  }, [ID, prefixes]);
};

export default useID;
