"use server";

import React from "react";
import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";

// Check if API key exists
if (!process.env.RESEND_API_KEY) {
  throw new Error(
    "Missing RESEND_API_KEY environment variable. Please add it to your .env file"
  );
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  // Simple server-side validation
  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "srinivasthomala@gmail.com",
      subject: "Message from contact form",
      reply_to: senderEmail as string,
      react: React.createElement(ContactFormEmail, {
        message: message as string,
        senderEmail: senderEmail as string,
      }),
    });

    if (error) {
      return {
        error: error.message,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
    // Log error for debugging
    if (process.env.NODE_ENV === "development") {
      console.error("Email error:", error);
    }

    return {
      error:
        "Failed to send email. However, if you received a confirmation, the message was sent successfully.",
    };
  }
};
