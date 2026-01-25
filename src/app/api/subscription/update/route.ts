import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserSession } from "@/lib/auth/session";
import { calculateMonthlyPrice, PRICING } from "@/lib/subscription/pricing";

export async function POST() {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    // Query the ACTUAL connected marketplace count from database
    // Don't trust client-supplied count to prevent underbilling
    const actualMarketplaceCount = await prisma.marketplaceConnection.count({
      where: {
        userId: session.userId,
        status: "CONNECTED",
      },
    });

    if (actualMarketplaceCount < 1) {
      return NextResponse.json(
        { error: "At least 1 connected marketplace is required" },
        { status: 400 }
      );
    }

    // Calculate pricing based on authoritative count
    const totalPrice = calculateMonthlyPrice(actualMarketplaceCount);

    // Update subscription with verified marketplace count
    const subscription = await prisma.subscription.update({
      where: { userId: session.userId },
      data: {
        totalPrice,
        marketplaceCount: actualMarketplaceCount,
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
