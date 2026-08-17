import { timingSafeEqual } from "crypto";

import { NextResponse } from "next/server";

import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/session";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    console.error("Missing ADMIN_USERNAME/ADMIN_PASSWORD environment variables.");
    return NextResponse.json({ error: "המערכת אינה מוגדרת כראוי." }, { status: 500 });
  }

  const isValid =
    safeEqual(username, expectedUsername) && safeEqual(password, expectedPassword);

  if (!isValid) {
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
