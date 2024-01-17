import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { franc } from "franc";
import { ReactNode } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function detectLang(node: ReactNode) {
  const text =
    typeof node === "string"
      ? node
      : Array.isArray(node)
      ? node.find((element) => typeof element === "string")
      : undefined;
  return text ? franc(text, { minLength: 3, only: ["eng", "jpn"] }) : "eng";
}
