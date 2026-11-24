import { useMemo } from "react";
import { useCollection, useCollectionEntry, type CollectionEntry } from "@andishi/runtime";
import { andishiEnabled } from "@/lib/andishi";
import { listOf, textOf } from "./collectionFields";
import { jobPostings as localJobs, type JobPosting } from "./careers";

/** A date field (yyyy-mm-dd) as the careers pages show it ("March 30, 2026"). */
function displayDate(value: string): string {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/** A "jobs" collection entry as the careers pages read a posting. */
function toJob(entry: CollectionEntry): JobPosting {
  return {
    slug: textOf(entry, "slug"),
    title: textOf(entry, "title"),
    department: textOf(entry, "department"),
    location: textOf(entry, "location"),
    type: (textOf(entry, "type") || "Full-time") as JobPosting["type"],
    description: textOf(entry, "description"),
    responsibilities: listOf(entry, "responsibilities"),
    requirements: listOf(entry, "requirements"),
    niceToHave: listOf(entry, "nice_to_have"),
    salary: textOf(entry, "salary") || undefined,
    postedDate: displayDate(textOf(entry, "posted_date")),
    closingDate: displayDate(textOf(entry, "closing_date")) || undefined,
    isActive: entry.data.is_active !== false,
  };
}

/** One posting by its address (/careers/:slug): read on its own from Andishi, by its slug field. */
export function useCareer(slug: string | undefined): { job: JobPosting | undefined; loading: boolean } {
  const found = useCollectionEntry(andishiEnabled ? "jobs" : null, slug);
  if (!andishiEnabled) return { job: localJobs.find((job) => job.slug === slug), loading: false };
  return { job: found.entry ? toJob(found.entry) : undefined, loading: found.loading };
}

/**
 * HLCC's job postings: from the Andishi collection "jobs" when the site is connected, else
 * content/careers.ts. Only postings marked as accepting applications are listed.
 */
export function useCareers(): { jobs: JobPosting[]; loading: boolean } {
  // Only postings accepting applications, newest first (filtered and sorted by the Site API).
  const collection = useCollection(andishiEnabled ? "jobs" : null, { where: { is_active: true }, sort: "-posted_date" });
  const mapped = useMemo(() => collection.entries.map(toJob), [collection.entries]);
  const jobs = andishiEnabled ? mapped : localJobs;
  return { jobs: jobs.filter((job) => job.isActive), loading: andishiEnabled && collection.loading };
}
