"use client";

import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Award, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { articles } from "@/content/insights";
import { useSEO } from "@/hooks/useSEO";
import { getAbsoluteUrl } from "@/lib/seo";
import { OrganizationSchema, ArticleSchema, BreadcrumbSchema } from "@/components/StructuredData";

export default function InsightDetail() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  useSEO(
    article
      ? {
        title: `${article.title} | HLCC Insights`,
        description: article.description || article.tagline,
        keywords: article.relatedTags,
        image: article.image,
        url: getAbsoluteUrl(`/insights/${article.slug}`),
        type: 'article',
        publishedTime: article.date,
        modifiedTime: article.date,
        author: article.author,
        section: article.category,
        tags: article.relatedTags,
      }
      : undefined
  );

  const breadcrumbs = article
    ? [
      { name: 'Home', url: '/' },
      { name: 'Insights', url: '/insights' },
      { name: article.title, url: `/insights/${article.slug}` },
    ]
    : [];

  if (!article) {
    return (
      <main className="py-24 bg-white text-black">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-[#D4AF37] uppercase tracking-widest text-xs mb-8">Error 404</p>
          <h1 className="text-4xl font-heading font-light mb-12 italic">Insight Not Found</h1>
          <Button asChild className="bg-black text-white hover:bg-gray-800 rounded-none px-12 py-7 uppercase tracking-widest text-xs">
            <Link to="/insights">Return to Insights</Link>
          </Button>
        </div>
      </main>
    );
  }

  const related = getRelatedArticles(article.slug, article.relatedTags);

  const paragraphs = article.content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <OrganizationSchema />
      <ArticleSchema article={article} />
      {breadcrumbs.length > 0 && <BreadcrumbSchema items={breadcrumbs} />}

      <main className="bg-white">
        {/* Article Hero */}
        <section className="relative pt-40 pb-24 bg-black overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.1] pointer-events-none" />
          <div className="container relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, tracking: '0.4em' }}
                animate={{ opacity: 1, tracking: '0.2em' }}
                className="text-[#D4AF37] uppercase text-[10px] font-bold mb-8 flex items-center gap-4"
              >
                <span className="px-3 py-1 border border-[#D4AF37]/30 text-[#D4AF37]">
                  {article.category}
                </span>
                <span>{article.date}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-heading font-light text-white mb-12 leading-tight"
              >
                {article.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-6"
              >
                <div className="w-12 h-12 bg-[#D4AF37]/20 flex items-center justify-center rounded-full">
                  <User className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Written By</p>
                  <p className="text-white font-heading italic">{article.author}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-12 gap-24 items-start">

              {/* Main Content */}
              <div className="lg:col-span-8 space-y-12">
                {article.secondaryImage || article.image ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="aspect-video bg-[#fafafa] overflow-hidden border border-black/5 mb-16"
                  >
                    <ImageWithFallback
                      src={article.secondaryImage || article.image}
                      alt={article.title}
                      className="w-full h-full object-cover grayscale"
                    />
                  </motion.div>
                ) : null}

                <div className="prose prose-lg max-w-none">
                  {paragraphs.map((p, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.05 }}
                      className="text-xl leading-relaxed text-black/70 font-light mb-10 first-letter:text-5xl first-letter:font-heading first-letter:mr-3 first-letter:float-left first-letter:text-black"
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>

                {article.result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-12 bg-[#fafafa] border-l-2 border-[#D4AF37] italic"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <Award className="w-6 h-6 text-[#D4AF37]" strokeWidth={1} />
                      <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-black">Observation & Impact</h3>
                    </div>
                    <p className="text-2xl font-heading font-light text-black leading-relaxed">
                      "{article.result}"
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-24">
                {article.relatedTags && article.relatedTags.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-black mb-8">Executive Summary</h3>
                    <ul className="space-y-6">
                      {article.relatedTags.map((tag, i) => (
                        <li key={tag} className="flex items-start gap-4">
                          <span className="text-[#D4AF37] font-heading italic text-xl">{String(i + 1).padStart(2, '0')}</span>
                          <span className="text-black/50 font-light text-sm pt-1 leading-relaxed">{tag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {article.originalUrl && (
                  <div className="p-10 bg-black text-white">
                    <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-white/40 mb-6">Full Publication</h3>
                    <p className="text-lg font-heading italic mb-8">Read the complete story in our digital warehouse.</p>
                    <Button asChild className="w-full bg-[#D4AF37] text-black hover:bg-[#F3E5AB] rounded-none py-7 text-[10px] uppercase font-bold tracking-widest">
                      <a href={article.originalUrl} target="_blank" rel="noopener noreferrer">
                        Open Article
                      </a>
                    </Button>
                  </div>
                )}

                <div className="pt-12 border-t border-black/5">
                  <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-black mb-8">Engage HLCC</h3>
                  <p className="text-black/50 font-light text-sm mb-8">Interested in implementing these insights within your institution?</p>
                  <Link to="/contact" className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] hover:tracking-[0.2em] transition-all">
                    Request a consultation &rarr;
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="py-24 bg-[#fafafa]">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex items-end justify-between mb-16 border-b border-black/5 pb-8">
                <h2 className="text-3xl font-heading font-light text-black italic">Parallel Studies</h2>
                <Link to="/insights" className="text-[10px] uppercase font-bold tracking-widest text-black/40 hover:text-black transition-colors">View All &rarr;</Link>
              </div>
              <div className="grid md:grid-cols-3 gap-12">
                {related.map((r) => (
                  <Link key={r.slug} to={`/insights/${r.slug}`} className="group block">
                    <div className="aspect-[16/9] overflow-hidden bg-white mb-6 border border-black/5">
                      <ImageWithFallback src={r.image} alt={r.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <p className="text-[9px] uppercase tracking-widest font-bold text-[#D4AF37] mb-2">{r.category}</p>
                    <h3 className="text-xl font-heading font-light text-black group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-2">
                      {r.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
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

  const extras = pool.filter((p) => !top.includes(p)).slice(0, 3 - top.length);
  return [...top, ...extras];
}
