"use client";

import { motion } from "framer-motion";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Target, BookOpen, Search, ClipboardCheck } from "lucide-react";

const offerings = [
    {
        id: "culture",
        icon: Users,
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
        icon: Target,
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
        icon: BookOpen,
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
    },
    {
        id: "search",
        icon: Search,
        title: "Executive & Talent Search",
        tagline: "Placing people who transform performance.",
        description:
            "We go beyond recruitment to match leaders who align with your organization’s purpose, values, and strategic direction.",
        focusAreas: [
            "Executive and senior leadership search",
            "Targeted mid-level recruitment",
            "Competency profiling and assessments",
            "Candidate selection and onboarding support",
        ],
        outcome:
            "Strategic hires who elevate culture, capability, and performance.",
    },
    {
        id: "hr",
        icon: ClipboardCheck,
        title: "HR Operations & Advisory",
        tagline: "Strong foundations. Sustainable growth.",
        description:
            "We strengthen your HR systems and structures to enable clarity, compliance, and human-centered growth.",
        focusAreas: [
            "HR audits and process optimization",
            "Job evaluation and grading frameworks",
            "Compensation and benefits benchmarking",
            "Policy development and compliance alignment",
            "HR capability development and advisory",
        ],
        outcome:
            "A future-ready HR function that supports people, culture, and performance.",
    },
];

export function Offerings() {
    return (
        <section
            id="offerings"
            className="relative py-24 bg-gradient-to-b from-white via-slate-50 to-white scroll-mt-24"
        >
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--navy-dark)] mb-4">
                        What We Do
                    </h2>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        Unlocking Human Potential. Building Cultures that Thrive.
                    </p>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto mt-4">
                        HLCC bridges leadership, culture, and HR strategy — helping you
                        build workplaces where people feel seen, valued, and inspired to
                        perform at their best.
                    </p>
                </div>

                {/* Offering Cards */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {offerings.map(
                        (
                            { id, icon: Icon, title, tagline, description, focusAreas, outcome },
                            i
                        ) => (
                            <motion.div
                                key={id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeOut",
                                    delay: i * 0.05,
                                }}
                                viewport={{ once: true }}
                                className="h-full"
                            >
                                <Card
                                    className={`flex flex-col justify-between h-full p-6 rounded-2xl border border-slate-200 bg-gradient-to-br ${i % 2 === 0
                                            ? "from-white to-slate-50"
                                            : "from-slate-50 to-white"
                                        } hover:shadow-lg hover:border-[var(--gold-deep)] transition-all duration-300`}
                                >
                                    <div>
                                        <CardHeader className="flex items-center gap-4 mb-4">
                                            <div className="p-[2px] rounded-2xl bg-gradient-to-br from-[var(--blue-accent)] to-[var(--gold-accent)]">
                                                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
                                                    <Icon
                                                        className="w-7 h-7 text-[var(--navy-dark)]"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <CardTitle className="text-xl font-semibold text-[var(--navy-dark)]">
                                                    {title}
                                                </CardTitle>
                                                <p className="text-[var(--gold-deep)] italic text-sm mt-1">
                                                    {tagline}
                                                </p>
                                            </div>
                                        </CardHeader>

                                        <CardContent>
                                            <p className="text-gray-700 leading-relaxed mb-4">
                                                {description}
                                            </p>

                                            <Accordion type="single" collapsible className="w-full">
                                                <AccordionItem value={`${id}-focus`}>
                                                    <AccordionTrigger className="text-[var(--navy-dark)] hover:underline text-sm">
                                                        View Focus Areas
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <ul className="space-y-2 pl-5 mt-3 text-gray-700 text-[15px] leading-relaxed">
                                                            {focusAreas.map((item, index) => (
                                                                <li
                                                                    key={index}
                                                                    className="relative before:content-['•'] before:absolute before:-left-4 before:text-[var(--gold-deep)]"
                                                                >
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        </CardContent>
                                    </div>

                                    <p className="italic text-gray-800 text-sm mt-2">
                                        ✨ Outcome: {outcome}
                                    </p>
                                </Card>
                            </motion.div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
