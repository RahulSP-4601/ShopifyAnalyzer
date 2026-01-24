import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import prisma from "@/lib/prisma";

const SESSION_COOKIE = "shopiq_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

// ============================================
// USER-BASED AUTH (New)
// ============================================

export interface UserSessionPayload {
  userId: string;
  email: string;
  name: string;
  [key: string]: unknown;
}

/**
 * Create a user session
 */
export async function createUserSession(user: {
  id: string;
  email: string;
  name: string;
}): Promise<string> {
  const payload: UserSessionPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return token;
}

/**
 * Get user session payload
 */
export async function getUserSession(): Promise<UserSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    // Check if this is a user session (has userId)
    if (payload.userId) {
      return payload as unknown as UserSessionPayload;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Get current user from session
 */
export async function getUser() {
  const session = await getUserSession();
  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  return user;
}

/**
 * Get user with their connected stores
 */
export async function getUserWithStores() {
  const session = await getUserSession();
  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      stores: true,
      marketplaceConns: true,
      subscription: true,
    },
  });

  return user;
}

/**
 * Get user with marketplace connections
 */
export async function getUserWithMarketplaces() {
  const session = await getUserSession();
  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      marketplaceConns: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return user;
}

/**
 * Require user authentication
 */
export async function requireUser() {
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

// ============================================
// STORE-BASED AUTH (Legacy - for backward compatibility)
// ============================================

export interface SessionPayload {
  storeId: string;
  domain: string;
  [key: string]: unknown;
}

export async function createSession(payload: SessionPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return token;
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getStore() {
  // First try user session
  const userSession = await getUserSession();
  if (userSession) {
    // User is logged in, get their most recently created store with completed sync
    // Using orderBy ensures deterministic results when multiple stores exist
    const store = await prisma.store.findFirst({
      where: {
        userId: userSession.userId,
        syncStatus: "COMPLETED",
      },
      orderBy: { createdAt: "desc" },
    });
    return store;
  }

  // Fall back to legacy store session
  const session = await getSession();
  if (!session?.storeId) {
    return null;
  }

  const store = await prisma.store.findUnique({
    where: { id: session.storeId },
  });

  return store;
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function requireAuth() {
  const store = await getStore();
  if (!store) {
    throw new Error("Unauthorized");
  }
  return store;
}
