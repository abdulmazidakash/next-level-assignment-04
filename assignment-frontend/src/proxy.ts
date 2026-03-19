import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { Roles } from "./constants/roles";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let role: string;

  try {
    const decoded: any = jwtDecode(token);
    role = decoded?.role;
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔐 ADMIN
  if (pathname.startsWith("/admin-dashboard")) {
    if (role !== Roles.admin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 🍽 PROVIDER
  if (pathname.startsWith("/provider-dashboard")) {
    if (role !== Roles.provider) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 👤 CUSTOMER
  if (pathname.startsWith("/dashboard")) {
    if (role !== Roles.customer) {
      if (role === Roles.admin) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
      }
      if (role === Roles.provider) {
        return NextResponse.redirect(new URL("/provider-dashboard", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/provider-dashboard",
    "/provider-dashboard/:path*",
  ],
};