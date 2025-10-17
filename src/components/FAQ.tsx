"use client";

import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
    const faqs = [
        {
            question: "What makes HLCC’s coaching approach different?",
            answer:
                "We combine globally accredited coaching methods with deep understanding of organizational culture in African and global contexts. Our coaches focus on whole-person leadership—balancing performance with authenticity, empathy, and purpose.",
        },
        {
            question: "Do you customize your programs for each organization?",
            answer:
                "Yes. Every engagement begins with a discovery and culture-mapping process. We then co-design interventions aligned to your strategy, leadership goals, and cultural realities. No two HLCC programs are the same.",
        },
        {
            question: "How do you measure transformation and impact?",
            answer:
                "Our measurement framework captures both human and business outcomes—shifts in mindset, team dynamics, engagement, and performance indicators. We provide dashboards, pulse surveys, and impact summaries after each phase.",
        },
        {
            question: "Do you work with international or regional organizations?",
            answer:
                "Yes. HLCC partners with clients across Africa, the Middle East, and beyond. Our network of certified coaches and facilitators delivers programs in multiple languages and time zones.",
        },
        {
            question: "Can you train or certify our internal coaches?",
            answer:
                "Absolutely. We offer ICF-aligned internal coach certification programs and mentoring pathways that build sustainable internal capability while maintaining professional rigor.",
        },
        {
            question: "How long do your engagements typically run?",
            answer:
                "Short learning sprints can run for 4–6 weeks, while leadership and culture transformation programs often span 6–12 months depending on scope, region, and depth of integration.",
        },
        {
            question: "Do you support hybrid and virtual delivery?",
            answer:
                "Yes. We blend in-person facilitation with digital learning and virtual coaching to ensure accessibility, continuity, and engagement across all geographies.",
        },
        {
            question: "What support can we expect after a program ends?",
            answer:
                "We offer follow-up coaching, community sessions, and leadership labs to embed learning into culture. Our goal is not just completion—but sustained behavior change and leadership growth.",
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 pointer-events-none" />

            <div className="container relative mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl text-[var(--navy-dark)] mb-4 font-semibold">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600">
                        Common questions from leaders and organizations exploring how HLCC
                        drives growth and transformation.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border border-gray-200 rounded-lg px-6 bg-white hover:border-[var(--blue-accent)] transition-colors"
                            >
                                <AccordionTrigger className="text-left hover:no-underline hover:text-[var(--blue-accent)] text-lg py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 pb-6 text-base leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-600 mb-4">
                        Still have questions? Let’s explore how HLCC can support your goals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:info@hlcc.africa"
                            className="text-[var(--blue-accent)] hover:text-[var(--gold-accent)] transition-colors"
                        >
                            info@hlcc.africa
                        </a>
                        <span className="hidden sm:inline text-gray-400">•</span>
                        <a
                            href="tel:+254-700-000-000"
                            className="text-[var(--blue-accent)] hover:text-[var(--gold-accent)] transition-colors"
                        >
                            +254 700 000 000
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
