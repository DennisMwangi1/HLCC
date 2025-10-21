"use client";

import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Award } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { articles } from "@/content/insights";

export default function InsightDetail() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-[var(--navy-dark)] mb-6">Article not found</h1>
          <Link to="/insights">
            <Button variant="outline" className="border-2">Back to Insights</Button>
          </Link>
        </div>
      </section>
    );
  }

  const related = getRelatedArticles(article.slug, article.relatedTags);

  const paragraphs = article.content
    .split(/\n\s*\n/) // split by blank lines
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold-accent)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--blue-accent)]/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Link to="/insights">
            <Button variant="ghost" className="text-[var(--blue-accent)] gap-2 px-0">
              <ArrowLeft className="w-4 h-4" /> Back to Insights
            </Button>
          </Link>
        </motion.div>

        {/* Featured image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border"
        >
          <ImageWithFallback
            src={article.image}
            alt={article.title}
            className="w-full h-[320px] md:h-[440px] object-cover"
          />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <div className="mb-3">
            <span className="px-3 py-1 bg-white shadow-sm border rounded-full text-xs text-gray-700">
              {article.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-[var(--navy-dark)] mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="inline-flex items-center gap-1">
              <User className="h-4 w-4" /> {article.author}
            </div>
            <div className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" /> {article.date}
            </div>
          </div>
        </motion.div>

        {/* Body */}
        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {paragraphs.map((p, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                className="text-lg leading-relaxed text-gray-700"
              >
                {p}
              </motion.p>
            ))}

            {article.result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-white to-slate-50 border-2">
                  <CardHeader className="pb-3">
                    <div className="inline-flex items-center gap-2 text-[var(--navy-dark)]">
                      <Award className="w-5 h-5 text-[var(--gold-accent)]" />
                      <CardTitle>Results</CardTitle>
                    </div>
                    <CardDescription>
                      Outcomes achieved through the engagement.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-base">{article.result}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {article.relatedTags && article.relatedTags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[var(--navy-dark)]">Key Learnings</CardTitle>
                    <CardDescription>
                      Themes and takeaways from this article.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {article.relatedTags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}
        </div>

        {/* Related at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold text-[var(--navy-dark)] mb-6">Related Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.slug} to={`/insights/${r.slug}`} className="group">
                <Card className="h-full border-2 hover:border-[var(--blue-accent)] transition">
                  <div className="h-32 overflow-hidden">
                    <ImageWithFallback src={r.image} alt={r.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <div className="text-xs text-gray-500 mb-1">{r.category}</div>
                    <div className="text-sm font-medium text-[var(--navy-dark)] group-hover:text-[var(--blue-accent)] line-clamp-2">
                      {r.title}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}

function getRelatedArticles(currentSlug: string, tags?: string[]) {
  const pool = articles.filter((a) => a.slug !== currentSlug);
  if (!tags || tags.length === 0) return pool.slice(0, 3);

  const scored = pool
    .map((a) => ({
      a,
      score: (a.relatedTags || []).reduce((acc, t) => acc + (tags.includes(t) ? 1 : 0), 0),
    }))
    .sort((x, y) => y.score - x.score)
    .map((x) => x.a);

  const top = scored.filter(Boolean);
  if (top.length >= 3) return top.slice(0, 3);

  // fallback fill
  const extras = pool.filter((p) => !top.includes(p)).slice(0, 3 - top.length);
  return [...top, ...extras];
}
