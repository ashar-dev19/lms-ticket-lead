import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { TicketStatus, Priority, TicketType } from "@prisma/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatTime(date: Date | string) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
}

export function generateTicketNo(): string {
  const year = new Date().getFullYear()
  const rand = Math.floor(Math.random() * 9000) + 1000
  return `${year}-CS${rand}`
}

export const STATUS_CONFIG: Record<TicketStatus, { label: string; color: string; dot: string }> = {
  NEW:      { label: "New",      color: "bg-blue-100 text-blue-700",   dot: "bg-blue-500" },
  ON_GOING: { label: "On-Going", color: "bg-orange-100 text-orange-700", dot: "bg-orange-400" },
  PENDING:  { label: "Pending",  color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-400" },
  RESOLVED: { label: "Resolved", color: "bg-green-100 text-green-700",  dot: "bg-green-500" },
}

export const PRIORITY_CONFIG: Record<Priority, { label: string; color: string }> = {
  LOW:    { label: "Low",    color: "bg-gray-100 text-gray-600" },
  MEDIUM: { label: "Medium", color: "bg-blue-100 text-blue-700" },
  HIGH:   { label: "High",   color: "bg-red-100 text-red-600" },
}

export const TICKET_TYPE_LABELS: Record<TicketType, string> = {
  TECHNICAL_ISSUE:  "Technical Issue",
  CONTENT_QUESTION: "Content Question",
  AI_TUTOR_ISSUE:   "AI Tutor Issue",
  ACCOUNT_ISSUE:    "Account Issue",
  OTHER:            "Other",
}
