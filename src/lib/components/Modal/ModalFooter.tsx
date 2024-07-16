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

import { cva, VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";
import { tx } from "@/utils/shared";

const styles = cva("flex items-center gap-4 px-6 py-4", {
  variants: {
    placement: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    },
  },
  defaultVariants: {
    placement: "end",
  },
});

type ModalFooterVariantProps = VariantProps<typeof styles>;

interface ModalFooterProps extends React.ComponentPropsWithRef<"div">, ModalFooterVariantProps {}

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>((props, ref) => {
  const { placement, className, children, ...rest } = props;

  return (
    <div ref={ref} className={tx(styles({ placement, className }))} {...rest}>
      {children}
    </div>
  );
});

ModalFooter.displayName = "ModalFooter";
export type { ModalFooterProps };
export { ModalFooter };
