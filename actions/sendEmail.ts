"use server";

import React from "react";
import { Resend } from "resend";
import { validateString } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";
import { ContentAnalyzer } from "@/lib/content-analyzer";
import { Logger } from "@/lib/logger";

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

  // Debug logging
  console.log("\n=== START OF EMAIL SUBMISSION ===");
  console.log("Raw message:", message);

  // Convert to lowercase for checking
  const lowerMessage = (message as string).toLowerCase();

  // Strict word check
  for (const word of STRICT_PROFANITY_LIST) {
    if (lowerMessage.includes(word)) {
      console.log(`BLOCKED: Found banned word: ${word}`);
      console.log("=== END OF EMAIL SUBMISSION ===\n");
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
    console.log("BLOCKED: Regex found profanity");
    console.log("=== END OF EMAIL SUBMISSION ===\n");
    return {
      error:
        "Message contains inappropriate language. Please keep it professional.",
    };
  }

  // If we get here, basic checks passed
  console.log("Basic profanity checks passed");

  // Content analysis
  const messageAnalysis = ContentAnalyzer.analyze(message as string);
  console.log(
    "Content Analysis Result:",
    JSON.stringify(messageAnalysis, null, 2)
  );

  if (messageAnalysis.isProfane) {
    console.log("BLOCKED: Content analyzer found profanity");
    console.log("=== END OF EMAIL SUBMISSION ===\n");
    return {
      error:
        "Message contains inappropriate content. Please keep it professional.",
    };
  }

  try {
    console.log("All checks passed, attempting to send email");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Final safety check
    if (STRICT_PROFANITY_LIST.some((word) => lowerMessage.includes(word))) {
      console.log("BLOCKED: Final safety check caught profanity");
      console.log("=== END OF EMAIL SUBMISSION ===\n");
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
      console.error("Email sending failed:", error);
      console.log("=== END OF EMAIL SUBMISSION ===\n");
      return {
        error: error.message,
      };
    }

    console.log("Email sent successfully");
    console.log("=== END OF EMAIL SUBMISSION ===\n");
    return {
      success: true,
    };
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    console.log("=== END OF EMAIL SUBMISSION ===\n");
    return {
      error: "Failed to send email. Please try again later.",
    };
  }
}
