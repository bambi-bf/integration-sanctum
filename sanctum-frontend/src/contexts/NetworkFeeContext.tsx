import React, { createContext, useState, ReactNode } from "react";

// Define the type for your modal context
interface FeeContextType {
  computeUnitMicroLamports: number;
  setComputeUnitMicroLamports: (microLamports: number) => void;
}

// Create the modal context
export const FeeContext = createContext<FeeContextType>({
  computeUnitMicroLamports: 0,
  setComputeUnitMicroLamports: (microLamports: number) => {},
});

interface FeeProviderProps {
  children: ReactNode;
}

// Define the modal provider component
export function FeeProvider({ children }: FeeProviderProps) {
  const [computeUnitMicroLamports, setComputeUnitMicroLamports] = useState(0);

  const setComputeUnitMicroLamportsIx = (microLamports: number) => {
    setComputeUnitMicroLamports(microLamports);
  };

  const FeeContextValue: FeeContextType = {
    computeUnitMicroLamports: computeUnitMicroLamports,
    setComputeUnitMicroLamports: setComputeUnitMicroLamportsIx,
  };

  return (
    <FeeContext.Provider value={FeeContextValue}>
      {children}
    </FeeContext.Provider>
  );
}
