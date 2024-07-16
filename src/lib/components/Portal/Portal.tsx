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

import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  isNested?: boolean;
  children: React.ReactNode;
}

const PortalContext = React.createContext<HTMLElement | null>(null);
PortalContext.displayName = "PortalContext";

const Portal: React.FC<PortalProps> = (props) => {
  const { isNested = false, children } = props;

  const [element, setElement] = useState<HTMLElement | null>(null);
  const portal = useRef<HTMLElement | null>(null);

  const [, setForceUpdate] = useState(false);
  useEffect(() => setForceUpdate((prev) => !prev), []);

  const parentPortal = useContext(PortalContext);

  useLayoutEffect(() => {
    if (!element) return;

    const doc = element.ownerDocument;
    const host = isNested ? parentPortal ?? doc.body : doc.body;

    if (!host) return;

    portal.current = doc.createElement("div");
    portal.current.className = "portal";

    host.appendChild(portal.current);
    setForceUpdate((prev) => !prev);

    const portalElement = portal.current;

    // cleanup
    return () => {
      if (host.contains(portalElement)) {
        host.removeChild(portalElement);
      }
    };
  }, [element]);

  return portal.current ? (
    createPortal(<PortalContext.Provider value={portal.current}>{children}</PortalContext.Provider>, portal.current)
  ) : (
    <span
      ref={(el) => {
        if (el) setElement(el);
      }}
    />
  );
};

Portal.displayName = "Portal";
export type { PortalProps };
export { Portal };
