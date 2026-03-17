"use client";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="h-[55vh] w-full bg-[#E7ECEB]" />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="h-4 w-32 bg-[#E7ECEB] mb-4" />
        <div className="h-8 w-3/4 bg-[#E7ECEB] mb-3" />
        <div className="h-6 w-1/2 bg-[#E7ECEB] mb-8" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-[#E7ECEB]" />
          <div className="h-4 w-11/12 bg-[#E7ECEB]" />
          <div className="h-4 w-10/12 bg-[#E7ECEB]" />
          <div className="h-4 w-9/12 bg-[#E7ECEB]" />
        </div>
      </div>
    </div>
  );
}
