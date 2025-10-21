"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { articles } from "@/content/insights";

export default function InsightsList() {
  const sorted = [...articles].sort((a, b) => {
    const d1 = new Date(a.date).getTime();
    const d2 = new Date(b.date).getTime();
    return d2 - d1;
  });

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold-accent)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--blue-accent)]/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-start md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-[var(--navy-dark)] mb-4">Insights & Blogs</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Leadership, transformation, and real-world case studies—curated by the HLCC team.
            </p>
          </div>
          <Link to="/">
            <Button variant="outline" className="border-2 border-gray-300 hover:border-[var(--blue-accent)] hover:text-[var(--blue-accent)]">
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((a, index) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-[var(--blue-accent)]">
                <div className="relative h-48 overflow-hidden">
                  <Link to={`/insights/${a.slug}`} aria-label={`Open ${a.title}`}>
                    <ImageWithFallback
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs text-gray-900">
                      {a.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-[var(--blue-accent)] transition-colors line-clamp-1">
                    {a.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600 mb-4 line-clamp-2">
                    {a.tagline || a.description}
                  </CardDescription>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{a.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{a.date}</span>
                    </div>
                  </div>

                  <Link to={`/insights/${a.slug}`}>
                    <Button variant="ghost" className="text-[var(--blue-accent)] hover:text-[var(--gold-accent)] p-0 h-auto">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
