"use client";

import { motion } from "framer-motion";
import { Lightbulb, Users, TrendingUp } from "lucide-react";

export function InsightToImpact() {
    const steps = [
        {
            icon: Lightbulb,
            title: "Awareness",
            description: "Coaching and reflection spark clarity and new perspectives.",
        },
        {
            icon: Users,
            title: "Transformation",
            description: "Leaders and teams align around purpose, trust, and shared growth.",
        },
        {
            icon: TrendingUp,
            title: "Impact",
            description: "Cultural and performance shifts that sustain measurable results.",
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-[var(--navy-dark)] to-[var(--navy-medium)] text-white relative overflow-hidden">
            {/* Subtle overlays */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 pointer-events-none" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--gold-accent)]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--blue-accent)]/10 rounded-full blur-3xl" />

            <div className="relative container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-6 bg-gradient-to-r from-[var(--gold-accent)] to-[var(--blue-accent)] bg-clip-text text-transparent">
                        From Insight to Impact
                    </h2>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Every HLCC engagement moves leaders and organizations through a deliberate journey —
                        from awareness to transformation to lasting impact.
                    </p>
                </div>

                {/* Journey path */}
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-6 max-w-5xl mx-auto mt-16">
                    {/* Animated connecting line */}
                    <motion.div
                        className="hidden md:block absolute top-1/2 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--gold-accent)] to-[var(--blue-accent)] opacity-60"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        style={{ transformOrigin: "left" }}
                    />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut",
                                delay: index * 0.2,
                            }}
                            viewport={{ once: true }}
                            className="relative z-10 text-center md:w-1/3"
                        >
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--blue-accent)] to-[var(--gold-accent)] mb-6 shadow-lg">
                                <step.icon className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-300 text-sm max-w-xs mx-auto leading-relaxed">
                                {step.description}
                            </p>

                            {/* Animated arrow for small screens */}
                            {index < steps.length - 1 && (
                                <motion.div
                                    className="md:hidden my-6 text-[var(--gold-accent)]"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: index * 0.2 + 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    ↓
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
