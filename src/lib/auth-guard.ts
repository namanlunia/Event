import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { StandardRole } from "@/types";
import { SITE_CONFIG } from "@/lib/site-config";

export async function requireRole(allowedRoles: StandardRole[]) {
  // When in demo mode, role simulation and previewing is handled client-side
  if (SITE_CONFIG.DEMO_MODE) {
    return;
  }

  const cookieStore = cookies();
  const token =
    cookieStore.get("sb-access-token")?.value ||
    cookieStore.get("supabase-auth-token")?.value ||
    cookieStore.get("owoc_session")?.value;

  if (!token) {
    redirect("/login");
  }

  const userRole = cookieStore.get("owoc_user_role")?.value as StandardRole | undefined;
  if (userRole && !allowedRoles.includes(userRole) && userRole !== "super_admin") {
    redirect("/dashboard/forbidden");
  }
}
