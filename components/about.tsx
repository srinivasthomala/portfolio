"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-5">
        As a <span className="font-semibold">Software Engineer</span> at{" "}
        <span className="font-semibold">Bloomberg L.P.</span>, I specialize in
        enhancing system performance and user experience using{" "}
        <span className="font-medium">Python, C++, and React</span>. My work
        involves optimizing trade processing systems, developing client-centric
        features, and designing reliable disaster recovery architectures.
      </p>

      <p className="mb-5">
        With a <span className="font-medium">Master's in Computer Science</span>{" "}
        from the University of Florida and experience at{" "}
        <span className="font-semibold">Ittiam Systems</span>, I've developed
        expertise in system architecture, algorithm optimization, and software
        security. My technical skills span across{" "}
        <span className="italic">
          web development, distributed systems, and high-performance computing
        </span>
        .
      </p>

      <p className="mb-5">
        <span className="font-semibold">Beyond coding</span>, I'm passionate
        about <span className="italic">gaming, anime, and watching films</span>.
        Currently, I'm training in{" "}
        <span className="font-semibold">Mixed Martial Arts (MMA)</span> and
        learning to play the guitar, always seeking new challenges and ways to
        grow both personally and professionally.
      </p>
    </motion.section>
  );
}
