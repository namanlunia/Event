"use client";

/**
 * Recharts-backed dashboard chart components.
 *
 * This module is loaded lazily (via `next/dynamic`) from the dashboard pages so
 * that the recharts bundle (~100KB+ gzipped) is only downloaded once a
 * dashboard route actually hydrates, and only after first paint.
 */

import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export interface DateCountPoint {
  date: string;
  count: number;
}

export interface RoleCountPoint {
  role: string;
  count: number;
}

export interface DomainCountPoint {
  domain: string;
  count: number;
}

export interface WeekPointsPoint {
  week: string;
  pointsGiven: number;
}

export interface WeekProgressPoint {
  week: string;
  points: number;
}

export interface DatePRPoint {
  date: string;
  prs: number;
}

const sharedTooltipStyle = {
  allowEscapeViewBox: { x: false, y: false },
  wrapperStyle: { zIndex: 50, outline: "none" },
} as const;

/** Super Admin: Cumulative Registrations Growth (Area) */
export function RegistrationGrowthChart({ data }: { data: DateCountPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
        <YAxis width={40} stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
        <Tooltip
          {...sharedTooltipStyle}
          contentStyle={{ backgroundColor: "#0B0B0D", borderRadius: "10px" }}
        />
        <Area type="monotone" dataKey="count" stroke="#EF4444" fill="url(#regGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/** Super Admin: Stakeholders by Role Distribution (Bar) */
export function RoleDistributionChart({ data }: { data: RoleCountPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
        <XAxis dataKey="role" stroke="#666" tick={{ fill: "#888", fontSize: 10 }} />
        <YAxis width={40} stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
        <Tooltip
          {...sharedTooltipStyle}
          contentStyle={{ backgroundColor: "#0B0B0D", borderRadius: "10px" }}
        />
        <Bar dataKey="count" fill="#EF4444" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Super Admin: Projects by Domain (Bar) */
export function DomainBreakdownChart({ data }: { data: DomainCountPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
        <XAxis dataKey="domain" stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
        <YAxis width={40} stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
        <Tooltip
          {...sharedTooltipStyle}
          contentStyle={{ backgroundColor: "#0B0B0D", borderRadius: "10px" }}
        />
        <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Mentor: Mentee Review Velocity (Area) */
export function MenteeVelocityChart({ data }: { data: WeekPointsPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="mentorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="week" stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
        <YAxis width={40} stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
        <Tooltip
          {...sharedTooltipStyle}
          contentStyle={{
            backgroundColor: "#0B0B0D",
            borderColor: "rgba(255,255,255,0.1)",
            borderRadius: "12px",
            fontSize: "12px",
          }}
        />
        <Area
          type="monotone"
          dataKey="pointsGiven"
          name="Points Awarded"
          stroke="#EF4444"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#mentorGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/** Contributor: Sprint Contribution Trajectory (Area) */
export function SprintPerformanceChart({ data }: { data: WeekProgressPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#E11D2E" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#E11D2E" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="week" stroke="#71717A" fontSize={10} tickLine={false} />
        <YAxis width={40} stroke="#71717A" fontSize={10} tickLine={false} />
        <Tooltip
          {...sharedTooltipStyle}
          contentStyle={{
            backgroundColor: "#111114",
            border: "1px solid rgba(225,29,46,0.4)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Area
          type="monotone"
          dataKey="points"
          stroke="#FF3B4A"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#redGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/** Project Admin: Pull Request Velocity (Area) */
export function PRActivityChart({ data }: { data: DatePRPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="prGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
        <YAxis width={40} stroke="#666" tick={{ fill: "#888", fontSize: 11 }} />
        <Tooltip
          {...sharedTooltipStyle}
          contentStyle={{
            backgroundColor: "#0B0B0D",
            borderColor: "rgba(255,255,255,0.1)",
            borderRadius: "12px",
            fontSize: "12px",
          }}
        />
        <Area
          type="monotone"
          dataKey="prs"
          stroke="#EF4444"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#prGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
