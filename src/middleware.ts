import { NextRequest, NextResponse } from "next/server";

interface Route {
  ref: string;
  redirect: boolean;
  type: "public" | "private";
}

const routes: Route[] = [
  { ref: "/auth", redirect: true, type: "public" },
  { ref: "/", redirect: false, type: "public" },
  { ref: "/about", redirect: false, type: "public" },
  { ref: "/contact", redirect: false, type: "public" },
  { ref: "/home", redirect: true, type: "private" },
  { ref: "/dashboard", redirect: true, type: "private" },
  { ref: "/profile", redirect: true, type: "private" },
  { ref: "/settings", redirect: true, type: "private" },
];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const route = routes
    .sort((a, b) => b.ref.length - a.ref.length) 
    .find((route) => path === route.ref || path.startsWith(`${route.ref}/`));

  const token = req.cookies.get("token")?.value || null;
  const isLoggedIn = !!token;

  if (!route) {
    return NextResponse.next();
  }

  const { type, redirect } = route;

  if (type === "private" && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (isLoggedIn && type === "public" && redirect) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}
