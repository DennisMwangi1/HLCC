import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock, Briefcase } from "lucide-react";
import { activeJobPostings, isApplicationClosed } from "@/content/careers";
import { useSEO } from "@/hooks/useSEO";
import { pageSEO } from "@/lib/seo";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { useState } from "react";

export default function CareersList() {
    useSEO(pageSEO.careers);

    const breadcrumbs = [
        { name: "Home", url: "/" },
        { name: "Careers", url: "/careers" },
    ];

    const departments = [
        "All",
        ...Array.from(new Set(activeJobPostings.map((j) => j.department))),
    ];
    const [activeDepartment, setActiveDepartment] = useState("All");

    const filtered =
        activeDepartment === "All"
            ? activeJobPostings
            : activeJobPostings.filter((j) => j.department === activeDepartment);

    return (
        <>
            <OrganizationSchema />
            <BreadcrumbSchema items={breadcrumbs} />
            <main className="bg-white">
                {/* HERO */}
                <section className="relative h-[50vh] flex items-center bg-slate-900 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900opacity-[0.1] pointer-events-none" />
                    <div className="container relative z-10">
                        <div className="max-w-4xl">
                            <motion.p
                                initial={{ opacity: 0, letterSpacing: "0.4em" }}
                                animate={{ opacity: 1, letterSpacing: "0.2em" }}
                                transition={{ duration: 1 }}
                                className="text-[#D4AF37] uppercase text-[10px] font-bold mb-8 flex items-center gap-4"
                            >
                                <span className="w-12 h-px bg-[#D4AF37]/50" />
                                Opportunities
                            </motion.p>
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-5xl md:text-7xl font-heading font-light text-white mb-8 leading-tight"
                            >
                                Shape the <span className="italic">Future</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl text-white/50 font-light italic max-w-2xl leading-relaxed"
                            >
                                Join our mission to transform leadership and culture across
                                Africa. Explore open positions below.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* DEPARTMENT FILTER */}
                <section className="border-b border-black/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex items-center gap-8 py-6 overflow-x-auto no-scrollbar">
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setActiveDepartment(dept)}
                                    className={`text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 pb-1 border-b-2 ${activeDepartment === dept
                                            ? "text-black border-[#D4AF37]"
                                            : "text-black/30 border-transparent hover:text-black/60"
                                        }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* JOB LISTINGS */}
                <section className="py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        {filtered.length === 0 ? (
                            <div className="text-center py-32">
                                <p className="text-black/30 font-light text-lg italic">
                                    No open positions in this department at the moment.
                                </p>
                            </div>
                        ) : (
                            <div className="max-w-4xl mx-auto space-y-0">
                                {filtered.map((job, index) => {
                                    const closed = isApplicationClosed(job);
                                    return (
                                    <motion.div
                                        key={job.slug}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Link
                                            to={`/careers/${job.slug}`}
                                            className="group block border-b border-black/5 py-10 first:pt-0"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <h2 className="text-2xl md:text-3xl font-heading font-light text-black group-hover:text-[#D4AF37] transition-colors duration-500">
                                                            {job.title}
                                                        </h2>
                                                        {closed && (
                                                            <span className="inline-flex items-center px-3 py-1 text-[9px] font-bold uppercase tracking-widest bg-red-50 text-red-600 border border-red-100 rounded-full">
                                                                Applications Closed
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-black/30">
                                                        <span className="flex items-center gap-2">
                                                            <Briefcase
                                                                className="w-3 h-3 text-[#D4AF37]"
                                                                strokeWidth={1.5}
                                                            />
                                                            {job.department}
                                                        </span>
                                                        <span className="flex items-center gap-2">
                                                            <MapPin
                                                                className="w-3 h-3 text-[#D4AF37]"
                                                                strokeWidth={1.5}
                                                            />
                                                            {job.location}
                                                        </span>
                                                        <span className="flex items-center gap-2">
                                                            <Clock
                                                                className="w-3 h-3 text-[#D4AF37]"
                                                                strokeWidth={1.5}
                                                            />
                                                            {job.type}
                                                        </span>
                                                    </div>
                                                    <p className="text-black/40 font-light text-sm leading-relaxed line-clamp-2 max-w-xl">
                                                        {job.description}
                                                    </p>
                                                </div>
                                                <div className={`flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:gap-6 transition-all duration-500 shrink-0 ${closed ? 'text-black/30' : 'text-black'}`}>
                                                    {closed ? 'View Details' : 'View & Apply'}{" "}
                                                    <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                                                </div>
                                            </div>
                                            <div className="mt-4 text-[9px] font-bold uppercase tracking-widest text-black/20">
                                                Posted {job.postedDate}
                                                {job.closingDate && (
                                                    <span className={closed ? 'text-red-400' : ''}>
                                                        {" "}
                                                        · {closed ? 'Closed' : 'Closes'} {job.closingDate}
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA SECTION */}
                <section className="py-24 bg-slate-900 text-white">
                    <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
                        <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-[9px] font-bold mb-8">
                            Don't see the right fit?
                        </p>
                        <h2 className="text-3xl md:text-4xl font-heading font-light mb-6 italic">
                            Send us your profile
                        </h2>
                        <p className="text-white/40 font-light leading-relaxed mb-12">
                            We are always looking for exceptional talent. Share your CV and a
                            brief introduction at{" "}
                            <a
                                href="mailto:applications@hlcc.africa"
                                className="text-[#D4AF37] hover:underline"
                            >
                                applications@hlcc.africa
                            </a>{" "}
                            and we will keep you in mind for future opportunities.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}
