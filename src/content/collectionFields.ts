import type { CollectionEntry } from "@andishi/runtime";

/** A text field of a collection entry. */
export const textOf = (entry: CollectionEntry, key: string): string => {
  const value = entry.data[key];
  return typeof value === "string" ? value : value == null ? "" : String(value);
};

/** A "one per line" field as a list. */
export const linesOf = (entry: CollectionEntry, key: string): string[] =>
  textOf(entry, key).split("\n").map((line) => line.trim()).filter(Boolean);

/** A JSON field (process steps, FAQ), or the fallback when it is empty or not JSON. */
export function jsonOf<T>(entry: CollectionEntry, key: string, fallback: T): T {
  try {
    const text = textOf(entry, key);
    return text ? (JSON.parse(text) as T) : fallback;
  } catch {
    return fallback;
  }
}
