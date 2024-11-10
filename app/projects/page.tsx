import { projectsData } from "@/lib/data";
import ProjectCard from "@/components/projects/project-card";
import SectionHeading from "@/components/section-heading";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

export const metadata = {
  title: "Projects | Srinivas",
  description:
    "A showcase of my personal and professional software development projects.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col items-center pt-8 sm:pt-10 min-h-screen">
      <section className="max-w-[45rem] w-full px-4 sm:px-8 mb-28">
        <SectionHeading>My Projects</SectionHeading>
        <div className="flex flex-col gap-4">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {/* GitHub Link Section */}
        <div className="mt-12 text-center">
          <Link
            href="https://github.com/srinivasthomala"
            target="_blank"
            className="group flex items-center justify-center gap-2 text-gray-700 dark:text-white/70 hover:text-gray-950 dark:hover:text-white"
          >
            <FaGithub className="text-xl" />
            <span>See more projects on GitHub</span>
            <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>
    </div>
  );
}
