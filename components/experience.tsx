"use client";

import React from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { VerticalElement } from "./vertical-element";
import { useTheme } from "@/context/theme-context";

export default function Experience() {
  const { theme } = useTheme();

  return (
    <VerticalTimeline
      lineColor={theme === "light" ? "#e5e7eb" : "rgba(255, 255, 255, 0.05)"}
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
  );
}
