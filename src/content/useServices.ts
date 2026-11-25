import { useMemo } from "react";
import { useCollection } from "@andishi/runtime";
import { andishiEnabled } from "@/lib/andishi";
import { groupOf, listOf, textOf } from "./collectionFields";
import { services as localServices, type Service } from "./services";

/**
 * HLCC's services: from the Andishi collection "services" (Content › Collections in the studio)
 * when the site is connected, else content/services.ts. Ordered by their position field.
 */
export function useServices(): { services: Service[]; loading: boolean } {
  const collection = useCollection(andishiEnabled ? "services" : null, { sort: "position" });
  const mapped = useMemo(
    () =>
      // Ordered by position here as well as by the Site API (sort=position), so the order holds
      // on an API that does not apply it.
      [...collection.entries]
        .sort((a, b) => Number(a.data.position ?? 0) - Number(b.data.position ?? 0))
        .map<Service>((entry) => ({
          slug: textOf(entry, "slug"),
          title: textOf(entry, "title"),
          tagline: textOf(entry, "tagline"),
          description: textOf(entry, "description"),
          focusAreas: listOf(entry, "focus_areas"),
          outcome: textOf(entry, "outcome"),
          heroImage: textOf(entry, "hero_image") || undefined,
          methodology: listOf(entry, "methodology"),
          process: groupOf<{ number?: number; title: string; description: string; duration: string }>(entry, "process")
            .map((step, index) => ({ ...step, number: Number(step.number ?? index + 1) })),
          faq: groupOf<{ question: string; answer: string }>(entry, "faq"),
        })),
    [collection.entries],
  );
  if (!andishiEnabled) return { services: localServices, loading: false };
  return { services: mapped, loading: collection.loading };
}
