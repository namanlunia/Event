"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MaintainerRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/project-admin");
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-red-primary border-t-transparent animate-spin" />
    </div>
  );
}
