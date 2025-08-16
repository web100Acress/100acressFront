import clsx, { type ClassValue } from "clsx"; // ✅ default import
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
