"use client";

import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, } from "framer-motion";
import { serviceBySlug } from "../../content/services";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { CheckCircle, ChevronDown, Sparkles, Target, TrendingUp, Award } from "lucide-react";
import { ProcessTimeline } from "../../components/ui/ProcessTimeline";
import { useSEO } from "@/hooks/useSEO";
import { getAbsoluteUrl } from "@/lib/seo";
import { OrganizationSchema, ServiceSchema, BreadcrumbSchema } from "@/components/StructuredData";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem = ({ question, answer, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border-b border-black/5 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-start justify-between gap-8 text-left group"
      >
        <h4 className="text-xl font-heading font-light text-black group-hover:text-[#D4AF37] transition-colors">
          {question}
        </h4>
        <ChevronDown
          className={`w-5 h-5 text-[#D4AF37]/50 flex-shrink-0 transition-transform duration-500 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="overflow-hidden"
      >
        <p className="text-black/60 font-light pb-8 leading-relaxed text-lg max-w-3xl">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

interface FeatureCardProps {
  icon: typeof CheckCircle;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="p-10 border border-black/5 bg-white group hover:border-[#D4AF37]/30 transition-all duration-700"
  >
    <Icon className="w-8 h-8 text-[#D4AF37] mb-8 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
    <h3 className="text-sm font-bold tracking-[0.2em] text-black mb-4 uppercase">{title}</h3>
    <p className="text-black/50 font-light text-sm leading-relaxed">{description}</p>
  </motion.div>
);

interface MethodologyPillProps {
  text: string;
  index: number;
}

const MethodologyPill = ({ text, index }: MethodologyPillProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    viewport={{ once: true }}
    className="px-6 py-3 border border-black/10 rounded-none text-[10px] font-bold uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white transition-all duration-500 cursor-default"
  >
    {text}
  </motion.div>
);

export default function ServiceDetails() {
  const { slug } = useParams<{ slug: string; }>();
  const service = useMemo(() => (slug ? serviceBySlug[slug] : undefined), [slug]);

  // SEO configuration for service page
  useSEO(
    service
      ? {
        title: `${service.title} | HLCC`,
        description: service.description,
        keywords: service.focusAreas,
        image: service.heroImage || '/assets/img/capacity-building.webp',
        url: getAbsoluteUrl(`/services/${service.slug}`),
        type: 'website',
      }
      : undefined
  );

  const breadcrumbs = service
    ? [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/services' },
      { name: service.title, url: `/services/${service.slug}` },
    ]
    : [];

  if (!service) {
    return (
      <main className="py-24 bg-white text-black">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-[#D4AF37] uppercase tracking-widest text-xs mb-8">Error 404</p>
          <h1 className="text-4xl font-heading font-light mb-12 italic">Capability Not Found</h1>
          <Button asChild className="bg-black text-white hover:bg-gray-800 rounded-none px-12 py-7 uppercase tracking-widest text-xs">
            <Link to="/services">Return to Capabilities</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <>
      <OrganizationSchema />
      <ServiceSchema service={service} />
      {breadcrumbs.length > 0 && <BreadcrumbSchema items={breadcrumbs} />}
      <main className="bg-white">
        {/* HERO SECTION */}
        <section className="relative h-[70vh] flex items-center text-white overflow-hidden bg-black">
          {service.heroImage && (
            <div className="absolute inset-0">
              <ImageWithFallback
                src={service.heroImage}
                alt={service.title}
                className="w-full h-full object-cover grayscale opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
            </div>
          )}

          <div className="relative container mx-auto px-4 md:px-6">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, letterSpacing: '0.3em' }}
                transition={{ duration: 1 }}
                className="text-[#D4AF37] uppercase text-[10px] font-bold mb-8 flex items-center gap-4"
              >
                <span className="w-12 h-px bg-[#D4AF37]/50" />
                HLCC Capability Center
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-heading font-light leading-tight mb-8"
              >
                {service.title.split('&').map((text, i) => (
                  <span key={i} className={i % 2 !== 0 ? 'italic block md:inline' : ''}>
                    {text}{i === 0 && service.title.includes('&') && <span className="text-[#D4AF37]">&</span>}
                  </span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-white/50 font-light italic mb-12 max-w-2xl leading-relaxed"
              >
                {service.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  asChild
                  className="bg-[#D4AF37] text-black hover:bg-[#F3E5AB] transition-all duration-500 rounded-none px-12 py-8 text-xs uppercase tracking-widest font-bold"
                >
                  <Link to="/contact">Discuss Engagement</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* OVERVIEW SECTION */}
        <section className="py-32 border-b border-black/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-5 gap-24 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:col-span-3"
              >
                <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-8">
                  The Intent
                </p>
                <h2 className="text-4xl font-heading font-light text-black mb-12 italic">
                  Executive Brief
                </h2>
                <p className="text-xl text-black/60 font-light leading-relaxed">
                  {service.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <div className="p-12 bg-[#050505] text-white">
                  <Target className="w-8 h-8 text-[#D4AF37] mb-8" strokeWidth={1} />
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/40 font-bold mb-4">Core Objective</h3>
                  <p className="text-2xl font-heading font-light italic leading-tight">
                    {service.outcome}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FOCUS AREAS & METHODOLOGY */}
        <section className="py-32 bg-[#fafafa]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center mb-24">
              <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-6">
                Frameworks
              </p>
              <h2 className="text-4xl md:text-5xl font-heading font-light text-black italic">
                Strategic Focus Areas
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-32 max-w-6xl mx-auto">
              {service.focusAreas.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-8 p-10 bg-white border border-black/5 hover:border-[#D4AF37]/30 transition-all duration-700 group"
                >
                  <div className="flex-shrink-0 text-xl font-heading italic text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="font-heading font-light text-2xl text-black">
                    {item}
                  </h3>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto pt-24 border-t border-black/5"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-12">
                <div className="flex-shrink-0">
                  <p className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Methodology</p>
                  <h3 className="text-2xl font-heading font-light text-black italic">
                    The HLCC Way
                  </h3>
                </div>
                <div className="flex flex-wrap gap-4">
                  {service.methodology.map((item, i) => (
                    <MethodologyPill key={i} text={item} index={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROCESS TIMELINE */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-6">
                Implementation
              </p>
              <h2 className="text-4xl md:text-5xl font-heading font-light text-black">
                The Engagement <span className="italic">Journey</span>
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <ProcessTimeline
                steps={service.process.map((p) => ({
                  number: p.number,
                  title: `${p.title} (${p.duration})`,
                  description: p.description,
                }))}
              />
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-32 bg-[#fafafa] border-y border-black/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-8 text-center">
                Clarification
              </p>
              <h2 className="text-4xl md:text-5xl font-heading font-light text-black text-center mb-24 italic">
                Inquiries & Answers
              </h2>

              <div className="bg-white p-12 lg:p-20 shadow-sm">
                {service.faq.map((faq, i) => (
                  <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center mb-24"
            >
              <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-6">
                Our Differentiator
              </p>
              <h2 className="text-4xl md:text-5xl font-heading font-light text-black">
                Why Partner <span className="italic">With Us</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
              <FeatureCard
                icon={Award}
                title="Proven Legacy"
                description="A decade of pioneering organizational excellence across the African continent."
                index={0}
              />
              <FeatureCard
                icon={Target}
                title="Bespoke Rigor"
                description="Tailored interventions that address the specific nuances of your institutional culture."
                index={1}
              />
              <FeatureCard
                icon={Sparkles}
                title="Actionable Insight"
                description="Actionable frameworks designed for immediate and sustained behavioral application."
                index={2}
              />
              <FeatureCard
                icon={TrendingUp}
                title="Measurable Yield"
                description="Rigorous evaluation methods to track transformation and investment return."
                index={3}
              />
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
