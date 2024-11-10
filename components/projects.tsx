"use client";

import React from "react";
import { projectsData } from "@/lib/data";
import Project from "./project";

export default function Projects() {
  return (
    <div>
      {projectsData.map((project, index) => (
        <React.Fragment key={index}>
          <Project {...project} />
        </React.Fragment>
      ))}
    </div>
  );
}
