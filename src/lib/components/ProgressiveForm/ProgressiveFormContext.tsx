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

import { createContext, useCallback, useContext } from "react";

type FormStatus = "active" | "completed" | "idle";

interface ProgressiveFormContextProps {
  /**
   * Current active form step.
   */
  activeStep: number;
  /**
   * Set active form step.
   */
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  /**
   * Total number of steps.
   */
  totalSteps: number;
  /**
   * Set total number of steps.
   * @param x steps count
   */
  setTotalSteps: (x: number) => void;
  isCompact?: boolean;
  shouldHideHeaderIconsOnCompact?: boolean;
}

const ProgressiveFormContext = createContext<ProgressiveFormContextProps | null>(null);
const useProgressiveFormContext = () => {
  const context = useContext(ProgressiveFormContext);
  if (!context) {
    throw new Error("useProgressiveFormContext can only be used within the <ProgressiveForm />.");
  }

  const { activeStep, setActiveStep } = context;

  const goToPreviousStep = useCallback(() => {
    setActiveStep((step) => step - 1);
  }, []);

  const goToNextStep = useCallback(() => {
    setActiveStep((step) => step + 1);
  }, []);

  const formStatus = useCallback(
    (index: number): FormStatus => {
      if (activeStep === index) return "active";
      else if (activeStep > index) return "completed";
      else return "idle";
    },
    [activeStep],
  );

  return { ...context, formStatus, goToPreviousStep, goToNextStep };
};

const ProgressiveFormContextConsumer = ProgressiveFormContext.Consumer;
const ProgressiveFormContextProvider = ProgressiveFormContext.Provider;

ProgressiveFormContext.displayName = "ProgressiveFormContext";
export type { ProgressiveFormContextProps, FormStatus };
export {
  ProgressiveFormContext,
  ProgressiveFormContextConsumer,
  ProgressiveFormContextProvider,
  useProgressiveFormContext,
};
