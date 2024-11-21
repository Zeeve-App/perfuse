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

/**
 * Manages modal stacking and determines if a modal is the top-most modal.
 * Useful for ensuring correct z-indexing and modal handling in applications.
 */
class ModalManager {
  // A map to track modals and their stack index.
  modals: Map<HTMLElement, number>;

  constructor() {
    this.modals = new Map();
  }

  /**
   * Adds a modal to the manager and assigns it a stack index.
   *
   * @param modal - The modal element to add.
   * @returns The stack index of the added modal.
   */
  add(modal: HTMLElement) {
    this.modals.set(modal, this.modals.size + 1);
    return this.modals.size;
  }

  /**
   * Removes a modal from the manager.
   *
   * @param modal - The modal element to remove.
   */
  remove(modal: HTMLElement) {
    this.modals.delete(modal);
  }

  /**
   * Checks if a given modal is the top-most modal in the stack.
   *
   * @param modal - The modal element to check.
   * @returns `true` if the modal is on top, otherwise `false`.
   */
  isOnTop(modal: HTMLElement | null) {
    if (!modal) return false;
    return this.modals.get(modal) === this.modals.size;
  }
}

// Create a shared instance of the ModalManager for use in the application.
const modalManager = new ModalManager();

/**
 * Custom hook for managing the modal's position in the modal stack.
 *
 * @param ref - A React ref pointing to the modal DOM element.
 * @param isModalMounted - Indicates if the modal is mounted in the DOM.
 * @param isOpen - Indicates if the modal is currently open.
 * @returns The stack index of the modal.
 */
const useModalManager = (ref: RefObject<HTMLElement>, isModalMounted: boolean, isOpen?: boolean) => {
  // State to store the stack index of the modal.
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    // If the modal is open, add it to the modal manager and update its index.
    if (isOpen) {
      const index = modalManager.add(node);
      setIndex(index);
    }

    // Cleanup function to remove the modal when it is unmounted or closed.
    return () => {
      modalManager.remove(node);
      setIndex(0);
    };
  }, [isModalMounted, isOpen, ref]);

  return index;
};

export { modalManager, useModalManager };
