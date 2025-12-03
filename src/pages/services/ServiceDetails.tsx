"use client";

import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, } from "framer-motion";
import { serviceBySlug } from "../../content/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="border-b border-gray-200 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-start justify-between gap-4 text-left group"
      >
        <h4 className="font-semibold text-[var(--navy-dark)] group-hover:text-[var(--blue-accent)] transition-colors">
          {question}
        </h4>
        <ChevronDown
          className={`w-5 h-5 text-[var(--gold-accent)] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="overflow-hidden"
      >
        <p className="text-gray-600 pb-5 leading-relaxed">{answer}</p>
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
    transition={{ duration: 0.4, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -4, scale: 1.02 }}
  >
    <Card className="h-full border-2 border-transparent hover:border-[var(--gold-accent)]/30 transition-all duration-300 shadow-sm hover:shadow-lg">
      <CardContent className="p-6 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--blue-accent)]/10 to-[var(--gold-accent)]/10 flex items-center justify-center">
          <Icon className="w-7 h-7 text-[var(--blue-accent)]" />
        </div>
        <h3 className="font-semibold text-[var(--navy-dark)] mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

interface MethodologyPillProps {
  text: string;
  index: number;
}

const MethodologyPill = ({ text, index }: MethodologyPillProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    viewport={{ once: true }}
    className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
  >
    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] group-hover:scale-125 transition-transform" />
    <span className="text-gray-700 text-sm font-medium">{text}</span>
  </motion.div>
);

export default function ServiceDetails() {
  const { slug } = useParams<{ slug: string; }>();
  const service = useMemo(() => (slug ? serviceBySlug[slug] : undefined), [slug]);

  // SEO configuration for service page
  useSEO(
    service
      ? {
        title: `${service.title} - ${service.tagline} | HLCC`,
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
      <main className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl text-[var(--navy-dark)] font-semibold mb-4">Service not found</h1>
          <p className="text-gray-600 mb-8">The service you are looking for does not exist.</p>
          <Button asChild>
            <Link to="/services">Back to Services</Link>
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
      <main>
        {/* ============================================================================ */}
        {/* HERO SECTION - Premium, immersive introduction with parallax effect */}
        {/* ============================================================================ */}
        <section className="relative py-32 text-white overflow-hidden">
          {/* Background with overlay */}
          {service.heroImage ? (
            <div className="absolute inset-0">
              <ImageWithFallback
                src={service.heroImage}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[var(--navy-dark)]" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy-dark)] via-[var(--navy-medium)] to-[var(--navy-dark)]" />
          )}

          {/* Decorative glow elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--blue-accent)]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[var(--gold-accent)]/10 rounded-full blur-3xl" />

          <div className="relative container mx-auto px-4 md:px-6">
            <div className="max-w-4xl">
              {/* Breadcrumb with animated entrance */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <div className="p-[2px] rounded-2xl bg-gradient-to-br from-[var(--blue-accent)] to-[var(--gold-accent)]">
                  <div className="w-16 h-16 rounded-2xl bg-white overflow-hidden flex items-center justify-center">
                    <img
                      src={service.heroImage ?? '/assets/img/wanjiru.jpg'}
                      alt={`${service.title} thumbnail`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-sm text-white/80 font-medium tracking-wide">HLCC Services</span>
              </motion.div>

              {/* Main heading with stagger animation */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold leading-tight mb-4 bg-gradient-to-r from-white to-white/90 bg-clip-text"
              >
                {service.title}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-white/90 italic mb-8 max-w-2xl"
              >
                {service.tagline}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] text-white hover:opacity-90 shadow-lg"
                >
                  <Link to="/contact">Start a Conversation</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================================ */}
        {/* OVERVIEW SECTION - Clear introduction with highlighted outcome */}
        {/* ============================================================================ */}
        <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100/50 overflow-hidden">
          {/* Subtle decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--blue-accent)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--gold-accent)]/5 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              {/* Main description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--navy-dark)] mb-6">
                  Overview
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>

              {/* Outcome card with gradient accent */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="relative overflow-hidden border-2 border-[var(--gold-accent)]/20 shadow-lg hover:shadow-xl transition-shadow">
                  {/* Decorative gradient */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)]" />

                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-[var(--gold-accent)]" />
                      <CardTitle className="text-[var(--navy-dark)]">Expected Outcome</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-gray-700 leading-relaxed font-medium">
                      {service.outcome}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================================ */}
        {/* FOCUS AREAS & METHODOLOGY - What we do and how we do it */}
        {/* ============================================================================ */}
        <section className="relative py-20 bg-gradient-to-b from-[var(--navy-dark)]/5 via-slate-50 to-white overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="container mx-auto px-4 md:px-6">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--navy-dark)] mb-4">
                Our Approach
              </h2>
              <p className="text-lg text-gray-600">
                We combine deep expertise with practical solutions to deliver measurable impact
              </p>
            </motion.div>

            {/* Focus areas grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-20 max-w-5xl mx-auto">
              {service.focusAreas.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="h-full border-2 border-transparent hover:border-[var(--gold-accent)]/30 transition-all duration-300 shadow-sm hover:shadow-lg group">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--blue-accent)] to-[var(--gold-accent)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--navy-dark)] mb-2 text-lg">
                          {item}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Methodology section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 md:p-12 border border-slate-200/50"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--blue-accent)]/10 to-[var(--gold-accent)]/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[var(--blue-accent)]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--navy-dark)]">
                  Our Methodology
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {service.methodology.map((item, i) => (
                  <MethodologyPill key={i} text={item} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================================ */}
        {/* PROCESS TIMELINE - Step-by-step engagement flow */}
        {/* ============================================================================ */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--navy-dark)] mb-4">
                Our Process
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A clear, structured approach to ensure your success
              </p>
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

        {/* ============================================================================ */}
        {/* FAQ SECTION - Collapsible questions with smooth animations */}
        {/* ============================================================================ */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--navy-dark)] mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600">
                  Everything you need to know about working with us
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-200/50"
              >
                {service.faq.map((faq, i) => (
                  <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================================================ */}
        {/* WHY CHOOSE US - Feature highlights with icon variety */}
        {/* ============================================================================ */}
        <section className="relative py-20 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30 overflow-hidden">
          {/* Subtle accent background */}
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.02] pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--navy-dark)] mb-4">
                Why Choose HLCC for {service.title.split('&')[0].trim()}
              </h2>
              <p className="text-lg text-gray-600">
                We bring together deep expertise, practical tools, and a commitment to your success
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <FeatureCard
                icon={Award}
                title="Proven Expertise"
                description="15+ years of experience in organizational development and leadership"
                index={0}
              />
              <FeatureCard
                icon={Target}
                title="Custom Solutions"
                description="Tailored approaches that address your unique challenges and goals"
                index={1}
              />
              <FeatureCard
                icon={Sparkles}
                title="Practical Tools"
                description="Actionable frameworks and resources for immediate application"
                index={2}
              />
              <FeatureCard
                icon={TrendingUp}
                title="Measurable Impact"
                description="Clear metrics and evaluation to track progress and ROI"
                index={3}
              />
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
