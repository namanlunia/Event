/**
 * Single Source of Truth for OWOC 2026 Season Configuration.
 * 
 * The official event runs for the whole month of December 2026 (Dec 1 to Dec 31, 2026).
 * All dates, season labels, phase schedules, and duration phrases across the
 * entire application derive strictly from this file.
 */

export interface Phase {
  id: number;
  name: string;
  startDate: string; // ISO format: YYYY-MM-DD
  endDate: string;   // ISO format: YYYY-MM-DD
  description: string;
}

// Season Identity (Entire event takes place in 2026; do NOT use 2026–27)
export const SEASON_LABEL = "2026";
export const SEASON_SHORT = "OWOC 2026";

// Official Event Window (Entire month of December 2026)
export const EVENT_START = "2026-12-01";
export const EVENT_END = "2026-12-31";

// Helper for inclusive day counting between two ISO dates
function getInclusiveDays(startIso: string, endIso: string): number {
  const start = new Date(`${startIso}T00:00:00Z`).getTime();
  const end = new Date(`${endIso}T00:00:00Z`).getTime();
  return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
}

// Computed copyright year
export const COPYRIGHT_YEAR = new Date().getFullYear();

// Derived event metrics
export const EVENT_DAYS = getInclusiveDays(EVENT_START, EVENT_END); // 31 days

// Formatted month label: "December 2026"
export const EVENT_MONTH_LABEL = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${EVENT_START}T00:00:00Z`));

// Format duration: returns "N weeks" when length is a whole number of weeks, otherwise "N days"
// In adjective form: returns "N-week" (or "1-week") / "N-day" (e.g. "23-day", never a rounded "3-week")
export function formatDuration(days: number, adjective: boolean = true): string {
  if (days % 7 === 0) {
    const weeks = days / 7;
    if (adjective) {
      return weeks === 1 ? "1-week" : `${weeks}-week`;
    }
    return weeks === 1 ? "1 week" : `${weeks} weeks`;
  }
  if (adjective) {
    return `${days}-day`;
  }
  return days === 1 ? "1 day" : `${days} days`;
}

// Program Phases (Single place for phase schedule)
// 1. Registration & Project Onboarding: Oct 20, 2026 to Nov 30, 2026 (pre-event)
// 2. Community Bonding & AMA Sprints: Dec 1, 2026 to Dec 3, 2026
// 3. Coding Period & Weekly Sprints: Dec 4, 2026 to Dec 26, 2026
// 4. Code Freeze & Evaluation: Dec 27, 2026 to Dec 30, 2026
// 5. Grand Results & Certificate Issuance: Dec 31, 2026
export const PHASES: Phase[] = [
  {
    id: 1,
    name: "Registration & Project Onboarding",
    startDate: "2026-10-20",
    endDate: "2026-11-30",
    description: "Contributor registrations open, repository applications vetted, and mentor onboarding begins.",
  },
  {
    id: 2,
    name: "Community Bonding & AMA Sprints",
    startDate: "2026-12-01",
    endDate: "2026-12-03",
    description: "Contributors join project channels, interact with maintainers, attend open-source clinics, and claim good-first-issues.",
  },
  {
    id: 3,
    name: "Coding Period & Weekly Sprints",
    startDate: "2026-12-04",
    endDate: "2026-12-26",
    description: `Intensive 23-day development period. Contributors solve issues, submit PRs, earn points, and climb the live podium.`,
  },
  {
    id: 4,
    name: "Code Freeze & Evaluation",
    startDate: "2026-12-27",
    endDate: "2026-12-30",
    description: "All pull requests under final mentor review, automated scoring audits, anti-plagiarism checks, and community verification.",
  },
  {
    id: 5,
    name: "Grand Results & Certificate Issuance",
    startDate: "2026-12-31",
    endDate: "2026-12-31",
    description: "Announcement of top podium winners, issuance of official digital certificates, and dispatch of winter swag kits.",
  },
];

// Coding period specific metrics (Phase 3)
export const CODING_PHASE = PHASES[2];
export const CODING_DAYS = getInclusiveDays(CODING_PHASE.startDate, CODING_PHASE.endDate); // 23 days
export const CODING_WEEKS = Math.ceil(CODING_DAYS / 7); // 4 calendar weeks

// Ready-to-use duration phrases
export const DURATION_COPY = {
  hero: `Runs all of ${EVENT_MONTH_LABEL}`,
  short: `${formatDuration(CODING_DAYS)} coding sprint`,
  full: `A month-long program running through ${EVENT_MONTH_LABEL}, with a ${formatDuration(CODING_DAYS)} coding period`,
};

// Backward compatibility duration helpers
export function getProgramDurationWeeks(): number {
  return Math.ceil(EVENT_DAYS / 7);
}

export function getCodingDurationWeeks(): number {
  return CODING_WEEKS;
}

/**
 * Returns phase status relative to a reference date: 'completed' | 'current' | 'upcoming'
 */
export function getPhaseStatus(
  phase: Phase,
  currentDate: Date = new Date()
): "completed" | "current" | "upcoming" {
  const now = currentDate.getTime();
  const start = new Date(`${phase.startDate}T00:00:00`).getTime();
  const end = new Date(`${phase.endDate}T23:59:59`).getTime();

  if (now > end) {
    return "completed";
  }
  if (now >= start && now <= end) {
    return "current";
  }
  return "upcoming";
}

/**
 * Returns the currently active phase or null if before first phase or after last phase.
 */
export function getCurrentPhase(currentDate: Date = new Date()): Phase | null {
  for (const phase of PHASES) {
    if (getPhaseStatus(phase, currentDate) === "current") {
      return phase;
    }
  }
  return null;
}

/**
 * Formats a readable date range for a phase (e.g. "Oct 20 – Nov 30, 2026" or "Dec 31, 2026").
 */
export function formatDateRange(phase: Phase): string {
  const start = new Date(`${phase.startDate}T00:00:00`);
  const end = new Date(`${phase.endDate}T00:00:00`);

  const startMonth = start.toLocaleDateString("en-US", { month: "short" });
  const startDay = start.getDate();
  const startYear = start.getFullYear();

  const endMonth = end.toLocaleDateString("en-US", { month: "short" });
  const endDay = end.getDate();
  const endYear = end.getFullYear();

  if (phase.startDate === phase.endDate) {
    return `${startMonth} ${startDay}, ${startYear}`;
  }

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} – ${endDay}, ${startYear}`;
    }
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${startYear}`;
  }

  return `${startMonth} ${startDay}, ${startYear} – ${endMonth} ${endDay}, ${endYear}`;
}

/**
 * Dynamic hero status badge text based on program phase.
 * "Before the first phase starts, show 'Registration opens {date}'."
 */
export function getHeroStatusBadge(currentDate: Date = new Date()): {
  text: string;
  isUpcoming: boolean;
} {
  const firstPhase = PHASES[0];
  const firstPhaseStart = new Date(`${firstPhase.startDate}T00:00:00`).getTime();
  const now = currentDate.getTime();

  if (now < firstPhaseStart) {
    const formattedStartDate = new Date(`${firstPhase.startDate}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return { text: `Registration opens ${formattedStartDate}`, isUpcoming: true };
  }

  const activePhase = getCurrentPhase(currentDate);
  if (!activePhase) {
    const lastPhaseEnd = new Date(`${PHASES[PHASES.length - 1].endDate}T23:59:59`).getTime();
    if (now > lastPhaseEnd) {
      return { text: "Results Announced", isUpcoming: false };
    }
    return { text: "Evaluation Underway", isUpcoming: false };
  }

  switch (activePhase.id) {
    case 1:
      return { text: "Registrations Open", isUpcoming: false };
    case 2:
      return { text: "Community Bonding", isUpcoming: false };
    case 3:
      return { text: "Coding Sprint in Progress", isUpcoming: false };
    case 4:
      return { text: "Evaluation Underway", isUpcoming: false };
    case 5:
      return { text: "Results Announced", isUpcoming: false };
    default:
      return { text: `${SEASON_SHORT} Active`, isUpcoming: false };
  }
}

/**
 * Helper to compute calendar day difference between an ISO date string (YYYY-MM-DD)
 * and the current date in Asia/Kolkata timezone.
 */
export function getCalendarDaysUntil(targetIso: string, referenceDate: Date = new Date()): number {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const todayStr = formatter.format(referenceDate); // e.g. "2026-10-18"

  const [refYear, refMonth, refDay] = todayStr.split("-").map(Number);
  const [tgtYear, tgtMonth, tgtDay] = targetIso.split("-").map(Number);

  const refUtc = Date.UTC(refYear, refMonth - 1, refDay);
  const tgtUtc = Date.UTC(tgtYear, tgtMonth - 1, tgtDay);

  return Math.round((tgtUtc - refUtc) / (1000 * 60 * 60 * 24));
}

/**
 * Returns number of calendar days until official event start (Dec 1, 2026) using Asia/Kolkata calendar math.
 */
export function daysUntilEventStart(currentDate: Date = new Date()): number {
  return getCalendarDaysUntil(EVENT_START, currentDate);
}

/**
 * Returns number of calendar days until coding period start (Dec 4, 2026) using Asia/Kolkata calendar math.
 */
export function daysUntilCodingStart(currentDate: Date = new Date()): number {
  return getCalendarDaysUntil(CODING_PHASE.startDate, currentDate);
}

/**
 * Countdown helper for Hero section:
 * "Event starts in N days" before December 1, then "Ends in N days" during December.
 */
export function getHeroCountdown(currentDate: Date = new Date()): string {
  const daysLeft = daysUntilEventStart(currentDate);

  if (daysLeft > 0) {
    if (daysLeft === 1) return "Event starts tomorrow";
    return `Event starts in ${daysLeft} days`;
  }

  const daysUntilEnd = getCalendarDaysUntil(EVENT_END, currentDate);
  if (daysUntilEnd >= 0) {
    if (daysUntilEnd === 0) return "Event ends today";
    if (daysUntilEnd === 1) return "Event ends tomorrow";
    return `Ends in ${daysUntilEnd} days`;
  }

  return "Event concluded";
}

/**
 * Calculates current progress of the coding period:
 * "Replace 'Sprint 3/4' text with a calculated 'Week X of Y' for the coding period.
 *  Before it starts show 'Coding starts in N days', and after it ends show 'Coding period complete'."
 */
export function getCodingPeriodProgress(currentDate: Date = new Date()): {
  text: string;
  isUpcoming: boolean;
  isComplete: boolean;
  weekIndex: number;
  totalWeeks: number;
} {
  const daysLeft = daysUntilCodingStart(currentDate);
  const totalWeeks = CODING_WEEKS; // 4 weeks

  if (daysLeft > 0) {
    return {
      text: daysLeft === 1 ? "Coding starts tomorrow" : `Coding starts in ${daysLeft} days`,
      isUpcoming: true,
      isComplete: false,
      weekIndex: 0,
      totalWeeks,
    };
  }

  const now = currentDate.getTime();
  const codingStart = new Date(`${CODING_PHASE.startDate}T00:00:00`).getTime();
  const codingEnd = new Date(`${CODING_PHASE.endDate}T23:59:59`).getTime();

  if (now > codingEnd) {
    return {
      text: "Coding period complete",
      isUpcoming: false,
      isComplete: true,
      weekIndex: totalWeeks,
      totalWeeks,
    };
  }

  // Active coding period
  const elapsedDays = Math.floor((now - codingStart) / (1000 * 60 * 60 * 24));
  const currentWeek = Math.min(Math.floor(elapsedDays / 7) + 1, totalWeeks);

  return {
    text: `Week ${currentWeek} of ${totalWeeks}`,
    isUpcoming: false,
    isComplete: false,
    weekIndex: currentWeek,
    totalWeeks,
  };
}

export interface PrimaryCta {
  text: string;
  href: string;
  disabled: boolean;
  tooltip?: string;
}

/**
 * Returns primary call-to-action configuration based on program timeline.
 * Before Oct 20: returns "Registration opens Oct 20" (disabled).
 * Oct 20 to Dec 3 (pre-coding): returns "Register Now — Free".
 * Dec 4 to Dec 26 (coding sprint): returns "Start Contributing".
 * After coding sprint: returns "View Leaderboard".
 */
export function getPrimaryCta(currentDate: Date = new Date()): PrimaryCta {
  const firstPhaseStart = new Date(`${PHASES[0].startDate}T00:00:00`).getTime();
  const codingStart = new Date(`${CODING_PHASE.startDate}T00:00:00`).getTime();
  const codingEnd = new Date(`${CODING_PHASE.endDate}T23:59:59`).getTime();
  const now = currentDate.getTime();

  if (now < firstPhaseStart) {
    const startFormatted = new Date(`${PHASES[0].startDate}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return {
      text: `Registration opens ${startFormatted}`,
      href: "/register",
      disabled: true,
      tooltip: `Contributor and project registrations open on ${startFormatted}.`,
    };
  }

  if (now < codingStart) {
    return {
      text: "Register Now — Free",
      href: "/register",
      disabled: false,
    };
  }

  if (now <= codingEnd) {
    return {
      text: "Start Contributing",
      href: "/projects",
      disabled: false,
    };
  }

  return {
    text: "View Leaderboard",
    href: "/leaderboard",
    disabled: false,
  };
}

/**
 * Checks if current date is before coding period starts (Dec 4, 2026).
 */
export function isBeforeCodingPeriod(currentDate: Date = new Date()): boolean {
  const codingStart = new Date(`${CODING_PHASE.startDate}T00:00:00`).getTime();
  return currentDate.getTime() < codingStart;
}
