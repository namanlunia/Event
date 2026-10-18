import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Maintainer alias redirect to Project Admin
  if (pathname === "/dashboard/maintainer" || pathname.startsWith("/dashboard/maintainer/")) {
    const targetUrl = request.nextUrl.clone();
    targetUrl.pathname = pathname.replace("/dashboard/maintainer", "/dashboard/project-admin");
    return NextResponse.redirect(targetUrl, 307);
  }

  // 2. Production session guard when DEMO_MODE is false
  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

  if (!isDemo && pathname.startsWith("/dashboard")) {
    // Exclude the login and forbidden pages
    if (pathname === "/dashboard/forbidden") {
      return NextResponse.next();
    }

    // Check for Supabase / custom auth tokens
    const authToken =
      request.cookies.get("sb-access-token")?.value ||
      request.cookies.get("supabase-auth-token")?.value ||
      request.cookies.get("owoc_session")?.value;

    if (!authToken) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("returnTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
