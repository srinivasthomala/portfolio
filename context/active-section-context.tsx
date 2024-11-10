"use client";

import type { ActiveSectionType } from "@/lib/data";
import React, { useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type ActiveSectionContextProviderProps = {
  children: React.ReactNode;
};

type ActiveSectionContextType = {
  activeSection: ActiveSectionType;
  setActiveSection: React.Dispatch<React.SetStateAction<ActiveSectionType>>;
  timeOfLastClick: number;
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
};

export const ActiveSectionContext =
  createContext<ActiveSectionContextType | null>(null);

export default function ActiveSectionContextProvider({
  children,
}: ActiveSectionContextProviderProps) {
  const [activeSection, setActiveSection] = useState<ActiveSectionType>("Home");
  const [timeOfLastClick, setTimeOfLastClick] = useState(0);
  const pathname = usePathname();

  // Update active section based on pathname
  useEffect(() => {
    if (pathname === "/articles") {
      setActiveSection("Articles");
    }
  }, [pathname]);

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        timeOfLastClick,
        setTimeOfLastClick,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error(
      "useActiveSectionContext must be used within an ActiveSectionContextProvider"
    );
  }

  return context;
}
