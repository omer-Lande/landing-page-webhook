import { timingSafeEqual } from "crypto";

import { NextResponse } from "next/server";

import { getClientIp, isRateLimited } from "@repo/core/rate-limit";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/session";

const LOGIN_ATTEMPT_LIMIT = 5;
const LOGIN_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function POST(request: Request) {
  if (isRateLimited(`login:${getClientIp(request)}`, LOGIN_ATTEMPT_LIMIT, LOGIN_WINDOW_MS)) {
    return NextResponse.json(
      { error: "יותר מדי ניסיונות התחברות. נסו שוב בעוד כמה דקות." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    console.error("Missing ADMIN_USERNAME/ADMIN_PASSWORD environment variables.");
    return NextResponse.json({ error: "המערכת אינה מוגדרת כראוי." }, { status: 500 });
  }

  // Evaluate both comparisons unconditionally (no &&  short-circuit) so a
  // wrong username can't be distinguished from a wrong password by timing.
  const isUsernameValid = safeEqual(username, expectedUsername);
  const isPasswordValid = safeEqual(password, expectedPassword);

  if (!isUsernameValid || !isPasswordValid) {
    return NextResponse.json({ error: "שם משתמש או סיסמה שגויים." }, { status: 401 });
  }

  const token = await createSessionToken(username);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}
