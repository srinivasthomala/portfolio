"use client";

import { links } from "@/lib/data";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const router = useRouter();

  return (
    <header className="z-[999] relative">
      <nav className="flex fixed top-0 left-1/2 -translate-x-1/2 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] sm:top-6 sm:h-[3.25rem] sm:w-[24rem] sm:rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75">
        <ul className="flex w-full items-center justify-center text-[0.9rem] font-medium text-gray-500 sm:gap-2">
          {links.map((link) => (
            <li
              key={link.hash}
              className="h-3/4 flex items-center justify-center relative"
            >
              {link.hash.startsWith("/") ? (
                <Link
                  href={link.hash}
                  className={clsx(
                    "flex w-full items-center justify-center px-2 py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300"
                  )}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  onClick={() => {
                    setActiveSection(link.name);
                    setTimeOfLastClick(Date.now());
                  }}
                  className={clsx(
                    "flex w-full items-center justify-center px-2 py-3 hover:text-gray-950 transition dark:text-gray-500 dark:hover:text-gray-300",
                    {
                      "text-gray-950 dark:text-gray-200":
                        activeSection === link.name,
                    }
                  )}
                  href={`/#${link.hash.substring(1)}`}
                >
                  {link.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
