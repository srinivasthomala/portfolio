"use client";

import { useEffect } from "react";
import { useActiveSectionContext } from "@/context/active-section-context";
import About from "@/components/about";
import Contact from "@/components/contact";
import Intro from "@/components/intro";
import SectionDivider from "@/components/section-divider";

export default function Home() {
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    setActiveSection("Home");
    setTimeOfLastClick(Date.now());
  }, [setActiveSection, setTimeOfLastClick]);

  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      <Contact />
    </main>
  );
}
