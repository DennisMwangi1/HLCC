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
        <div ref={containerRef} className="relative mx-auto max-w-5xl py-20">
            {/* Elegant vertical line */}
            <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="absolute left-1/2 top-0 w-[1px] -translate-x-1/2 bg-black/10"
            />

            <div className="space-y-32">
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""}`}
        >
            {/* Step content */}
            <div className={`w-full md:w-1/2 px-8 md:px-16 ${isEven ? "md:text-left" : "md:text-right"}`}>
                <h4 className="text-2xl font-heading mb-4 text-black italic">
                    {title}
                </h4>
                <p className="text-black/60 font-light leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Elegant Circle Marker */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center w-4 h-4 rounded-full bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)] z-10"
                />
                <div className="absolute top-8 text-[#D4AF37] font-heading text-sm tracking-widest opacity-50">
                    {number}
                </div>
            </div>
        </motion.div>
    );
}
