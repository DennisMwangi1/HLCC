"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Quote, Linkedin } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { useSEO } from "@/hooks/useSEO";
import { pageSEO } from "@/lib/seo";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

function AnimatedNumber({ value }: { value: number; suffix?: string; }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const animation = animate(count, value, { duration: 2, ease: "easeOut" });
      return animation.stop;
    }
  }, [inView, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function About() {
  useSEO(pageSEO.about);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ];

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="bg-white">
        <AboutHero />
        <OurStory />
        <OurPurpose />
        <OurPhilosophy />
        <OurTeam />
        <OurImpact />
      </main>
    </>
  );
}

function SectionContainer({ children, className = "" }: { children: React.ReactNode; className?: string; }) {
  return (
    <section className={`py-32 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">{children}</div>
    </section>
  );
}

// 0) About Hero
function AboutHero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.1] pointer-events-none" />
      <div className="container relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.2em' }}
          transition={{ duration: 1 }}
          className="text-[#D4AF37] uppercase text-[10px] font-bold mb-8"
        >
          The Heritage
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-heading font-light text-white mb-8"
        >
          Human-Centered <br />
          <span className="italic">Excellence</span>
        </motion.h1>
      </div>
    </section>
  );
}

// 1) Our Story
function OurStory() {
  const timeline = [
    {
      number: "2016",
      title: "The Genesis",
      description: "Founded as Elite HR Solutions Ltd, rooted in the conviction that people are an organization's most valuable asset.",
    },
    {
      number: "2020",
      title: "Regional Expansion",
      description: "Growing across East Africa, becoming a trusted partner for culture-first organizational design.",
    },
    {
      number: "2025",
      title: "A New Dawn",
      description: "Rebranded to HLCC — a refined identity reflecting our evolved expertise in leadership and institutional culture.",
    },
    {
      number: "2026",
      title: "Global Horizon",
      description: "Scaling our impact across the continent and beyond, redefining what it means to lead with humanity.",
    },
  ];

  return (
    <SectionContainer className="bg-white">
      <div className="max-w-4xl mx-auto text-center mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-heading font-light text-black mb-12"
        >
          Our <span className="italic">Evolution</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-black/60 font-light leading-relaxed"
        >
          From our roots in 2016 to our current standing as a premier advisory firm, our journey has been defined by a singular focus: aligning the human spirit with organizational strategy.
        </motion.p>
      </div>

      <div className="relative">
        <ProcessTimeline steps={timeline} />
      </div>
    </SectionContainer>
  );
}

// 2) Our Purpose
function OurPurpose() {
  return (
    <section className="py-40 relative bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.1] pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Quote className="w-12 h-12 mx-auto mb-12 text-[#D4AF37]/30" strokeWidth={1} />
            <h3 className="text-3xl md:text-5xl font-heading font-light text-white leading-tight mb-12 italic">
              "People are not just part of the plan, <br className="hidden md:block" />
              they <span className="text-[#D4AF37] not-italic font-sans font-bold">are</span> the plan."
            </h3>
            <p className="text-white/50 text-xl font-light leading-relaxed max-w-2xl mx-auto">
              HLCC exists to harmonize people, culture, and leadership. We design environments where belonging drives performance and leadership is practiced with courage and empathy.
            </p>
            <div className="mt-16 h-px w-24 mx-auto bg-[#D4AF37]/50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// 3) Our Philosophy
function OurPhilosophy() {
  const pillars = [
    {
      title: "ELITE EMPATHY",
      desc: "We start with deep listening, designing with humanity at the center to build trust and lasting growth.",
    },
    {
      title: "RATIONAL RIGOR",
      desc: "We turn behavioral science into practical tools that make culture and leadership come alive every day.",
    },
    {
      title: "RADICAL CONNECTION",
      desc: "We create spaces where professional relationships spark clarity, courage, and enduring performance.",
    },
  ];

  return (
    <SectionContainer className="bg-[#fafafa]">
      <div className="text-center mb-24">
        <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-6">
          The Approach
        </p>
        <h2 className="text-4xl md:text-5xl font-heading font-light text-black mb-8">
          Our <span className="italic">Philosophy</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-12 border border-black/5 bg-white group hover:border-[#D4AF37]/30 transition-all duration-700"
          >
            <h3 className="text-sm font-bold tracking-[0.2em] text-black mb-6 group-hover:text-[#D4AF37] transition-colors">
              {p.title}
            </h3>
            <p className="text-black/50 font-light leading-relaxed">
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}

interface Advisor {
  name: string;
  title: string;
  bio: string;
  image?: string;
}

// Advisor Card Component
function AdvisorCard({ advisor, index }: { advisor: Advisor; index: number; }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-black mb-6">
          {advisor.image ? (
            <img
              src={advisor.image}
              alt={advisor.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/10 text-6xl font-heading uppercase italic">
              {advisor.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent text-white">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Read Bio
            </p>
            <h3 className="text-xl font-heading font-light">{advisor.name}</h3>
            <p className="text-xs font-light text-white/50 tracking-wide mt-1 uppercase">{advisor.title}</p>
          </div>
        </div>
      </motion.div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-none border-none p-0 scrollbar-hide">
          <div className="grid md:grid-cols-2">
            <div className="bg-black aspect-square md:aspect-auto">
              {advisor.image && <img src={advisor.image} className="w-full h-full object-cover" />}
            </div>
            <div className="p-12 flex flex-col justify-center">
              <p className="text-[#D4AF37] uppercase tracking-[0.2em] text-[10px] font-bold mb-4">Strategic Advisor</p>
              <h2 className="text-3xl font-heading font-light text-black mb-2">{advisor.name}</h2>
              <p className="text-sm font-light text-black/40 uppercase tracking-widest mb-8">{advisor.title}</p>
              <div className="prose prose-sm font-light text-black/60 leading-relaxed max-h-64 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-black/10">
                {advisor.bio}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// 4) Our Team
function OurTeam() {
  const advisors = [
    {
      name: "Carol Koech",
      title: "Strategic Advisor",
      bio: "Carol Koech is the Vice President for Africa at the Global Energy Alliance for People and Planet (GEAPP). With over 15 years of leadership in energy, infrastructure, and consumer sectors.",
      image: "/assets/img/Koech.jpeg",
    },
    {
      name: "Kezie Karuoro",
      title: "Strategic Advisor",
      bio: "Kezie Karuoro Kihara is a visionary HR Leader and Global Executive Leadership Coach with over 20 years of distinguished experience driving strategic human resources and organizational transformation.",
      image: "/assets/img/Kezie-K.jpg",
    },
    {
      name: "Major Boke Kitangita",
      title: "Strategic Advisor",
      bio: "Major Boke is a co-founder & CEO of Jeff Hamilton; an integrated outsourcing company focusing on Staff Outsourcing, Security Services and Talent Acquisition.",
      image: "/assets/img/Major-B.jpg",
    },
    {
      name: "Joshua Siwa",
      title: "Strategic Advisor",
      bio: "Joshua is a strategic business leader and seasoned CFO with 18+ years of experience transforming finance into a strategic driver of growth.",
      image: "/assets/img/Josh.jpg",
    }
  ];

  const team = [
    {
      name: "Wanjiru Mwangi",
      title: "Chief People Architect",
      linkedin: "https://www.linkedin.com/in/carolinewmwangi/",
      image: "/assets/img/wanjiru.jpg",
    },
    {
      name: "Carolyne Mutheu",
      title: "Chief of Staff",
      linkedin: "https://www.linkedin.com/in/carolyne-mutheu-699342b0/",
      image: "/assets/img/carolyne.jpg",
    },
    {
      name: "Leah Heho",
      title: "Senior Associate",
      linkedin: "#",
      image: "/assets/img/Leah.jpg",
    },
    {
      name: "Stella Kamau",
      title: "Executive Assistant",
      linkedin: "#",
      image: "/assets/img/Stella.jpg",
    }
  ];

  return (
    <SectionContainer className="bg-white">
      {/* Advisors */}
      <div className="mb-40">
        <div className="text-center mb-24">
          <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-6">
            Strategic Guidance
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-light text-black mb-8">
            Board of <span className="italic">Advisors</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {advisors.map((advisor, i) => (
            <AdvisorCard key={advisor.name} advisor={advisor} index={i} />
          ))}
        </div>
      </div>

      {/* Internal Team */}
      <div>
        <div className="text-center mb-24">
          <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-6">
            The Artisans
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-light text-black mb-8">
            The <span className="italic">Core Team</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center text-center"
            >
              <div className="w-48 h-48 rounded-full overflow-hidden mb-8 border border-black/5 grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className="text-lg font-heading font-light text-black mb-1">{member.name}</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-bold mb-6">{member.title}</p>
              <a href={member.linkedin} className="text-black/20 hover:text-[#0A66C2] transition-colors"><Linkedin h-4 w-4 /></a>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

// 5) Our Impact
function OurImpact() {
  const metrics = [
    { label: "Institutional Transformation", value: 50, suffix: "+" },
    { label: "Leadership Evolution", value: 400, suffix: "+" },
    { label: "Sustainability Growth", value: 97, suffix: "%" },
  ];

  return (
    <section className="py-40 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.1] pointer-events-none" />
      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-6">
            Measurable Value
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-light mb-8">
            Our <span className="italic">Impact</span> In Numbers
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {metrics.map((m) => (
            <div key={m.label} className="text-center group">
              <div className="text-6xl md:text-7xl font-heading font-light text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform duration-500">
                <AnimatedNumber value={m.value} />
                {m.suffix}
              </div>
              <div className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-bold">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
