"use client";

import { motion } from "framer-motion";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const offerings = [
    {
        id: "culture",
        image: "/assets/img/culture-shaping.jpg",
        title: "Culture Shaping & Organizational Health",
        tagline: "Design the culture you want. Nurture the one you need.",
        description:
            "We help you intentionally define, embed, and sustain a culture that fuels engagement, belonging, and lasting performance.",
        focusAreas: [
            "Culture diagnostics and engagement assessments",
            "Defining purpose, values, and behavior anchors",
            "Development of a Culture & Values Playbook",
            "Leadership alignment and cultural immersion programs",
            "Culture sustainability plans and rituals",
        ],
        outcome:
            "A living culture where people feel connected, inspired, and accountable.",
    },
    {
        id: "team",
        image: "/assets/img/coaching.jpg",
        title: "Team Coaching & Development",
        tagline: "From groups to great teams.",
        description:
            "We design coaching-based experiences that strengthen trust, collaboration, and shared purpose within teams.",
        focusAreas: [
            "Leadership and team coaching",
            "Strengths-based collaboration sessions",
            "Emotional intelligence and trust-building workshops",
            "Team retreats and reflection labs",
        ],
        outcome:
            "Teams that communicate openly, collaborate intentionally, and deliver consistently.",
    },
    {
        id: "leadership",
        image: "/assets/img/capacity-building.webp",
        title: "Leadership Training & Capacity Building",
        tagline: "Develop leaders who lead with heart and impact.",
        description:
            "Transformative learning journeys equipping leaders with the mindset, skills, and emotional intelligence to inspire trust and drive results.",
        focusAreas: [
            "Leading with Emotional Intelligence",
            "Coaching for Performance & Growth",
            "Managing Difficult Conversations",
            "Leading Across Generations",
            "Building Inclusive & Psychologically Safe Teams",
        ],
        outcome:
            "Confident, emotionally intelligent leaders who shape culture and deliver impact.",
    }
];

export function Offerings() {
    return (
        <section
            id="offerings"
            className="relative py-32 bg-white scroll-mt-24"
        >
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-heading font-light text-black mb-6">
                        What We <span className="italic">Deliver</span>
                    </h2>
                    <p className="text-xl text-black/50 max-w-2xl mx-auto font-light leading-relaxed">
                        Unlocking Human Potential. Building Cultures that Thrive.
                    </p>
                </div>

                {/* Offering Cards */}
                <div className="grid gap-12 md:grid-cols-3">
                    {offerings.map(
                        (
                            { id, title, tagline, description, outcome },
                            i
                        ) => (
                            <motion.div
                                key={id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeOut",
                                    delay: i * 0.1,
                                }}
                                viewport={{ once: true }}
                                className="group h-full flex flex-col"
                            >
                                <div className="border-t border-black/5 pt-12 flex flex-col h-full hover:border-[#D4AF37] transition-colors duration-500">
                                    <div className="mb-8">
                                        <p className="text-[#D4AF37] uppercase tracking-[0.2em] text-[10px] font-semibold mb-3">
                                            Focus Area 0{i + 1}
                                        </p>
                                        <h3 className="text-2xl font-heading mb-4 text-black group-hover:text-[#D4AF37] transition-colors duration-500">
                                            {title}
                                        </h3>
                                        <p className="text-[#D4AF37]/70 italic text-sm font-light mb-6">
                                            "{tagline}"
                                        </p>
                                    </div>

                                    <div className="flex-grow">
                                        <p className="text-black/60 font-light leading-relaxed text-base mb-8">
                                            {description}
                                        </p>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="pt-6 border-t border-black/5">
                                            <p className="text-[10px] uppercase tracking-widest text-black/30 mb-2">Measurable Outcome</p>
                                            <p className="text-black/80 text-sm font-medium italic">
                                                {outcome}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    )}
                </div>

                {/* See All Offerings Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-20"
                >
                    <Link
                        to="/services"
                        className="group flex items-center gap-4 text-black font-semibold text-xs uppercase tracking-[0.3em] hover:text-[#D4AF37] transition-colors duration-300"
                    >
                        Explore All Solutions
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" strokeWidth={1.5} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
