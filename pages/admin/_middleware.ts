// pages/admin/_middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const adminCookie = req.cookies.get("admin_user");
  const url = req.nextUrl.clone();

  // If not logged in and trying to access admin page other than /admin/login
  if (!adminCookie && !url.pathname.startsWith("/admin/login")) {
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
