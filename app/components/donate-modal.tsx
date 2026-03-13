"use client";

import { useEffect } from "react";
import { DonateModalContent } from "./donate-modal-content";

type DonateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function DonateModal({ isOpen, onClose }: DonateModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Close donate modal"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <DonateModalContent onClose={onClose} />
      </div>
    </div>
  );
}
