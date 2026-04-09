import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

export default function NotFound() {
    useSEO({
        title: "Page Not Found | HLCC",
        description: "The page you are looking for does not exist or has been moved.",
        keywords: [],
        url: "https://hlcc.africa/404",
    });

    return (
        <main className="bg-white">
            <section className="relative min-h-[80vh] flex items-center bg-slate-900 overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                            backgroundSize: "40px 40px",
                        }}
                    />
                </div>

                <div className="container relative z-10 mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-[#D4AF37]/20 text-[160px] md:text-[220px] font-heading font-light leading-none select-none">
                                404
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="-mt-12 md:-mt-16"
                        >
                            <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-bold mb-6 flex items-center justify-center gap-4">
                                <span className="w-8 h-px bg-[#D4AF37]/50" />
                                Page Not Found
                                <span className="w-8 h-px bg-[#D4AF37]/50" />
                            </p>
                            <h1 className="text-3xl md:text-5xl font-heading font-light text-white mb-6 leading-tight">
                                We can't find what you're{" "}
                                <span className="italic">looking for</span>
                            </h1>
                            <p className="text-white/40 font-light text-lg leading-relaxed max-w-xl mx-auto mb-12">
                                The page you requested may have been moved, renamed, or
                                doesn't exist. Let's get you back on track.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link
                                to="/"
                                className="inline-flex items-center gap-3 bg-[#D4AF37] text-slate-900 hover:bg-white px-8 py-4 text-[10px] uppercase tracking-widest font-bold transition-colors duration-500"
                            >
                                <Home className="w-3.5 h-3.5" />
                                Back to Home
                            </Link>
                            <button
                                onClick={() => window.history.back()}
                                className="inline-flex items-center gap-3 border border-white/10 text-white/60 hover:text-white hover:border-white/30 px-8 py-4 text-[10px] uppercase tracking-widest font-bold transition-all duration-500"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                Go Back
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
