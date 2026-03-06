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
    ];

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="container relative mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center mb-24"
                >
                    <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-6">
                        Clarity & Context
                    </p>
                    <h2 className="text-4xl md:text-5xl text-black mb-8 font-heading font-light">
                        Frequently Asked <span className="italic">Questions</span>
                    </h2>
                    <p className="text-xl text-black/50 font-light leading-relaxed">
                        Common inquiries from leaders exploring organizational transformation.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <Accordion type="single" collapsible className="space-y-6">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border-b border-black/5 pb-4 px-2"
                            >
                                <AccordionTrigger className="text-left hover:no-underline hover:text-[#D4AF37] text-xl font-heading font-light py-8 transition-colors duration-300">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-black/60 pb-8 text-lg font-light leading-relaxed">
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
                    className="text-center mt-24 pt-12 border-t border-black/5"
                >
                    <p className="text-black/40 text-xs uppercase tracking-[0.2em] font-semibold mb-6">
                        Direct Inquiries
                    </p>
                    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                        <a
                            href="mailto:info@hlcc.africa"
                            className="text-black font-semibold text-sm hover:text-[#D4AF37] transition-colors border-b border-black/10 pb-1"
                        >
                            info@hlcc.africa
                        </a>
                        <span className="hidden sm:inline text-black/10">•</span>
                        <a
                            href="tel:+254115335322"
                            className="text-black font-semibold text-sm hover:text-[#D4AF37] transition-colors border-b border-black/10 pb-1"
                        >
                            +254 115 335 322
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
