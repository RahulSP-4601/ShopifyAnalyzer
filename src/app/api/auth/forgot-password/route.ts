import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { generateResetToken, hashResetToken } from "@/lib/auth/password";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = forgotPasswordSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account with that email exists, we've sent a password reset link.",
      });
    }

    // Generate reset token and hash it for secure storage
    const resetToken = generateResetToken();
    const resetTokenHash = hashResetToken(resetToken);
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save hashed reset token (never store plaintext tokens)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetTokenHash,
        resetTokenExpiry,
      },
    });

    // TODO: Send email with reset link using an email service
    // In development, optionally log obfuscated debug info (never the full token)
    if (
      process.env.NODE_ENV === "development" &&
      process.env.DEBUG_LOG_RESET_TOKEN === "true"
    ) {
      // Only show last 4 characters of token for debugging, never the full token
      // Use user.id instead of email to avoid PII leak in logs
      console.log(
        `[DEV] Password reset token generated for user ${user.id} (ends with: ...${resetToken.slice(-4)})`
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "If an account with that email exists, we've sent a password reset link.",
    });
  } catch (error) {
    // Sanitize error logging to avoid leaking stack traces in production
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorName = error instanceof Error ? error.name : "Error";

    if (process.env.NODE_ENV === "development") {
      console.error("Forgot password error:", error);
    } else {
      // Production: log only sanitized error info without stack traces
      console.error(`Forgot password error: ${errorName} - ${errorMessage}`);
    }

    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
