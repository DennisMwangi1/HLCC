"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { articles } from "@/content/insights";
import { useSEO } from "@/hooks/useSEO";
import { pageSEO } from "@/lib/seo";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

export default function InsightsList() {
  useSEO(pageSEO.insights);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Insights', url: '/insights' },
  ];
  const sorted = [...articles].sort((a, b) => {
    const d1 = new Date(a.date).getTime();
    const d2 = new Date(b.date).getTime();
    return d2 - d1;
  });

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="bg-white">
        {/* HERO */}
        <section className="relative h-[50vh] flex items-center bg-black overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.1] pointer-events-none" />
          <div className="container relative z-10">
            <div className="max-w-4xl">
              <motion.p
                initial={{ opacity: 0, tracking: '0.4em' }}
                animate={{ opacity: 1, tracking: '0.2em' }}
                transition={{ duration: 1 }}
                className="text-[#D4AF37] uppercase text-[10px] font-bold mb-8 flex items-center gap-4"
              >
                <span className="w-12 h-px bg-[#D4AF37]/50" />
                HLCC Perspective
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-heading font-light text-white mb-8 leading-tight"
              >
                Insight to <span className="italic">Impact</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-white/50 font-light italic max-w-2xl leading-relaxed"
              >
                Strategic reflections on leadership, culture, and the future of organizational excellence.
              </motion.p>
            </div>
          </div>
        </section>

        {/* LISTING */}
        <section className="py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
              {sorted.map((a, index) => (
                <motion.div
                  key={a.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/insights/${a.slug}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#fafafa] mb-8 border border-black/5">
                      <ImageWithFallback
                        src={a.image}
                        alt={a.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                      />
                      <div className="absolute top-8 left-8">
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-black shadow-sm">
                          {a.category}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-black/30">
                        <span>{a.date}</span>
                        <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                        <span>{a.author}</span>
                      </div>
                      <h2 className="text-3xl font-heading font-light text-black group-hover:text-[#D4AF37] transition-colors leading-snug">
                        {a.title}
                      </h2>
                      <p className="text-black/50 font-light text-sm leading-relaxed line-clamp-2">
                        {a.tagline || a.description}
                      </p>
                      <div className="pt-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black group-hover:gap-6 transition-all duration-500">
                        Read Essay <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
