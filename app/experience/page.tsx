"use client";

import SectionHeading from "@/components/section-heading";
import { experiencesData } from "@/lib/data";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { VerticalElement } from "@/components/vertical-element";
import { useTheme } from "@/context/theme-context";

export default function ExperiencePage() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center pt-8 sm:pt-10 min-h-screen">
      <section className="w-full px-4 sm:px-8 mb-28">
        <SectionHeading>My Experience</SectionHeading>
        <div className="max-w-[75rem] mx-auto">
          <VerticalTimeline
            lineColor={
              theme === "light" ? "#e5e7eb" : "rgba(255, 255, 255, 0.05)"
            }
          >
            {experiencesData.map((item, index) => (
              <VerticalElement
                key={index}
                title={item.title}
                description={item.description}
                date={item.date}
                icon={item.icon}
                location={item.location}
              />
            ))}
          </VerticalTimeline>
        </div>
      </section>
    </div>
  );
}
