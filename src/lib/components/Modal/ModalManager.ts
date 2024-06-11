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
