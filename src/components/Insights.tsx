"use client";

import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

export function Insights() {
    const posts = [
        {
            image:
                "https://images.unsplash.com/photo-1669607960578-f7d7fd363e5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            title: "The Future of Organizational Learning: Trends Shaping 2025",
            excerpt:
                "From AI-augmented learning to culture-first development strategies — discover what’s next for leaders and HR innovators.",
            category: "Leadership & Learning",
            date: "Oct 1, 2025",
            readTime: "5 min read",
        },
        {
            image:
                "https://images.unsplash.com/photo-1758519290111-bfbd61b32d49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            title: "Building a Coaching Culture that Scales",
            excerpt:
                "How to embed coaching principles across teams and sustain a culture of feedback, trust, and shared accountability.",
            category: "Culture & Coaching",
            date: "Sep 25, 2025",
            readTime: "8 min read",
        },
        {
            image:
                "https://images.unsplash.com/photo-1758691736722-cda1858056e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            title: "Proving the ROI of Leadership Development",
            excerpt:
                "A clear framework for linking leadership growth to business performance — and communicating impact with confidence.",
            category: "Insights & Analytics",
            date: "Sep 18, 2025",
            readTime: "6 min read",
        },
    ];

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
                    <Button
                        variant="outline"
                        className="hidden md:flex border-2 border-gray-300 hover:border-[var(--blue-accent)] hover:text-[var(--blue-accent)]"
                    >
                        View All Articles
                    </Button>
                </motion.div>

                {/* Blog Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                                ease: "easeOut",
                            }}
                            viewport={{ once: true }}
                        >
                            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-[var(--blue-accent)] cursor-pointer">
                                <div className="relative h-48 overflow-hidden">
                                    <ImageWithFallback
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs text-gray-900">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-xl group-hover:text-[var(--blue-accent)] transition-colors line-clamp-2">
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base text-gray-600 mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </CardDescription>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        className="text-[var(--blue-accent)] hover:text-[var(--gold-accent)] p-0 h-auto"
                                    >
                                        Read More
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Button */}
                <div className="text-center mt-12 md:hidden">
                    <Button
                        variant="outline"
                        className="border-2 border-gray-300 hover:border-[var(--blue-accent)] hover:text-[var(--blue-accent)]"
                    >
                        View All Articles
                    </Button>
                </div>
            </div>
        </section>
    );
}
