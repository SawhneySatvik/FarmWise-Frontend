

import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "FarmWise - Agricultural Assistant",
  description: "AI-powered assistant for Indian farmers",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 h-[100dvh] overflow-hidden">
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        {children}
      </Suspense>
    </div>
  );
} 