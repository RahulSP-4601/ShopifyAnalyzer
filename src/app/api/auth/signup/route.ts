import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { hashPassword, validatePassword } from "@/lib/auth/password";
import { createUserSession } from "@/lib/auth/session";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().min(1, "Country is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = signupSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, phone, city, state, zipCode, country, password } =
      result.data;

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.error },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user - wrap in try/catch to handle race condition where
    // another request creates the same email between findUnique and create
    let user;
    try {
      user = await prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          phone: phone || null,
          city: city || null,
          state: state || null,
          zipCode: zipCode || null,
          country,
          passwordHash,
        },
      });
    } catch (createError) {
      // Handle unique constraint violation (race condition)
      if (
        createError instanceof Prisma.PrismaClientKnownRequestError &&
        createError.code === "P2002"
      ) {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 400 }
        );
      }
      throw createError;
    }

    // Create session - if this fails, roll back by deleting the user
    try {
      await createUserSession({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    } catch (sessionError) {
      // Roll back user creation to maintain atomicity
      // Sanitize error logging to avoid leaking sensitive data
      const sessionErrorMessage = sessionError instanceof Error ? sessionError.message : "Unknown error";
      console.error(`Session creation failed for user ${user.id}, rolling back: ${sessionErrorMessage}`);

      // Wrap rollback in try/catch to handle deletion failures gracefully
      try {
        await prisma.user.delete({ where: { id: user.id } });
      } catch (deleteError) {
        // Log the deletion failure with user details for manual cleanup
        console.error(
          `Rollback failed: could not delete orphaned user (id: ${user.id}, email: ${user.email}):`,
          deleteError
        );
        return NextResponse.json(
          { error: "Account creation failed and rollback unsuccessful. Please contact support." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: "Failed to create session. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      redirect: "/onboarding/connect",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An error occurred during signup" },
      { status: 500 }
    );
  }
}
