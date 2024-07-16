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

import React, { forwardRef } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { tx } from "@/utils/shared";

type ModalOverlayProps = HTMLMotionProps<"div">;

const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      tabIndex={-1}
      aria-hidden="true"
      className={tx("fixed inset-0 bg-black/40", className)}
      ref={ref}
      {...rest}
    />
  );
});

ModalOverlay.displayName = "ModalOverlay";
export type { ModalOverlayProps };
export { ModalOverlay };
