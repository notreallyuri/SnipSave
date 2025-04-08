import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const token = "mock-token-123";

  const res = NextResponse.json({ success: true });

  res.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
