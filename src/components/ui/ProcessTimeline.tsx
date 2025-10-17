"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

type ProcessStepProps = {
    number: number | string;
    title: string;
    description: string;
    isLast?: boolean;
    index: number;
};

export function ProcessTimeline({
    steps,
}: {
    steps: Omit<ProcessStepProps, "index">[];
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="relative mx-auto max-w-5xl py-10">
            {/* Animated vertical line */}
            <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute left-1/2 top-0 w-1 -translate-x-1/2 bg-gradient-to-b from-[var(--blue-accent)] to-[var(--gold-accent)] rounded-full"
            />

            <div className="space-y-24">
                {steps.map((step, index) => (
                    <ProcessStep key={index} {...step} index={index} />
                ))}
            </div>
        </div>
    );
}

function ProcessStep({
    number,
    title,
    description,
    index,
}: ProcessStepProps) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""
                }`}
        >
            {/* Step content */}
            <div
                className={`w-full md:w-1/2 px-6 md:px-12 ${isEven ? "md:text-left" : "md:text-right"
                    }`}
            >
                <h4 className="text-xl font-semibold text-[var(--navy-dark)] mb-2">
                    {title}
                </h4>
                <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>

            {/* Circle marker */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] text-white font-semibold shadow-md"
                >
                    {number}
                </motion.div>
            </div>
        </motion.div>
    );
}
