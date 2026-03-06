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
        <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-[#050505]">
            {/* Background Image with subtle parallax/zoom effect if possible, but keep it simple for now */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Premium Overlay: Darker, more sophisticated gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505]" />

            {/* Content grid */}
            <div className="container relative mx-auto px-4 md:px-6 pt-32 pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-8 leading-[1.1] font-heading font-light tracking-tight">
                            Culture Runs <span className="italic">the Show</span>.
                            <span className="block mt-4 text-[#D4AF37] font-medium tracking-normal">
                                We Make Sure It Works for You.
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-lg md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        HLCC helps organizations align people, culture, and leadership to
                        build workplaces where belonging drives performance.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    >
                        <Button
                            size="lg"
                            className="bg-[#D4AF37] text-black hover:bg-[#F3E5AB] transition-all duration-500 rounded-none px-10 py-7 text-sm uppercase tracking-widest font-semibold"
                            onClick={onBookConsultation}
                        >
                            Elevate Your Culture
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white hover:text-black transition-all duration-500 rounded-none px-10 py-7 text-sm uppercase tracking-widest font-light bg-transparent"
                            onClick={() => navigate('/about')}
                        >
                            Our Philosophy
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Metrics Strip: Clean, Minimalist, Luxury */}
            <div className="container relative mx-auto px-4 md:px-6 mt-auto pb-12">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-16 border-t border-white/10 pt-12 max-w-4xl mx-auto">
                    {metrics.map((metric, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 + (i * 0.2), duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-heading text-white mb-2">
                                {counts[i]}{metric.suffix}
                            </div>
                            <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#D4AF37] font-medium">
                                {metric.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
