"use server";

import React from "react";
import { Resend } from "resend";
import { validateString } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";
import { ContentAnalyzer } from "@/lib/content-analyzer";

const STRICT_PROFANITY_LIST = [
  "fuck",
  "fucking",
  "fucked",
  "fucker",
  "shit",
  "ass",
  "asshole",
  "bitch",
  "cunt",
];

export async function sendEmail(formData: FormData) {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  // Convert to lowercase for checking
  const lowerMessage = (message as string).toLowerCase();

  // Strict word check
  for (const word of STRICT_PROFANITY_LIST) {
    if (lowerMessage.includes(word)) {
      return {
        error:
          "Message contains inappropriate language. Please keep it professional.",
      };
    }
  }

  // Additional regex check
  const strictRegex =
    /\b(fuck|fucking|fucked|fucker|shit|ass|asshole|bitch|cunt)\b/i;
  if (strictRegex.test(lowerMessage)) {
    return {
      error:
        "Message contains inappropriate language. Please keep it professional.",
    };
  }

  // Content analysis
  const messageAnalysis = ContentAnalyzer.analyze(message as string);

  if (messageAnalysis.isProfane) {
    return {
      error:
        "Message contains inappropriate content. Please keep it professional.",
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Final safety check
    if (STRICT_PROFANITY_LIST.some((word) => lowerMessage.includes(word))) {
      return {
        error:
          "Message contains inappropriate language. Please keep it professional.",
      };
    }

    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "srinivasthomala@gmail.com",
      subject: "Message from contact form",
      replyTo: senderEmail as string,
      react: React.createElement(ContactFormEmail, {
        message: message as string,
        senderEmail: senderEmail as string,
      }),
    });

    if (error) {
      console.error("Email error:", error);
      return { error: error.message };
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("Send email error:", error);
    return {
      error: "Failed to send email. Please try again later.",
    };
  }
}
