"use client";

import { useState, useEffect } from "react";
import {
  Project,
  PullRequest,
  UserRole,
} from "@/types";
import {
  MOCK_PROJECTS,
  MOCK_PRS,
} from "@/lib/demo-data";
import { SITE_CONFIG } from "@/lib/site-config";

export interface DemoPersona {
  role: UserRole;
  title: string;
  name: string;
  email: string;
  avatar: string;
  dashboardUrl: string;
  badge: string;
}

export const DEMO_PERSONAS: DemoPersona[] = [
  {
    role: "contributor",
    title: "Student Contributor",
    name: "Sample Contributor",
    email: "contributor@example.com",
    avatar: "",
    dashboardUrl: "/dashboard/contributor",
    badge: "Sample Contributor",
  },
  {
    role: "maintainer",
    title: "Project Maintainer",
    name: "Sample Maintainer",
    email: "maintainer@example.com",
    avatar: "",
    dashboardUrl: "/dashboard/maintainer",
    badge: "Sample Maintainer",
  },
  {
    role: "mentor",
    title: "Technical Mentor",
    name: "Sample Mentor",
    email: "mentor@example.com",
    avatar: "",
    dashboardUrl: "/dashboard/mentor",
    badge: "Sample Mentor",
  },
  {
    role: "ambassador",
    title: "Campus Ambassador",
    name: "Sample Ambassador",
    email: "ambassador@example.com",
    avatar: "",
    dashboardUrl: "/dashboard/ambassador",
    badge: "Sample Ambassador",
  },
  {
    role: "admin",
    title: "Super Admin",
    name: "OWOC Admin",
    email: "admin@example.com",
    avatar: "",
    dashboardUrl: "/dashboard/admin",
    badge: "Program Organizer",
  },
];

const STORAGE_KEY_ROLE = "owoc_active_role";
const STORAGE_KEY_PROJECTS = "owoc_projects_data";
const STORAGE_KEY_PRS = "owoc_prs_data";

export function useAppStore() {
  const [currentPersona, setCurrentPersona] = useState<DemoPersona>(DEMO_PERSONAS[0]);
  const [projects, setProjects] = useState<Project[]>(SITE_CONFIG.DEMO_MODE ? MOCK_PROJECTS : []);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>(SITE_CONFIG.DEMO_MODE ? MOCK_PRS : []);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedRole = localStorage.getItem(STORAGE_KEY_ROLE);
      if (savedRole) {
        const found = DEMO_PERSONAS.find((p) => p.role === savedRole);
        if (found) setCurrentPersona(found);
      }

      if (SITE_CONFIG.DEMO_MODE) {
        const savedProjects = localStorage.getItem(STORAGE_KEY_PROJECTS);
        if (savedProjects) {
          setProjects(JSON.parse(savedProjects));
        }

        const savedPrs = localStorage.getItem(STORAGE_KEY_PRS);
        if (savedPrs) {
          setPullRequests(JSON.parse(savedPrs));
        }
      }
    } catch (e) {
      console.warn("Storage hydration notice:", e);
    }
    setIsHydrated(true);
  }, []);

  const switchRole = (role: UserRole) => {
    const persona = DEMO_PERSONAS.find((p) => p.role === role) || DEMO_PERSONAS[0];
    setCurrentPersona(persona);
    try {
      localStorage.setItem(STORAGE_KEY_ROLE, role);
    } catch {}
  };

  const approveProject = (projectId: string) => {
    const updated = projects.map((p) =>
      p.id === projectId ? { ...p, status: "approved" as const } : p
    );
    setProjects(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updated));
    } catch {}
  };

  const rejectProject = (projectId: string) => {
    const updated = projects.map((p) =>
      p.id === projectId ? { ...p, status: "rejected" as const } : p
    );
    setProjects(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updated));
    } catch {}
  };

  const mergePR = (prId: string, qualityBonus: number = 0) => {
    const updated = pullRequests.map((pr) => {
      if (pr.id === prId) {
        return {
          ...pr,
          status: "merged" as const,
          quality_bonus: qualityBonus,
          merged_at: new Date().toISOString(),
        };
      }
      return pr;
    });
    setPullRequests(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PRS, JSON.stringify(updated));
    } catch {}
  };

  return {
    currentPersona,
    switchRole,
    projects,
    setProjects,
    approveProject,
    rejectProject,
    pullRequests,
    mergePR,
    isHydrated,
  };
}
