import { useMemo } from "react";
import { useCollection } from "@andishi/runtime";
import { andishiEnabled } from "@/lib/andishi";
import { linesOf, textOf } from "./collectionFields";
import { jobPostings as localJobs, type JobPosting } from "./careers";

/** A date field (yyyy-mm-dd) as the careers pages show it ("March 30, 2026"). */
function displayDate(value: string): string {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/**
 * HLCC's job postings: from the Andishi collection "jobs" when the site is connected, else
 * content/careers.ts. Only postings marked as accepting applications are listed.
 */
export function useCareers(): { jobs: JobPosting[]; loading: boolean } {
  const collection = useCollection(andishiEnabled ? "jobs" : null);
  const mapped = useMemo(
    () =>
      collection.entries.map<JobPosting>((entry) => ({
        slug: textOf(entry, "slug"),
        title: textOf(entry, "title"),
        department: textOf(entry, "department"),
        location: textOf(entry, "location"),
        type: (textOf(entry, "type") || "Full-time") as JobPosting["type"],
        description: textOf(entry, "description"),
        responsibilities: linesOf(entry, "responsibilities"),
        requirements: linesOf(entry, "requirements"),
        niceToHave: linesOf(entry, "nice_to_have"),
        salary: textOf(entry, "salary") || undefined,
        postedDate: displayDate(textOf(entry, "posted_date")),
        closingDate: displayDate(textOf(entry, "closing_date")) || undefined,
        isActive: entry.data.is_active !== false,
      })),
    [collection.entries],
  );
  const jobs = andishiEnabled ? mapped : localJobs;
  return { jobs: jobs.filter((job) => job.isActive), loading: andishiEnabled && collection.loading };
}
