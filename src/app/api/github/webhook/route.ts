import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const event = req.headers.get("x-github-event");

    // Live GitHub webhook handling logic:
    // When a pull_request event is fired with action === 'closed' and pull_request.merged === true
    if (event === "pull_request" && payload.action === "closed" && payload.pull_request?.merged) {
      const prNumber = payload.pull_request.number;
      const repoName = payload.repository.name;
      const contributorGithub = payload.pull_request.user.login;
      const prLabels = (payload.pull_request.labels || []).map((l: { name: string }) => l.name);

      // Determine difficulty from labels
      let points = 10;
      if (prLabels.includes("difficulty: hard") || prLabels.includes("hard")) {
        points = 50;
      } else if (prLabels.includes("difficulty: medium") || prLabels.includes("medium")) {
        points = 25;
      }

      // TODO for production deployment:
      // 1. Authenticate secret signature via crypto HMAC sha256
      // 2. Insert into public.pull_requests & public.points_ledger via Supabase client
      // 3. Increment streak and send notification

      return NextResponse.json({
        success: true,
        message: `Processed PR #${prNumber} on ${repoName} for ${contributorGithub}: Awarded ${points} points.`,
      });
    }

    return NextResponse.json({
      received: true,
      message: "Webhook acknowledged (no merge action required).",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Webhook parsing error", details: String(error) },
      { status: 400 }
    );
  }
}
