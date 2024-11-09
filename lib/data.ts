import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import restaurantImg from "@/public/restaurant.png";
import databaseImg from "@/public/database.png";
import collisionGameImg from "@/public/collisionGame.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
  {
    name: "Articles",
    hash: "/articles",
    isRoute: true,
  },
  {
    name: "Blog",
    hash: "/blog",
    isRoute: true,
  },
] as const;

export const experiencesData = [
  {
    title: "Software Engineer",
    location: "New York, United States",
    description:
      "At Bloomberg L.P., I enhance system performance and user experience using Python, C++, React, Kafka, and Redis. I improve platform stability through bug fixes, UI refinements, and backend optimizations. I've introduced open-source technologies, developed client-centric features, and optimized trade processing systems. I also design disaster recovery architectures ensuring reliable data handling with minimal downtime.",
    icon: React.createElement(CgWorkAlt),
    date: "Jun 2021 - Present",
  },
  {
    title: "Master of Science in Computer Science",
    location: "University of Florida",
    description:
      "Completed my Master's degree in Computer Science, focusing on advanced computing concepts and software engineering principles.",
    icon: React.createElement(LuGraduationCap),
    date: "Aug 2019 - May 2021",
  },
  {
    title: "Software Engineer",
    location: "Bengaluru, India",
    description:
      "At Ittiam Systems, I enhanced video processing through innovative solutions. I improved video quality through algorithm changes and redesigned the software encoder as a multi-threaded application. I optimized performance by porting C/C++ code to Arm Assembly and addressed security vulnerabilities in the Android video library. I also developed automation scripts in Perl and Python to streamline core functionalities.",
    icon: React.createElement(CgWorkAlt),
    date: "Jul 2017 - Jul 2019",
  },
  {
    title: "Bachelor of Science in Computer Engineering",
    location: "National Institute of Technology Karnataka",
    description:
      "Completed my undergraduate degree in Computer Engineering. Actively participated in student leadership as a Class Representative and member of the Students Council, developing both technical and leadership skills.",
    icon: React.createElement(LuGraduationCap),
    date: "Aug 2013 - May 2017",
  },
  {
    title: "Software Intern",
    location: "Bengaluru, India",
    description:
      "Designed and implemented a deinterlace software application improving video rendering speed through GPU processing. Migrated a video codec from C/C++ on CPU to OpenCL on GPU for enhanced performance. Gained valuable experience in optimizing software for high-performance computing environments.",
    icon: React.createElement(CgWorkAlt),
    date: "May 2016 - Jul 2016",
  },
] as const;

export const projectsData = [
  {
    title: "Restaurant App",
    description:
      "A webapp which mimics a basic restaurant functionality. Website is built using NodeJS & Express on the backend with MongoDB as a database.",
    tags: ["NodeJS", "Express", "MongoDB"],
    imageUrl: restaurantImg,
  },
  {
    title: "Database System Implementation",
    description:
      "Developed a single-user database management system is implemented using C++. It supports a subset of SQL (select, project, and join) and three basic relational algebra operations.",
    tags: ["C++"],
    imageUrl: databaseImg,
  },
  {
    title: "Collision Game",
    description:
      "Developed using JavaScript. You are a monster and have to chase red balls in order to survive. Eating other color balls will make you die and you will lose the game. To see the 'You Win' message try to complete level 5.",
    tags: ["JavaScript"],
    imageUrl: collisionGameImg,
  },
] as const;

export const skillsData = [
  // Languages
  "C",
  "C++",
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",

  // Frameworks & Libraries
  "React",
  "Node.js",
  "Express",
  "Flask",
  "Bootstrap",
  "Next.js",
  "Tailwind",

  // Databases
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "SQLite",
  "Redis",

  // Tools & Platforms
  "Git",
  "RESTful APIs",
  "JSON",

  // Core Skills
  "Data Structures",
  "Algorithms",
  "Object-Oriented Programming",
  "Test-Driven Development",
  "Software Development Life Cycle",
  "Agile Methodology",
] as const;
