import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const maintenance = process.env.MAINTENANCE_MODE === "true";
  const { pathname } = request.nextUrl;

  // Ne pas rediriger si déjà sur /maintenance
  if (pathname.startsWith("/maintenance")) {
    return NextResponse.next();
  }

  // Ne pas bloquer les assets et API internes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (maintenance) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
