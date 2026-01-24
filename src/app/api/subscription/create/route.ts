import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getUserSession } from "@/lib/auth/session";
import { calculateMonthlyPrice, PRICING } from "@/lib/subscription/pricing";

const createSubscriptionSchema = z.object({
  marketplaceCount: z.number().min(1, "At least 1 marketplace is required"),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = createSubscriptionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { marketplaceCount } = result.data;

    // Calculate pricing
    const totalPrice = calculateMonthlyPrice(marketplaceCount);

    // Calculate billing period (1 month from now)
    // Handle month overflow properly (e.g., Jan 31 -> Feb 28, not Mar 2/3)
    const currentPeriodStart = new Date();
    const year = currentPeriodStart.getFullYear();
    const month = currentPeriodStart.getMonth();
    const day = currentPeriodStart.getDate();

    // Get the last day of the target month (month + 2 with day 0 gives last day of month + 1)
    const lastDayOfNextMonth = new Date(year, month + 2, 0).getDate();

    // Use the smaller of: original day or last day of target month
    // This ensures Jan 31 -> Feb 28 (not Mar 2/3)
    const targetDay = Math.min(day, lastDayOfNextMonth);
    const currentPeriodEnd = new Date(year, month + 1, targetDay);

    // Create or update subscription
    // On update, preserve existing billing period (don't reset currentPeriodStart/End)
    const subscription = await prisma.subscription.upsert({
      where: { userId: session.userId },
      create: {
        userId: session.userId,
        status: "ACTIVE",
        basePrice: PRICING.BASE_PRICE,
        additionalPrice: PRICING.ADDITIONAL_PRICE,
        totalPrice,
        marketplaceCount,
        currentPeriodStart,
        currentPeriodEnd,
      },
      update: {
        status: "ACTIVE",
        basePrice: PRICING.BASE_PRICE,
        additionalPrice: PRICING.ADDITIONAL_PRICE,
        totalPrice,
        marketplaceCount,
        // Don't update currentPeriodStart/currentPeriodEnd to preserve billing cycle
      },
    });

    return NextResponse.json({
      success: true,
      subscription,
      redirect: "/chat",
    });
  } catch (error) {
    console.error("Create subscription error:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
