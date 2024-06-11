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
