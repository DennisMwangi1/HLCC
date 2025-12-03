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
            className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
        >
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
                    className="flex justify-between items-end mb-16"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl text-[var(--navy-dark)] mb-4 font-semibold">
                            Insights & Perspectives
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            Ideas, reflections, and research shaping the future of leadership,
                            culture, and learning.
                        </p>
                    </div>
                    <Link to="/insights">
                        <Button
                            variant="outline"
                            className="hidden md:flex border-2 border-gray-300 hover:border-[var(--blue-accent)] hover:text-[var(--blue-accent)]"
                        >
                            View All Articles
                        </Button>
                    </Link>
                </motion.div>

                {/* Blog Cards */}
                {sortedArticles.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedArticles.map((article, index) => (
                            <motion.div
                                key={article.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                    ease: "easeOut",
                                }}
                                viewport={{ once: true }}
                            >
                                <Link to={`/insights/${article.slug}`} className="block">
                                    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-[var(--blue-accent)] cursor-pointer h-full">
                                        <div className="relative h-48 overflow-hidden">
                                            <ImageWithFallback
                                                src={article.secondaryImage || article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs text-gray-900">
                                                    {article.category}
                                                </span>
                                            </div>
                                        </div>
                                        <CardHeader>
                                            <CardTitle className="text-xl group-hover:text-[var(--blue-accent)] transition-colors line-clamp-1">
                                                {article.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="text-base text-gray-600 mb-4 line-clamp-2">
                                                {article.tagline || article.description}
                                            </CardDescription>

                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <User className="h-4 w-4" />
                                                    <span>{article.author}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{article.date}</span>
                                                </div>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                className="text-[var(--blue-accent)] p-0 h-auto cursor-pointer group/btn"
                                            >
                                                Read More
                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No articles available at the moment.</p>
                    </div>
                )}

                {/* Mobile Button */}
                <div className="text-center mt-12 md:hidden">
                    <Link to="/insights">
                        <Button
                            variant="outline"
                            className="border-2 border-gray-300 hover:border-[var(--blue-accent)] hover:text-[var(--blue-accent)]"
                        >
                            View All Articles
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
