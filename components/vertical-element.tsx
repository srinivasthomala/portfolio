"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { useTheme } from "@/context/theme-context";

interface VerticalElementProps {
  title: string;
  description: string;
  date: string;
  icon: React.ReactElement;
  location: string;
}

const VerticalElement = ({
  title,
  description,
  date,
  icon,
  location,
}: VerticalElementProps) => {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
        boxShadow: "none",
        border: "1px solid rgba(0, 0, 0, 0.05)",
        textAlign: "left",
        padding: "1.3rem 2rem",
      }}
      contentArrowStyle={{
        borderRight:
          theme === "light"
            ? "0.4rem solid #9ca3af"
            : "0.4rem solid rgba(255, 255, 255, 0.5)",
      }}
      date={date}
      icon={icon}
      iconStyle={{
        background: theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
        fontSize: "1.5rem",
      }}
      visible={inView}
    >
      <h3 className="font-semibold capitalize" ref={ref}>
        {title}
      </h3>
      <p className="!mt-0 font-normal">{location}</p>
      <p className="!mt-1 !font-normal">{description}</p>
    </VerticalTimelineElement>
  );
};

export { VerticalElement };
