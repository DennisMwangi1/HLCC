"use client";

import { motion } from "framer-motion";
import { Lightbulb, Users, TrendingUp } from "lucide-react";

export function InsightToImpact() {
    const steps = [
        {
            icon: Lightbulb,
            title: "Awareness",
            description: "Deep coaching and reflection spark new perspectives and radical clarity.",
        },
        {
            icon: Users,
            title: "Transformation",
            description: "Leaders and teams align around purpose, trust, and shared growth foundations.",
        },
        {
            icon: TrendingUp,
            title: "Impact",
            description: "Cultural and performance shifts that sustain measurable, human-centric results.",
        },
    ];

    return (
        <section className="py-32 bg-[#0a0a0a] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 right-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />

            <div className="relative container mx-auto px-4 md:px-6">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-heading font-light mb-8 pt-2">
                        From <span className="italic text-[#D4AF37]">Insight</span> to Impact
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
                        Every HLCC engagement moves organizations through a deliberate, high-touch journey—from awareness to lasting institutional transformation.
                    </p>
                </div>

                {/* Journey path */}
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 max-w-6xl mx-auto items-start">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                                delay: index * 0.2,
                            }}
                            viewport={{ once: true }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            <div className="mb-10 relative">
                                <div className="absolute -inset-4 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full border border-white/10 group-hover:border-[#D4AF37]/50 transition-colors duration-500 bg-black/40 backdrop-blur-sm">
                                    <step.icon className="h-8 w-8 text-[#D4AF37]" strokeWidth={1} />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#0a0a0a] border border-white/5 flex items-center justify-center text-[10px] text-white/40 font-mono">
                                    0{index + 1}
                                </div>
                            </div>

                            <h3 className="text-2xl font-heading font-normal mb-4 text-white group-hover:text-[#D4AF37] transition-colors duration-500">{step.title}</h3>
                            <p className="text-white/40 text-sm leading-relaxed max-w-[280px]">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
