import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { StandardRole } from "@/types";
import { normalizeRole } from "@/lib/personas";

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  githubHandle?: string;
  avatarUrl?: string;
  role: StandardRole;
}

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  const cookieStore = cookies();

  // In development mode, allow DEV_ASSUME_ROLE override via cookie or env
  if (process.env.NODE_ENV === "development") {
    const devRoleCookie = cookieStore.get("DEV_ASSUME_ROLE")?.value;
    const devRoleEnv = process.env.DEV_ASSUME_ROLE;
    const assumedRole = (devRoleCookie || devRoleEnv) as string | undefined;

    if (assumedRole) {
      const normalized = normalizeRole(assumedRole);
      return {
        id: `dev-${normalized}-user`,
        email: `${normalized}@omnikonhub.com`,
        name: `Dev ${normalized.replace("_", " ").toUpperCase()}`,
        githubHandle: "omnikon-dev",
        role: normalized,
      };
    }
  }

  const token =
    cookieStore.get("sb-access-token")?.value ||
    cookieStore.get("supabase-auth-token")?.value ||
    cookieStore.get("owoc_session")?.value;

  if (!token) {
    return null;
  }

  const rawRole = cookieStore.get("owoc_user_role")?.value || "contributor";
  const userRole = normalizeRole(rawRole);
  const email = cookieStore.get("owoc_user_email")?.value || "contributor@omnikonhub.com";
  const name = cookieStore.get("owoc_user_name")?.value || "OWOC Contributor";
  const github = cookieStore.get("owoc_user_github")?.value || "contributor";

  return {
    id: cookieStore.get("owoc_user_id")?.value || "user-session-id",
    email,
    name,
    githubHandle: github,
    role: userRole,
  };
}

export async function requireRole(allowedRoles: StandardRole[]) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!allowedRoles.includes(user.role) && user.role !== "super_admin") {
    redirect("/dashboard/forbidden");
  }

  return user;
}
