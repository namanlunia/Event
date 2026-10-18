"use client";

import React, { useEffect, useState } from "react";
import { StandardRole } from "@/types";
import { useAppStore, normalizeRole } from "@/lib/store";
import ForbiddenState from "./ForbiddenState";

interface RoleGuardProps {
  allowedRoles: (StandardRole | string)[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function RoleGuard({
  allowedRoles,
  children,
  fallback,
}: RoleGuardProps) {
  const { currentPersona, isHydrated } = useAppStore();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isHydrated) return;

    const normalizedAllowed = allowedRoles.map(normalizeRole);
    const userRole = normalizeRole(currentPersona.role);

    // Check if user has direct role or role inheritance
    // super_admin has access to all dashboards
    const hasAccess =
      userRole === "super_admin" ||
      normalizedAllowed.includes(userRole) ||
      (currentPersona.allowedRoles &&
        currentPersona.allowedRoles.some((r) => normalizedAllowed.includes(r)));

    setAuthorized(hasAccess);
  }, [isHydrated, currentPersona, allowedRoles]);

  if (!isHydrated || authorized === null) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-red-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!authorized) {
    if (fallback) return <>{fallback}</>;
    return (
      <ForbiddenState
        requiredRoles={allowedRoles}
        currentRole={currentPersona.role}
      />
    );
  }

  return <>{children}</>;
}
