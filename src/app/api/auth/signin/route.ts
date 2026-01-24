import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createUserSession } from "@/lib/auth/session";

// Dummy hash for timing-safe comparison when user doesn't exist or has no password
// This is a bcrypt hash of a random string, used to prevent timing attacks
const DUMMY_HASH = "$2a$12$K.0HwpsoPDGaB/atFBmmYOGTW4/E2Z5x5gK.j8s6WJqQVSE0aGR5G";

const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = signinSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        marketplaceConns: {
          where: { status: "CONNECTED" },
        },
        subscription: true,
      },
    });

    // Always verify password to prevent timing attacks
    // Use the real hash if user exists and has one, otherwise use dummy hash
    const hashToVerify = user?.passwordHash || DUMMY_HASH;
    const isValid = await verifyPassword(password, hashToVerify);

    // Return generic error if user doesn't exist, has no password, or password is wrong
    if (!user || !user.passwordHash || !isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create session
    await createUserSession({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    // Determine redirect based on user state
    let redirect = "/chat";
    if (user.marketplaceConns.length === 0) {
      redirect = "/onboarding/connect";
    } else if (
      !user.subscription ||
      !["ACTIVE", "TRIAL"].includes(user.subscription.status)
    ) {
      // Redirect to payment if no subscription or subscription is not active/trial
      redirect = "/onboarding/payment";
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      redirect,
    });
  } catch (error) {
    // Log only the error message, not the full object which may contain sensitive data
    console.error("Signin error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "An error occurred during signin" },
      { status: 500 }
    );
  }
}
