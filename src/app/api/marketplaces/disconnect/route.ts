import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { getUserSession } from "@/lib/auth/session";
import { MarketplaceType, Prisma } from "@prisma/client";

const disconnectSchema = z.object({
  marketplace: z.nativeEnum(MarketplaceType),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = disconnectSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { marketplace } = result.data;

    // First check if the connection exists
    const existingConnection = await prisma.marketplaceConnection.findUnique({
      where: {
        userId_marketplace: {
          userId: session.userId,
          marketplace,
        },
      },
    });

    if (!existingConnection) {
      return NextResponse.json(
        { error: "Marketplace connection not found" },
        { status: 404 }
      );
    }

    // Use a transaction to ensure atomicity
    const connection = await prisma.$transaction(async (tx) => {
      // Update connection status to disconnected
      const updatedConnection = await tx.marketplaceConnection.update({
        where: {
          userId_marketplace: {
            userId: session.userId,
            marketplace,
          },
        },
        data: {
          status: "DISCONNECTED",
          accessToken: null,
          refreshToken: null,
          tokenExpiry: null,
        },
      });

      // If it's Shopify, update store sync status instead of deleting
      // This preserves historical data while marking stores as disconnected
      if (marketplace === "SHOPIFY" && existingConnection.externalId) {
        await tx.store.updateMany({
          where: {
            userId: session.userId,
            shopifyId: existingConnection.externalId,
          },
          data: {
            syncStatus: "PENDING",
            accessToken: null, // Clear the access token for security (consistent with MarketplaceConnection)
          },
        });
      }

      return updatedConnection;
    });

    return NextResponse.json({
      success: true,
      connection,
    });
  } catch (error) {
    console.error("Disconnect marketplace error:", error);

    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Marketplace connection not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to disconnect marketplace" },
      { status: 500 }
    );
  }
}
