import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getUserSession } from "@/lib/auth/session";
import { calculateMonthlyPrice, PRICING } from "@/lib/subscription/pricing";

const updateSubscriptionSchema = z.object({
  marketplaceCount: z.number().min(1, "At least 1 marketplace is required"),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = updateSubscriptionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { marketplaceCount } = result.data;

    // Check if subscription exists
    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId: session.userId },
    });

    if (!existingSubscription) {
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 404 }
      );
    }

    // Calculate new pricing
    const totalPrice = calculateMonthlyPrice(marketplaceCount);

    // Update subscription with fresh price values to avoid stale data
    // Store unit prices (basePrice, additionalPrice) for consistency with create route
    const subscription = await prisma.subscription.update({
      where: { userId: session.userId },
      data: {
        totalPrice,
        marketplaceCount,
        basePrice: PRICING.BASE_PRICE,
        additionalPrice: PRICING.ADDITIONAL_PRICE,
      },
    });

    return NextResponse.json({
      success: true,
      subscription,
    });
  } catch (error) {
    console.error("Update subscription error:", error);
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
