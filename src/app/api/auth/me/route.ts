import { NextResponse } from "next/server";
import { getUserWithMarketplaces } from "@/lib/auth/session";
import { checkSubscription } from "@/lib/auth/subscription";

export async function GET() {
  try {
    const user = await getUserWithMarketplaces();

    if (!user) {
      return NextResponse.json(
        { authenticated: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Get connected marketplaces
    const connectedMarketplaces = user.marketplaceConns
      .filter((m) => m.status === "CONNECTED")
      .map((m) => ({
        marketplace: m.marketplace,
        name: m.externalName || m.marketplace,
        connectedAt: m.connectedAt,
      }));

    // Get subscription status
    const { hasActiveSubscription, subscription } = await checkSubscription();

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      marketplaces: connectedMarketplaces,
      marketplaceCount: connectedMarketplaces.length,
      subscription: {
        active: hasActiveSubscription,
        status: subscription?.status || null,
        marketplaceCount: subscription?.marketplaceCount || 0,
        currentPeriodEnd: subscription?.currentPeriodEnd || null,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { authenticated: false, error: "Authentication check failed" },
      { status: 500 }
    );
  }
}
