import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Diet } from "../@types/diet";
import { StepContext } from "./Step";

interface DietContextType {
  dietData: Diet;
  mealFraction: number;
  createDietType: (newDietData: { type: "cutting" | "bulking" | "basal"; dietKcal: number }) => void;
  createDietKcalMeta: (newDietMetaKcalData: { cho: number; ptn: number; lip: number }) => void;
  changeMealFraction: (fraction: number) => void;
}

export const DietContext = createContext({} as DietContextType);

interface DietContextProviderProps {
  children: ReactNode;
}

export function DietContextProvider({ children }: DietContextProviderProps) {
  const [dietData, setDietData] = useState({} as Diet);
  const [mealFraction, setMealFraction] = useState(1);

  const { increaseCurrentStep } = useContext(StepContext);

  useEffect(() => {
    const existsDietData = localStorage.getItem("@rdieta:diet");

    if (existsDietData !== null) {
      setDietData(JSON.parse(existsDietData));
    }
  }, []);

  useEffect(() => {
    if (Object.entries(dietData).length > 0) {
      localStorage.setItem("@rdieta:diet", JSON.stringify(dietData));
    }
  }, [dietData]);

  function createDietType(newDietData: { type: "cutting" | "bulking" | "basal"; dietKcal: number }) {
    setDietData((state) => {
      return {
        ...state,
        dietType: newDietData,
      };
    });

    increaseCurrentStep();
  }

  function createDietKcalMeta(newDietMetaKcalData: { cho: number; ptn: number; lip: number }) {
    setDietData((state) => {
      return {
        ...state,
        metaKcal: newDietMetaKcalData,
      };
    });

    increaseCurrentStep();
  }

  function changeMealFraction(fraction: number) {
    setMealFraction(fraction);
  }

  return (
    <DietContext.Provider
      value={{
        dietData,
        mealFraction,
        createDietType,
        createDietKcalMeta,
        changeMealFraction,
      }}
    >
      {children}
    </DietContext.Provider>
  );
}
