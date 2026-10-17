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
} from "@/data/mockDatabase";

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
    name: "Aarav Patel",
    email: "aarav.patel@iitd.ac.in",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
    dashboardUrl: "/dashboard/contributor",
    badge: "Rank #1 Contributor",
  },
  {
    role: "maintainer",
    title: "Project Maintainer",
    name: "Dr. Aris Thorne",
    email: "aris@omnikon.org",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    dashboardUrl: "/dashboard/maintainer",
    badge: "WinterVision Lead",
  },
  {
    role: "mentor",
    title: "Technical Mentor",
    name: "Elena Rostova",
    email: "elena@omnikon.org",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    dashboardUrl: "/dashboard/mentor",
    badge: "CUDA Track Mentor",
  },
  {
    role: "ambassador",
    title: "Campus Ambassador",
    name: "Kabir Sen",
    email: "kabir.sen@iitb.ac.in",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    dashboardUrl: "/dashboard/ambassador",
    badge: "Master Ambassador (IITB)",
  },
  {
    role: "admin",
    title: "Super Admin (OWOC Lead)",
    name: "Devansh Rastogi",
    email: "admin@owoc.omnikon.org",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    dashboardUrl: "/dashboard/admin",
    badge: "Program Director",
  },
];

const STORAGE_KEY_ROLE = "owoc_active_role";
const STORAGE_KEY_PROJECTS = "owoc_projects_data";
const STORAGE_KEY_PRS = "owoc_prs_data";

export function useAppStore() {
  const [currentPersona, setCurrentPersona] = useState<DemoPersona>(DEMO_PERSONAS[0]);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>(MOCK_PRS);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedRole = localStorage.getItem(STORAGE_KEY_ROLE);
      if (savedRole) {
        const found = DEMO_PERSONAS.find((p) => p.role === savedRole);
        if (found) setCurrentPersona(found);
      }

      const savedProjects = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      }

      const savedPrs = localStorage.getItem(STORAGE_KEY_PRS);
      if (savedPrs) {
        setPullRequests(JSON.parse(savedPrs));
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
