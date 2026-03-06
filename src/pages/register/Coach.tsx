"use client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Check, ArrowRight } from "lucide-react";
import { DynamicForm } from "../../components/DynamicForm.tsx";
import { coachFormSchema } from "../../lib/formSchemas.ts";
import { useSEO } from "@/hooks/useSEO";
import { pageSEO } from "@/lib/seo";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

export default function RegisterCoach() {
  useSEO(pageSEO.registerCoach);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Register as Coach', url: '/register/coach' },
  ];

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbs} />
      <main>
        <Hero />
        <WhyJoin />
        <Eligibility />
        <ApplicationForm />
      </main>
    </>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string; }) {
  return (
    <section className={className}>
      <div className="container mx-auto px-4 md:px-6">{children}</div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative h-[60vh] flex items-center text-white overflow-hidden bg-black">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/assets/img/coach.avif"
          alt="Coaching and leadership in action"
          className="w-full h-full object-cover grayscale opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black/20" />
      </div>
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            transition={{ duration: 1 }}
            className="text-[#D4AF37] uppercase text-[10px] font-bold mb-8 flex items-center gap-4"
          >
            <span className="w-12 h-px bg-[#D4AF37]/50" />
            The Fellowship
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-heading font-light leading-tight mb-8"
          >
            Nurture the <span className="italic">Exceptional.</span>
            <span className="block text-[#D4AF37]">
              Join our Coaching Network.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/50 font-light italic mb-12 max-w-2xl leading-relaxed"
          >
            Shape organizational culture and empower high-impact leaders across Africa and beyond through bespoke, human-centered coaching.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-8"
          >
            <Button asChild className="bg-[#D4AF37] text-black hover:bg-[#F3E5AB] transition-all duration-500 rounded-none px-12 py-8 text-xs uppercase tracking-widest font-bold">
              <a href="#apply">Apply for Fellowship</a>
            </Button>
            <Button asChild variant="ghost" className="text-white hover:text-[#D4AF37] transition-all duration-500 rounded-none px-0 text-xs uppercase tracking-widest font-bold border-b border-white/20 hover:border-[#D4AF37]">
              <Link to="/services/leadership-training" className="flex items-center gap-4">
                The HLCC Standard <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhyJoin() {
  const bullets = [
    "Collaborate with a human centered, globally minded firm shaping leadership and culture through evidence based coaching, shared learning, and meaningful impact",
  ];

  return (
    <Section className="py-32 bg-white">
      <div className="grid lg:grid-cols-2 gap-24 items-start max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-bold mb-8">The Association</p>
          <h2 className="text-4xl font-heading font-light text-black mb-8 italic">Partner with Purpose</h2>
          <div className="space-y-8 text-black/50 font-light text-lg leading-relaxed">
            <p>
              Join a distinguished network of global practitioners dedicated to shaping cultures where people and performance flourish. At HLCC, we believe true transformation begins with courageous leaders and workplaces where belonging drives excellence.
            </p>
            <p>
              Be part of a purpose-led community that blends evidence-based rigor with deep human insight, creating lasting equilibrium in how organizations lead, live, and grow.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="p-12 bg-[#fafafa] border border-black/5">
            <h3 className="text-xs uppercase tracking-[0.3em] text-black font-bold mb-12">The Value Proposition</h3>
            <ul className="space-y-8">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-6">
                  <div className="w-10 h-10 bg-white border border-black/5 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-[#D4AF37]" strokeWidth={1} />
                  </div>
                  <span className="text-black/70 font-light text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Eligibility() {
  const mustHave = [
    "Accredited coaching certification (ICF or similar) or demonstrable equivalent experience",
    "3–7+ years coaching leaders and/or teams in complex environments",
    "Strong facilitation skills; able to hold safe, challenging, growth-oriented spaces",
    "Ability to operate across cultures; high emotional intelligence and empathy",
  ];

  const niceToHave = [
    "Organizational development, culture transformation, or HR strategy experience",
    "Experience with assessments, diagnostics, and data-informed practice",
    "Sector familiarity in financial services, energy, tech, healthcare, or public sector",
  ];

  return (
    <Section className="py-32 bg-[#fafafa] border-y border-black/5">
      <div className="max-w-5xl mx-auto">
        <div className="mb-24 text-center">
          <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-bold mb-6">Requirements</p>
          <h2 className="text-4xl md:text-5xl font-heading font-light text-black italic">The HLCC Profile</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div className="p-10 bg-white border border-black/5">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-black mb-12">Core Rigor</h3>
            <ul className="space-y-6">
              {mustHave.map((item, i) => (
                <li key={i} className="flex gap-4 text-black/50 font-light text-sm leading-relaxed">
                  <span className="text-[#D4AF37] font-heading italic text-lg">{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 bg-white border border-black/5">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-black mb-12">Complementary Nuance</h3>
            <ul className="space-y-6">
              {niceToHave.map((item, i) => (
                <li key={i} className="flex gap-4 text-black/50 font-light text-sm leading-relaxed">
                  <span className="text-black/20 font-heading italic text-lg">{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-3xl mx-auto p-12 bg-black text-white text-center">
          <p className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">A Note on Potential</p>
          <h3 className="text-2xl font-heading font-light italic mb-6">Emerging Talents</h3>
          <p className="text-white/40 font-light text-sm leading-relaxed">
            If your journey is unfolding but your commitment to human-centered change is absolute, we invite you to share your story. HLCC values raw potential as much as established tenure.
          </p>
        </div>
      </div>
    </Section>
  );
}

function ApplicationForm() {
  return (
    <Section className="py-32 bg-white" >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-bold mb-6">Enrollment</p>
          <h2 id="apply" className="text-4xl md:text-5xl font-heading font-light text-black italic mb-8">
            Registration Brief
          </h2>
          <p className="text-black/40 font-light text-lg max-w-2xl mx-auto italic">
            Your details are treated with the utmost discretion and professional confidentiality.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <DynamicForm schema={coachFormSchema as any} />
        </div>
      </div>
    </Section>
  );
}

