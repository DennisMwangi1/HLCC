"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroProps {
    onBookConsultation: () => void;
}

export function Hero({ onBookConsultation }: HeroProps) {
    const metrics = [
        {
            target: 100,
            label: "Leaders Developed",
            description: "Empowered through coaching and learning programs",
            suffix: "+",
        },
        {
            target: 15,
            label: "Organizations Transformed",
            description: "Across Africa, the Middle East, and beyond",
            suffix: "+",
        },

    ];

    // Counter logic
    const [counts, setCounts] = useState(metrics.map(() => 0));
    const controls = useAnimation();
    const navigate = useNavigate();

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
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
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
                            onClick={() => navigate('/about')}
                        >
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* Right side: image + animated metrics */}
                <div className="hidden relative md:flex items-center justify-center border-l border-white/20 pl-8">
                    <div className="relative">
                        {/* Glow backdrop */}
                        <motion.div
                            className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-[var(--blue-accent)]/20 to-[var(--gold-accent)]/20 blur-3xl"
                            animate={{ opacity: [0.4, 0.7, 0.4] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        />

                        {/* Main image (larger) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative overflow-hidden rounded-3xl ring-1 ring-white/20 shadow-2xl"
                        >
                            <motion.img
                                src="/assets/img/hlcc-culture.png"
                                alt="HLCC culture"
                                className="block w-[360px] md:w-[460px] lg:w-[700px] max-w-[90vw] h-auto object-cover"
                                animate={{ y: [0, -6, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            />
                        </motion.div>

                        {/* Metric badge 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="absolute -top-6 -left-4 md:-left-10"
                        >
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.4 }}
                                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-lg"
                            >
                                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--blue-bright)] to-[var(--gold-accent)] bg-clip-text text-transparent">
                                    {counts[0]}
                                    {metrics[0].suffix}
                                </div>
                                <div className="text-xs md:text-sm text-gray-200">{metrics[0].label}</div>
                            </motion.div>
                        </motion.div>

                        {/* Metric badge 2 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="absolute top-1/2 -right-6 md:-right-10 -translate-y-1/2"
                        >
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.6 }}
                                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-lg"
                            >
                                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--blue-bright)] to-[var(--gold-accent)] bg-clip-text text-transparent">
                                    {counts[1]}
                                    {metrics[1].suffix}
                                </div>
                                <div className="text-xs md:text-sm text-gray-200">{metrics[1].label}</div>
                            </motion.div>
                        </motion.div>

                        {/* Metric badge 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2"
                        >
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.8 }}
                                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-lg"
                            >
                                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[var(--blue-bright)] to-[var(--gold-accent)] bg-clip-text text-transparent">
                                    {counts[2]}
                                    {metrics[2].suffix}
                                </div>
                                <div className="text-xs md:text-sm text-gray-200">{metrics[2].label}</div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
