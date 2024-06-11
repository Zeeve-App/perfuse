import { useContext } from "react";
import { BreadcrumbContext } from "./BreadcrumbContextProvider";

const DEFAULT_SEPARATOR = ">";

const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);

  if (context === null) throw new Error("useBreadcrumb can only be used within the <Breadcrumb />. ");

  return { ...context };
};

export { useBreadcrumb, DEFAULT_SEPARATOR };
