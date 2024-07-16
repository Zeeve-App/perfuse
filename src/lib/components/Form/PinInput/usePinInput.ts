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

import React, { useMemo } from "react";
const REGEX_DIGIT = new RegExp(/^\d+$/);

interface UsePinInputProps {
  length: number;
  pin: string;
  onChange: (value: string) => void;
}

const usePinInput = (props: UsePinInputProps) => {
  const { length, pin, onChange } = props;

  const focusToPreviousInput = (target: HTMLElement) => {
    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isDigit = REGEX_DIGIT.test(targetValue);

    if (!isDigit && targetValue !== "") {
      return;
    }

    const nextInputElement = target.nextElementSibling as HTMLInputElement | null;

    // only delete digit if next input element has no value
    if (!isDigit && nextInputElement && nextInputElement.value !== "") {
      return;
    }

    targetValue = isDigit ? targetValue : " "; // there is a space between double quotes

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue = pin.substring(0, index) + targetValue + pin.substring(index + 1);
      onChange(newValue);

      if (!isDigit) {
        return;
      }

      focusToNextInput(target);
    } else if (targetValueLength === length) {
      onChange(targetValue);
      target.blur();
    }
  };

  /** The onKeyDown event occurs when the user presses a key on the keyboard. */
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    // focus to next input if RIGHT or DOWN arrow key is pressed
    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      return focusToNextInput(target);
    }

    // focus to previous input if LEFT or UP arrow key is pressed
    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      return focusToPreviousInput(target);
    }

    const targetValue = target.value;

    // keep the selection range position if the same digit was typed
    target.setSelectionRange(0, targetValue.length);

    // return if pressed key is not BACKSPACE or target value is not empty
    if (key !== "Backspace" || targetValue !== "") {
      return;
    }

    focusToPreviousInput(target);
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

    // keep focusing back until previous input element has value
    const previousInputElement = target.previousElementSibling as HTMLInputElement | null;
    if (previousInputElement && previousInputElement.value === "") {
      return previousInputElement.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  const pinItems = useMemo(() => {
    const pinArray = pin.split("");
    const items: string[] = [];

    for (let i = 0; i < length; i++) {
      const char = pinArray[i];

      if (REGEX_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }

    return items;
  }, [pin, length]);

  return {
    handleOnChange,
    handleOnKeyDown,
    handleOnFocus,
    pinItems,
  };
};

export { type UsePinInputProps, usePinInput };
