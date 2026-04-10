import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string): string {
  const n = typeof amount === "string" ? parseFloat(amount) : amount;
  if (Number.isNaN(n)) return "₦0";
  const isWhole = Math.abs(n - Math.round(n)) < 0.001;
  return `₦${n.toLocaleString("en-NG", {
    maximumFractionDigits: isWhole ? 0 : 2,
    minimumFractionDigits: 0,
  })}`;
}

export function formatDate(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  return d.toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? "there";
}
