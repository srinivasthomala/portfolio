"use client";

import { sendEmail } from "@/actions/sendEmail";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";
import SectionHeading from "./section-heading";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const [pending, setPending] = useState(false);

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (formData) => {
          setPending(true);

          try {
            const response = await sendEmail(formData);

            if (response.error) {
              toast.error(response.error);
              return;
            }

            toast.success("Email sent successfully!");
            (
              document.getElementById("contact-form") as HTMLFormElement
            )?.reset();
          } catch (error) {
            toast.error("Something went wrong. Please try again later.");
          } finally {
            setPending(false);
          }
        }}
        id="contact-form"
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message"
          required
          maxLength={5000}
          placeholder="Your message"
        />
        <button
          type="submit"
          className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 dark:bg-white dark:bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65"
          disabled={pending}
        >
          {pending ? (
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
          ) : (
            <>Submit</>
          )}
        </button>
      </form>
    </motion.section>
  );
}
