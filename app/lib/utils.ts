import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("es-ES", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export const getSearchParams = (urlString: string) => {
  const url = new URL(urlString);
  return {
    accountEmail: url.searchParams.get("accountEmail")?.toString() || "",
    q: url.searchParams.get("q")?.toLowerCase() || "",
    deleted: url.searchParams.get("deleted") === "true",
  };
};

export const getParamsBySearchParams = (searchParams: URLSearchParams) => {
  return {
    accountEmail: searchParams.get("accountEmail"),
    q: searchParams.get("q"),
    deleted: searchParams.get("deleted")
  };
};

export const buildSearchParams = (params: Record<string, string | null>) => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) searchParams.set(key, value);
  }
  return searchParams.toString();
};


