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
        <span>As a seasoned </span>
        <span className="font-semibold">Software Engineer</span> with a strong
        academic background in{" "}
        <span className="font-medium">Computer Science</span>, I have gained
        extensive experience in{" "}
        <span className="italic">developing and optimizing software</span>{" "}
        across various domains.
      </p>

      <p className="mb-5">
        My professional journey includes working at{" "}
        <span className="font-semibold">Bloomberg L.P.</span>, where I enhanced
        system performance, worked on open-source technologies, and developed
        client-centric features. I also contributed to video processing
        innovations at <span className="font-semibold">Ittiam Systems</span>,
        where I optimized algorithms, improved software efficiency, and ensured
        secure deployments.
      </p>

      <p className="mb-5">
        My technical expertise spans languages like{" "}
        <span className="font-bold">Python, C++, and JavaScript</span>, along
        with proficiency in frameworks such as{" "}
        <span className="font-bold">React, Node.js, and Django</span>.
      </p>

      <p className="mb-5">
        I have a <span className="italic">proven track record</span> of
        developing{" "}
        <span className="font-semibold">high-performance applications</span>,
        including web apps, database systems, and automation tools. I'm
        passionate about leveraging technology to solve complex problems and
        deliver scalable solutions that meet business needs.
      </p>

      <p className="mb-8">
        In addition to my technical skills, I've demonstrated leadership by{" "}
        <span className="font-semibold">mentoring junior engineers</span> and{" "}
        <span className="font-semibold">leading large student cohorts</span>{" "}
        during my academic tenure.
      </p>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-semibold">When I'm not coding</span>, you'll
          find me{" "}
          <span className="italic">
            gaming, watching films, and spending quality time with friends
          </span>
          . I'm passionate about{" "}
          <span className="font-medium">learning new things</span>. Currently,
          I'm training in{" "}
          <span className="font-semibold">Mixed Martial Arts (MMA)</span> and
          exploring my musical side by{" "}
          <span className="italic">learning to play the guitar</span>.
        </p>
      </div>
    </motion.section>
  );
}
