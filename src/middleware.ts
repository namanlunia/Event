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

  // 2. Resolve user's active role
  const isDev = process.env.NODE_ENV === "development";
  const devRole = isDev
    ? request.cookies.get("DEV_ASSUME_ROLE")?.value || process.env.DEV_ASSUME_ROLE
    : undefined;
  const userRole = devRole || request.cookies.get("owoc_user_role")?.value || "contributor";

  const roleRouteMap: Record<string, string> = {
    super_admin: "/dashboard/admin",
    project_admin: "/dashboard/project-admin",
    mentor: "/dashboard/mentor",
    contributor: "/dashboard/contributor",
    ambassador: "/dashboard/ambassador",
  };

  // 3. Root /dashboard redirect to assigned role dashboard
  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    const targetUrl = request.nextUrl.clone();
    targetUrl.pathname = roleRouteMap[userRole] || "/dashboard/contributor";
    return NextResponse.redirect(targetUrl, 307);
  }

  // 4. Session authentication guard when DEMO_MODE is disabled
  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";
  if (!isDemo && pathname.startsWith("/dashboard")) {
    if (pathname === "/dashboard/forbidden") {
      return NextResponse.next();
    }

    const authToken =
      request.cookies.get("sb-access-token")?.value ||
      request.cookies.get("supabase-auth-token")?.value ||
      request.cookies.get("owoc_session")?.value ||
      (isDev && devRole);

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
