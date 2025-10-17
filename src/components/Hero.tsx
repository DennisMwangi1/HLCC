"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
    onBookConsultation: () => void;
}

export function Hero({ onBookConsultation }: HeroProps) {
    const metrics = [
        {
            target: 10000,
            label: "Leaders Developed",
            description: "Empowered through coaching and learning programs",
            suffix: "+",
        },
        {
            target: 50,
            label: "Organizations Transformed",
            description: "Across Africa, the Middle East, and beyond",
            suffix: "+",
        },
        {
            target: 97,
            label: "Client Retention",
            description: "Sustained partnerships built on trust and measurable results",
            suffix: "%",
        },
    ];

    // Counter logic
    const [counts, setCounts] = useState(metrics.map(() => 0));
    const controls = useAnimation();

    useEffect(() => {
        controls.start((i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.2, duration: 0.5 },
        }));

        const duration = 1200; // milliseconds
        const steps = 60;

        metrics.forEach((metric, i) => {
            let step = 0;
            const increment = metric.target / steps;
            const interval = setInterval(() => {
                step++;
                setCounts((prev) => {
                    const updated = [...prev];
                    updated[i] = Math.floor(Math.min(metric.target, increment * step));
                    return updated;
                });
                if (step >= steps) clearInterval(interval);
            }, duration / steps);
        });
    }, [controls]);

    return (
        <section className="relative h-screen md:min-h-[700px] flex items-center overflow-hidden bg-gradient-to-br from-[var(--navy-dark)] via-[var(--gold-deep)] to-[var(--navy-medium)]">
            {/* Background Image */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1080&q=80')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-dark)]/90 via-[var(--navy-dark)]/85 to-[var(--navy-dark)]/60" />

            {/* Decorative gradients */}
            {/*<div className="absolute top-20 right-20 w-80 h-80 bg-[var(--blue-accent)]/25 rounded-full blur-3xl" />*/}
            {/*<div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[var(--gold-accent)]/25 rounded-full blur-3xl" />*/}

            {/* Content grid */}
            <div className="container relative mx-auto px-4 md:px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
                {/* Left side */}
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                        Culture Runs the Show.
                        <span className="block mt-2 bg-gradient-to-r from-[var(--blue-bright)] to-[var(--gold-accent)] bg-clip-text text-transparent">
                            We Make Sure It Works for You.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
                        HLCC helps organizations align people, culture, and leadership to
                        build workplaces where belonging drives performance and strategy
                        becomes lived behavior.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] text-white hover:opacity-90 text-lg px-8 py-6"
                            onClick={onBookConsultation}
                        >
                            Book a Consultation
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-2 border-white/30 text-white hover:bg-black/10 hover:text-white bg-white/10 text-lg px-8 py-6"
                        >
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* Right side: metrics */}
                <div className="relative flex flex-col justify-center space-y-10 border-l border-white/20 pl-8">
                    {/* Accent background pulse */}
                    <motion.div
                        className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--blue-accent)]/10 to-[var(--gold-accent)]/10 rounded-3xl blur-2xl"
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    />

                    {metrics.map((metric, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={controls}
                            className="relative"
                        >
                            <div className="text-5xl font-bold bg-gradient-to-r from-[var(--blue-bright)] to-[var(--gold-accent)] bg-clip-text text-transparent mb-1">
                                {counts[i]}
                                {metric.suffix}
                            </div>
                            <div className="text-lg text-white mb-1">{metric.label}</div>
                            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                                {metric.description}
                            </p>
                        </motion.div>
                    ))}

                    {/* Floating badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg"
                    >
                        <p className="text-gray-300 text-sm">
                            <span className="text-white font-medium">
                                “People First. Always.”
                            </span>{" "}
                            — Our core belief driving every partnership.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
