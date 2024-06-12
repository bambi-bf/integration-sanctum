import React, { createContext, useState, ReactNode } from "react";

// Define the type for your modal context
interface FeeContextType {
  computeUnitMicroLamports: number;
  setComputeUnitMicroLamports: (microLamports: number) => void;
  computeUnitLimit: number;
  setComputeUnitLimit: (unitLimit: number) => void;
}

// Create the modal context
export const FeeContext = createContext<FeeContextType>({
  computeUnitMicroLamports: 0,
  setComputeUnitMicroLamports: (microLamports: number) => {},
  computeUnitLimit: 0,
  setComputeUnitLimit: (unitLimit: number) => {}
});

interface FeeProviderProps {
  children: ReactNode;
}

// Define the modal provider component
export function FeeProvider({ children }: FeeProviderProps) {
  const [computeUnitMicroLamports, setComputeUnitMicroLamports] = useState(0);
  const [computeUnitLimit, setComputeUnitLimit] = useState(0);

  const setComputeUnitMicroLamportsIx = (microLamports: number) => {
    setComputeUnitMicroLamports(microLamports);
  };

  const setComputeUnitLimitIx = (unitLimit: number) => {
    setComputeUnitLimit(unitLimit);
  }

  const FeeContextValue: FeeContextType = {
    computeUnitMicroLamports: computeUnitMicroLamports,
    setComputeUnitMicroLamports: setComputeUnitMicroLamportsIx,
    computeUnitLimit: computeUnitLimit,
    setComputeUnitLimit: setComputeUnitLimitIx
  };

  return (
    <FeeContext.Provider value={FeeContextValue}>
      {children}
    </FeeContext.Provider>
  );
}
