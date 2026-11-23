import { useMemo } from "react";
import { useCollection } from "@andishi/runtime";
import { andishiEnabled } from "@/lib/andishi";
import { jsonOf, linesOf, textOf } from "./collectionFields";
import { services as localServices, type Service } from "./services";

/**
 * HLCC's services: from the Andishi collection "services" (Content › Collections in the studio)
 * when the site is connected, else content/services.ts. Ordered by their position field.
 */
export function useServices(): { services: Service[]; loading: boolean } {
  const collection = useCollection(andishiEnabled ? "services" : null);
  const mapped = useMemo(
    () =>
      [...collection.entries]
        .sort((a, b) => Number(a.data.position ?? 0) - Number(b.data.position ?? 0))
        .map<Service>((entry) => ({
          slug: textOf(entry, "slug"),
          title: textOf(entry, "title"),
          tagline: textOf(entry, "tagline"),
          description: textOf(entry, "description"),
          focusAreas: linesOf(entry, "focus_areas"),
          outcome: textOf(entry, "outcome"),
          heroImage: textOf(entry, "hero_image") || undefined,
          methodology: linesOf(entry, "methodology"),
          process: jsonOf(entry, "process", []),
          faq: jsonOf(entry, "faq", []),
        })),
    [collection.entries],
  );
  if (!andishiEnabled) return { services: localServices, loading: false };
  return { services: mapped, loading: collection.loading };
}
