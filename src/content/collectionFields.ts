import type { CollectionEntry } from "@andishi/runtime";

/** A text field of a collection entry. */
export const textOf = (entry: CollectionEntry, key: string): string => {
  const value = entry.data[key];
  return typeof value === "string" ? value : value == null ? "" : String(value);
};

/** A list field (an array of texts); older "one per line" text is read too. */
export function listOf(entry: CollectionEntry, key: string): string[] {
  const value = entry.data[key];
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  return textOf(entry, key).split("\n").map((line) => line.trim()).filter(Boolean);
}

/** A repeating group field: its items, each an object of the group's fields. */
export function groupOf<T>(entry: CollectionEntry, key: string): T[] {
  const value = entry.data[key];
  return Array.isArray(value) ? (value.filter((item) => typeof item === "object" && item !== null) as T[]) : [];
}
