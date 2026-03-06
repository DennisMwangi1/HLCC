"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { services } from "../../content/services";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { pageSEO } from "@/lib/seo";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

export default function ServicesOverview() {
  useSEO(pageSEO.services);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ];

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="bg-white">
        {/* Intro */}
        <section className="relative h-[50vh] flex items-center justify-center bg-black overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.1] pointer-events-none" />
          <div className="container relative z-10 text-center">
            <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-8">
              The Capabilities
            </p>
            <h1 className="text-5xl md:text-7xl font-heading font-light text-white mb-8">
              Unlocking <span className="italic">Human</span> Potential
            </h1>
            <p className="text-white/50 text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Bridging leadership, culture, and strategy to build workplaces where people inspire performance.
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section className="py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {services.map((s, i) => (
                <ServiceCard key={s.slug} service={s} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-40 bg-[#050505] text-white overflow-hidden relative border-t border-white/5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.05] pointer-events-none" />
          <div className="container relative mx-auto px-4 md:px-6 z-10">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-8">
                Engagement
              </p>
              <h2 className="text-4xl md:text-5xl font-heading font-light mb-12 leading-tight">
                Workplaces do not transform <span className="italic">by accident.</span>
                <br />
                <span className="block mt-4 text-[#D4AF37] font-sans font-bold uppercase tracking-widest text-sm">Let’s make yours intentional.</span>
              </h2>
              <Button asChild className="bg-[#D4AF37] text-black hover:bg-[#F3E5AB] transition-all duration-500 rounded-none px-12 py-8 text-xs uppercase tracking-widest font-bold">
                <a href="/contact">Book a Private Consultation</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function ServiceCard({ service: s, index: i }: { service: typeof services[0]; index: number; }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: i * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={() => navigate(`/services/${s.slug}`)}
    >
      <div className="relative aspect-video overflow-hidden bg-black mb-10">
        <img
          src={s.heroImage ?? '/assets/img/wanjiru.jpg'}
          alt={`${s.title} image`}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700" />
      </div>

      <div className="border-l border-black/5 pl-8 group-hover:border-[#D4AF37] transition-colors duration-500">
        <p className="text-[#D4AF37] uppercase tracking-[0.2em] text-[10px] font-bold mb-4 italic">{s.tagline}</p>
        <h3 className="text-2xl font-heading font-light text-black mb-6 group-hover:text-[#D4AF37] transition-colors duration-300">
          {s.title}
        </h3>
        <p className="text-black/50 font-light text-base leading-relaxed mb-8 line-clamp-3">
          {s.description}
        </p>

        <div className="flex items-center gap-4 text-black text-[10px] font-bold uppercase tracking-[0.2em] group/link">
          <span>Explore Discovery</span>
          <ArrowRight className="h-4 w-4 transform group-hover/link:translate-x-2 transition-transform duration-500" />
        </div>
      </div>
    </motion.div>
  );
}
