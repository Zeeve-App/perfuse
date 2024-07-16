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

import { RefObject, useEffect, useState } from "react";

class ModalManager {
  modals: Map<HTMLElement, number>;
  constructor() {
    this.modals = new Map();
  }

  add(modal: HTMLElement) {
    this.modals.set(modal, this.modals.size + 1);
    return this.modals.size;
  }

  remove(modal: HTMLElement) {
    this.modals.delete(modal);
  }

  isOnTop(modal: HTMLElement | null) {
    if (!modal) return false;
    return this.modals.get(modal) === this.modals.size;
  }
}

const modalManager = new ModalManager();

const useModalManager = (ref: RefObject<HTMLElement>, isModalMounted: boolean, isOpen?: boolean) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    if (isOpen) {
      const index = modalManager.add(node);
      setIndex(index);
    }

    return () => {
      modalManager.remove(node);
      setIndex(0);
    };
  }, [isModalMounted]);

  return index;
};

export { modalManager, useModalManager };
