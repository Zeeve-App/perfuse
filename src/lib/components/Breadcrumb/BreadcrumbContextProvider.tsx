import { ReactElement, createContext } from "react";

type Separator = string | ReactElement;

interface BreadcrumbContextProps {
  activeLink: string;
  setActiveLink: (arg0: string) => void;
  separator: Separator;
  setSeparator: (arg0: Separator) => void;
  activeLinkClassName?: string;
}

const BreadcrumbContext = createContext<BreadcrumbContextProps | null>(null);

export type { Separator, BreadcrumbContextProps };
export { BreadcrumbContext };
