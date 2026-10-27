import { test, expect } from "@playwright/test";
import {
  SEASON_LABEL,
  SEASON_SHORT,
  REGISTRATION_OPENS,
  REGISTRATION_CLOSES,
  EVENT_START,
  EVENT_END,
  PHASES,
  CODING_PHASE,
  CODING_DAYS,
  EVENT_DAYS,
  EVENT_MONTH_LABEL,
  formatDuration,
  formatDateRange,
  getRegistrationStatus,
  getPhaseStatus,
  getCurrentPhase,
  getHeroStatusBadge,
  getHeroCountdown,
  getCodingPeriodProgress,
  getPrimaryCta,
  isBeforeCodingPeriod,
} from "../src/lib/season";

test.describe("OWOC 2027 Schedule & Date Math", () => {
  test("Configuration constants match finalized schedule", () => {
    expect(SEASON_LABEL).toBe("2027");
    expect(SEASON_SHORT).toBe("OWOC 2027");
    expect(REGISTRATION_OPENS).toBe("2026-10-28");
    expect(REGISTRATION_CLOSES).toBe("2027-01-31");
    expect(EVENT_START).toBe("2027-01-01");
    expect(EVENT_END).toBe("2027-01-31");
    expect(EVENT_DAYS).toBe(31);
    expect(CODING_DAYS).toBe(23);
    expect(EVENT_MONTH_LABEL).toBe("January 2027");
  });

  test("5 Phases are defined correctly", () => {
    expect(PHASES).toHaveLength(5);
    expect(PHASES[0].startDate).toBe("2026-10-28");
    expect(PHASES[0].endDate).toBe("2026-12-31");

    expect(PHASES[1].startDate).toBe("2027-01-01");
    expect(PHASES[1].endDate).toBe("2027-01-03");

    expect(PHASES[2].startDate).toBe("2027-01-04");
    expect(PHASES[2].endDate).toBe("2027-01-26");

    expect(PHASES[3].startDate).toBe("2027-01-27");
    expect(PHASES[3].endDate).toBe("2027-01-30");

    expect(PHASES[4].startDate).toBe("2027-01-31");
    expect(PHASES[4].endDate).toBe("2027-01-31");
  });

  test("formatDuration correctly formats days and weeks", () => {
    expect(formatDuration(23, true)).toBe("23-day");
    expect(formatDuration(23, false)).toBe("23 days");
    expect(formatDuration(7, true)).toBe("1-week");
    expect(formatDuration(14, false)).toBe("2 weeks");
  });

  test("formatDateRange formats dates cleanly", () => {
    expect(formatDateRange(PHASES[0])).toBe("Oct 28 – Dec 31, 2026");
    expect(formatDateRange(PHASES[1])).toBe("Jan 1 – 3, 2027");
    expect(formatDateRange(PHASES[2])).toBe("Jan 4 – 26, 2027");
    expect(formatDateRange(PHASES[3])).toBe("Jan 27 – 30, 2027");
    expect(formatDateRange(PHASES[4])).toBe("Jan 31, 2027");
  });

  test("Mock Date: 2026-10-20 (Before Registration)", () => {
    const d = new Date("2026-10-20T12:00:00+05:30");
    expect(getRegistrationStatus(d)).toBe("upcoming");
    expect(getHeroStatusBadge(d).text).toBe("Registration opens Oct 28");
    expect(getHeroStatusBadge(d).isUpcoming).toBe(true);
    expect(getHeroCountdown(d)).toBe("Event starts in 73 days");
    const cta = getPrimaryCta(d);
    expect(cta.disabled).toBe(true);
    expect(cta.text).toBe("Registration opens Oct 28");
    expect(isBeforeCodingPeriod(d)).toBe(true);
  });

  test("Mock Date: 2026-10-28 (Registration Opens)", () => {
    const d = new Date("2026-10-28T09:00:00+05:30");
    expect(getRegistrationStatus(d)).toBe("open");
    expect(getHeroStatusBadge(d).text).toBe("Registrations Open");
    expect(getCurrentPhase(d)?.id).toBe(1);
    const cta = getPrimaryCta(d);
    expect(cta.disabled).toBe(false);
    expect(cta.text).toBe("Register Now — Free");
  });

  test("Mock Date: 2027-01-01 (Event Start & Community Bonding)", () => {
    const d = new Date("2027-01-01T10:00:00+05:30");
    expect(getRegistrationStatus(d)).toBe("open");
    expect(getCurrentPhase(d)?.id).toBe(2);
    expect(getHeroStatusBadge(d).text).toBe("Community Bonding");
    expect(getHeroCountdown(d)).toBe("Ends in 30 days");
    expect(isBeforeCodingPeriod(d)).toBe(true);
  });

  test("Mock Date: 2027-01-04 (Coding Period Begins)", () => {
    const d = new Date("2027-01-04T10:00:00+05:30");
    expect(getCurrentPhase(d)?.id).toBe(3);
    expect(getHeroStatusBadge(d).text).toBe("Coding Sprint in Progress");
    const cta = getPrimaryCta(d);
    expect(cta.text).toBe("Start Contributing");
    expect(cta.href).toBe("/projects");
    expect(isBeforeCodingPeriod(d)).toBe(false);
    expect(getCodingPeriodProgress(d).text).toBe("Week 1 of 4");
  });

  test("Mock Date: 2027-01-27 (Code Freeze & Evaluation)", () => {
    const d = new Date("2027-01-27T10:00:00+05:30");
    expect(getCurrentPhase(d)?.id).toBe(4);
    expect(getHeroStatusBadge(d).text).toBe("Evaluation Underway");
    const cta = getPrimaryCta(d);
    expect(cta.text).toBe("View Leaderboard");
    expect(getCodingPeriodProgress(d).text).toBe("Coding period complete");
  });

  test("Mock Date: 2027-01-31 (Results & Last Day of Registration/Event)", () => {
    const d = new Date("2027-01-31T15:00:00+05:30");
    expect(getRegistrationStatus(d)).toBe("open");
    expect(getCurrentPhase(d)?.id).toBe(5);
    expect(getHeroStatusBadge(d).text).toBe("Results Announced");
    expect(getHeroCountdown(d)).toBe("Event ends today");
  });

  test("Mock Date: 2027-02-01 (After Program Concludes)", () => {
    const d = new Date("2027-02-01T10:00:00+05:30");
    expect(getRegistrationStatus(d)).toBe("closed");
    expect(getCurrentPhase(d)).toBeNull();
    expect(getHeroStatusBadge(d).text).toBe("Results Announced");
    expect(getHeroCountdown(d)).toBe("Event concluded");
  });
});
