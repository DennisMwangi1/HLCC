import { useMemo } from "react";
import { useArticles, useCategories, type Article as AndishiArticle } from "@andishi/runtime";
import { andishiEnabled } from "@/lib/andishi";
import { articles as localArticles, type Article } from "./insights";

/** The text of an article's HTML body, one paragraph per block, for the site's own article layout. */
function paragraphsOf(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("p > a:only-child").forEach((a) => a.parentElement?.remove());
  return [...doc.body.querySelectorAll("p, h2, h3, li, blockquote")]
    .map((el) => el.textContent?.trim() ?? "")
    .filter(Boolean)
    .join("\n\n");
}

/** The "Read the original article" link the import put at the end of the body. */
function originalUrlOf(html: string): string | undefined {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const link = [...doc.querySelectorAll("p > a:only-child")].pop() as HTMLAnchorElement | undefined;
  return link?.href || undefined;
}

function toArticle(a: AndishiArticle, category: string): Article {
  const date = a.published_at ? new Date(a.published_at) : new Date(a.created_at);
  return {
    slug: a.slug,
    title: a.title,
    category,
    image: a.image_url,
    tagline: a.subtitle,
    description: a.excerpt || a.subtitle,
    content: paragraphsOf(a.body),
    author: "HLCC",
    date: date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    relatedTags: a.tags,
    originalUrl: originalUrlOf(a.body),
  };
}

/**
 * HLCC's insights: from Andishi (Content › Articles in the studio) when the site is connected,
 * else the articles in content/insights.ts. While Andishi loads, the list is empty.
 */
export function useInsights(): { articles: Article[]; loading: boolean; error: boolean } {
  const list = useArticles({ limit: 100 });
  const categories = useCategories();
  const mapped = useMemo(() => {
    const names = new Map(categories.categories.map((c) => [c.id, c.name]));
    return list.articles.map((a) => toArticle(a, names.get(a.category_id) ?? ""));
  }, [list.articles, categories.categories]);
  if (!andishiEnabled) return { articles: localArticles, loading: false, error: false };
  return { articles: mapped, loading: list.loading, error: !!list.error };
}
