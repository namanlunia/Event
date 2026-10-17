import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M+";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K+";
  }
  return num.toString();
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function generateCertId(role: string, index: number): string {
  const prefix = role.slice(0, 1).toUpperCase();
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + (index % 9000));
  return `OWOC-${year}-${prefix}-${rand}`;
}
