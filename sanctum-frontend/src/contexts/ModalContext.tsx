import React, { createContext, useState, ReactNode } from "react";

// Define the type for your modal context
interface ModalContextType {
  feeSettingModalShow: boolean;
  openFeeSettingModal: () => void;
  closeFeeSettingModal: () => void;
}

// Create the modal context
export const ModalContext = createContext<ModalContextType>({
  feeSettingModalShow: false,
  openFeeSettingModal: () => {},
  closeFeeSettingModal: () => {}
});

interface ModalProviderProps {
  children: ReactNode;
}

// Define the modal provider component
export function ModalProvider({ children }: ModalProviderProps) {
  const [feeSettingModalShow, setFeeSettingModalShow] = useState(false);

  const openFeeSettingModal = () => {
    setFeeSettingModalShow(true);
  };

  const closeFeeSettingModal = () => {
    setFeeSettingModalShow(false);
  };

  const ModalContextValue: ModalContextType = {
    feeSettingModalShow: feeSettingModalShow,
    openFeeSettingModal: openFeeSettingModal,
    closeFeeSettingModal: closeFeeSettingModal,
  };

  return (
    <ModalContext.Provider value={ModalContextValue}>
      {children}
    </ModalContext.Provider>
  );
}
