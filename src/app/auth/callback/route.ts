import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/dashboard";

  if (!isSupabaseConfigured() || !code) {
    return NextResponse.redirect(`${origin}/login?error=auth_not_configured`);
  }

  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error || !data.user) {
      console.error("Auth exchange error:", error);
      return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }

    const user = data.user;
    const githubHandle =
      user.user_metadata?.user_name ||
      user.user_metadata?.preferred_username ||
      user.email?.split("@")[0] ||
      "contributor";
    const fullName = user.user_metadata?.full_name || user.user_metadata?.name || githubHandle;
    const avatarUrl = user.user_metadata?.avatar_url || "";

    // Fetch or create profile with default role 'contributor'
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    let userRole = profile?.role || "contributor";

    if (!profile) {
      await supabase.from("profiles").insert({
        id: user.id,
        email: user.email,
        full_name: fullName,
        github_handle: githubHandle,
        avatar_url: avatarUrl,
        role: "contributor",
      });
      userRole = "contributor";
    }

    const roleRouteMap: Record<string, string> = {
      super_admin: "/dashboard/admin",
      project_admin: "/dashboard/project-admin",
      mentor: "/dashboard/mentor",
      contributor: "/dashboard/contributor",
      ambassador: "/dashboard/ambassador",
    };

    const targetDashboard = roleRouteMap[userRole] || "/dashboard/contributor";
    const redirectUrl = next.startsWith("/dashboard") ? next : targetDashboard;

    const response = NextResponse.redirect(new URL(redirectUrl, origin));
    response.cookies.set("owoc_user_role", userRole, { path: "/", httpOnly: false });
    response.cookies.set("owoc_user_id", user.id, { path: "/", httpOnly: true });
    response.cookies.set("owoc_user_email", user.email || "", { path: "/", httpOnly: false });
    response.cookies.set("owoc_user_name", fullName, { path: "/", httpOnly: false });
    response.cookies.set("owoc_user_github", githubHandle, { path: "/", httpOnly: false });

    return response;
  } catch (err) {
    console.error("OAuth callback unexpected exception:", err);
    return NextResponse.redirect(`${origin}/login?error=callback_error`);
  }
}
