"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { DonateModal } from "./donate-modal";

type DonateModalContextValue = {
  openDonateModal: () => void;
  closeDonateModal: () => void;
};

const DonateModalContext = createContext<DonateModalContextValue | null>(null);

export function DonateModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDonateModal = useCallback(() => setIsOpen(true), []);
  const closeDonateModal = useCallback(() => setIsOpen(false), []);

  return (
    <DonateModalContext.Provider value={{ openDonateModal, closeDonateModal }}>
      {children}
      <DonateModal isOpen={isOpen} onClose={closeDonateModal} />
    </DonateModalContext.Provider>
  );
}

export function useDonateModal() {
  const ctx = useContext(DonateModalContext);
  if (!ctx) {
    throw new Error("useDonateModal must be used within DonateModalProvider");
  }
  return ctx;
}
