"use client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Check, ArrowRight } from "lucide-react";
import { DynamicForm } from "../../components/DynamicForm.tsx";
import { facilitatorFormSchema } from "../../lib/formSchemas.ts";
import { useSEO } from "@/hooks/useSEO";
import { pageSEO } from "@/lib/seo";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

export default function RegisterFacilitator() {
  useSEO(pageSEO.registerFacilitator);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Register as Facilitator', url: '/register/facilitator' },
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
        <BottomCTA />
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
          src="/assets/img/facilitator.avif"
          alt="Facilitation in action"
          className="w-full h-full object-cover grayscale opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black/20" />
      </div>
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, tracking: '0.4em' }}
            animate={{ opacity: 1, tracking: '0.2em' }}
            transition={{ duration: 1 }}
            className="text-[#D4AF37] uppercase text-[10px] font-bold mb-8 flex items-center gap-4"
          >
            <span className="w-12 h-px bg-[#D4AF37]/50" />
            The Ensemble
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-heading font-light leading-tight mb-8"
          >
            Orchestrate <span className="italic">Evolution.</span>
            <span className="block text-[#D4AF37]">
              Join our Facilitators.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/50 font-light italic mb-12 max-w-2xl leading-relaxed"
          >
            Guide leadership teams through transformative milestones across Africa through expertly designed group experiences.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-8"
          >
            <Button asChild className="bg-[#D4AF37] text-black hover:bg-[#F3E5AB] transition-all duration-500 rounded-none px-12 py-8 text-xs uppercase tracking-widest font-bold">
              <a href="#apply">Apply for Engagement</a>
            </Button>
            <Button asChild variant="ghost" className="text-white hover:text-[#D4AF37] transition-all duration-500 rounded-none px-0 text-xs uppercase tracking-widest font-bold border-b border-white/20 hover:border-[#D4AF37]">
              <Link to="/contact" className="flex items-center gap-4">
                Inquire Directly <ArrowRight className="w-4 h-4" />
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
    "Join a network of expert facilitators driving organizational transformation.",
    "Access cutting-edge facilitation tools, frameworks, and methodologies.",
    "Work with diverse clients across sectors, from startups to multinationals.",
    "Grow your practice through continuous learning and peer exchange.",
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
          <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-bold mb-8">The Collaboration</p>
          <h2 className="text-4xl font-heading font-light text-black mb-8 italic">Drive Collective Impact</h2>
          <div className="space-y-8 text-black/50 font-light text-lg leading-relaxed">
            <p>
              HLCC facilitators create engaging, impactful learning experiences that transform individuals and teams. We believe in the power of experiential learning to unlock potential and drive meaningful change.
            </p>
            <p>
              As an HLCC facilitator, you'll design and deliver programs that build leadership capacity, foster collaboration, and drive organizational effectiveness across Africa's dynamic business landscape.
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
            <h3 className="text-xs uppercase tracking-[0.3em] text-black font-bold mb-12">The Prospect</h3>
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
    "3+ years of experience facilitating workshops, trainings, or group processes",
    "Strong ability to engage and manage diverse groups effectively",
    "Experience with adult learning principles and experiential methodologies",
    "Cultural sensitivity and ability to work across different sectors and contexts"
  ];

  const niceToHave = [
    "Certification in facilitation methodologies (e.g., IAF CPF, ToT, etc.)",
    "Experience with virtual facilitation platforms and digital tools",
    "Background in leadership development, OD, or related fields",
    "Experience working in multiple African markets"
  ];

  return (
    <Section className="py-32 bg-[#fafafa] border-y border-black/5">
      <div className="max-w-5xl mx-auto">
        <div className="mb-24 text-center">
          <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-bold mb-6">Prerequisites</p>
          <h2 className="text-4xl md:text-5xl font-heading font-light text-black italic">The Facilitator Profile</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div className="p-10 bg-white border border-black/5">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-black mb-12">Required Rigor</h3>
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
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-black mb-12">Preferred Nuance</h3>
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
          <p className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">The Emerging Voice</p>
          <h3 className="text-2xl font-heading font-light italic mb-6">New Perspectives</h3>
          <p className="text-white/40 font-light text-sm leading-relaxed">
            Even those at the inception of their facilitation journey are encouraged to connect. HLCC recognizes and nurtures the seeds of profound transformative power.
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
          <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-bold mb-6">Submission</p>
          <h2 id="apply" className="text-4xl md:text-5xl font-heading font-light text-black italic mb-8">
            Facilitator Brief
          </h2>
          <p className="text-black/40 font-light text-lg max-w-2xl mx-auto italic">
            Your credentials and narrative are handled with the discretion synonymous with HLCC.
          </p>
        </div>

        <div className="p-12 lg:p-20 bg-[#fafafa] border border-black/5">
          <DynamicForm schema={facilitatorFormSchema} />
        </div>
      </div>
    </Section>
  );
}

function BottomCTA() {
  return (
    <section className="relative py-32 bg-[#050505] text-white">
      <div className="container relative mx-auto px-4 md:px-6 text-center">
        <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-[9px] font-bold mb-8">The Association</p>
        <h2 className="text-4xl md:text-6xl font-heading font-light mb-12 italic">
          Guide the conversation.
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
          <Button asChild className="bg-[#D4AF37] text-black hover:bg-[#F3E5AB] transition-all duration-500 rounded-none px-12 py-8 text-xs uppercase tracking-widest font-bold w-full sm:w-auto">
            <a href="#apply">Apply to Network</a>
          </Button>
          <Link to="/contact" className="text-xs uppercase font-bold tracking-widest text-white/40 hover:text-[#D4AF37] transition-colors border-b border-white/10 hover:border-[#D4AF37] pb-1">
            Inquire Privately
          </Link>
        </div>
      </div>
    </section>
  );
}
