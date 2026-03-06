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
    const isLeft = index % 2 === 0;

    const Content = ({ align }: { align: "left" | "right" }) => (
        <div className={`w-full ${align === "right" ? "md:text-right" : "md:text-left"} text-center`}>
            <h4 className="text-xl md:text-3xl font-heading mb-4 text-black italic leading-[1.2]">
                {title}
            </h4>
            <p className="text-black/60 font-light text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0 inline-block">
                {description}
            </p>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 w-full items-start">
                {/* Left Column */}
                <div className="px-8 md:px-20 h-full">
                    {isLeft ? (
                        <Content align="right" />
                    ) : (
                        <div className="hidden md:block" aria-hidden="true" />
                    )}
                </div>

                {/* Right Column */}
                <div className="px-8 md:px-20 h-full">
                    {!isLeft ? (
                        <Content align="left" />
                    ) : (
                        <div className="hidden md:block" aria-hidden="true" />
                    )}
                </div>
            </div>

            {/* Central Spine Marker */}
            <div className="absolute left-1/2 top-[0.6rem] md:top-[0.8rem] -translate-x-1/2 flex items-center justify-center pointer-events-none z-20">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] border-2 border-white"
                />
                <div className="absolute top-10 whitespace-nowrap">
                    <span className="text-[#D4AF37] font-heading text-[10px] md:text-xs tracking-widest font-bold opacity-80 bg-white/80 px-2 py-1 backdrop-blur-sm">
                        {number}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
