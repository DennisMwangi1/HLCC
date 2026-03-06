"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { articles } from "@/content/insights";

export function Insights() {
    // Get the latest 3 articles, sorted by date
    const sortedArticles = [...articles]
        .sort((a, b) => {
            const d1 = new Date(a.date).getTime();
            const d2 = new Date(b.date).getTime();
            return d2 - d1;
        })
        .slice(0, 3);

    return (
        <section
            id="insights"
            className="py-32 bg-[#fafafa] relative overflow-hidden"
        >
            <div className="container relative mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8"
                >
                    <div className="max-w-2xl">
                        <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-6">
                            Thought Leadership
                        </p>
                        <h2 className="text-4xl md:text-5xl text-black font-heading font-light mb-6">
                            Insights & <span className="italic">Perspectives</span>
                        </h2>
                        <p className="text-xl text-black/50 font-light leading-relaxed">
                            Research and reflections on the evolving landscape of global leadership and institutional culture.
                        </p>
                    </div>
                    <Link to="/insights" className="group flex items-center gap-3 text-black font-semibold text-xs uppercase tracking-widest border-b border-black/10 pb-2 hover:border-[#D4AF37] transition-all duration-300">
                        Explore All Insights
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                    </Link>
                </motion.div>

                {/* Blog Cards */}
                {sortedArticles.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-12">
                        {sortedArticles.map((article, index) => (
                            <motion.div
                                key={article.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                    ease: "easeOut",
                                }}
                                viewport={{ once: true }}
                            >
                                <Link to={`/insights/${article.slug}`} className="group block">
                                    <div className="relative aspect-[16/10] overflow-hidden mb-8">
                                        <ImageWithFallback
                                            src={article.secondaryImage || article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-widest font-semibold text-black">
                                                {article.category}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-heading mb-4 text-black group-hover:text-[#D4AF37] transition-colors duration-500 leading-snug">
                                        {article.title}
                                    </h3>

                                    <p className="text-black/50 font-light text-sm line-clamp-2 leading-relaxed mb-6">
                                        {article.tagline || article.description}
                                    </p>

                                    <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest text-black/30 font-semibold">
                                        <span className="flex items-center gap-2">
                                            <Calendar className="h-3 w-3" />
                                            {article.date}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <User className="h-3 w-3" />
                                            {article.author}
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 border border-dashed border-black/10">
                        <p className="text-black/40 font-light italic">No current entries available.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
