"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { DonateModalContent } from "../components/donate-modal-content";

export default function DonatePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-[#111C1B]">
      <div className="absolute inset-0">
        <Image
          src="/images/site/join-community.jpg"
          alt="Women for Women Rwanda"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <DonateModalContent onClose={() => router.push("/")} />
      </div>
    </div>
  );
}
