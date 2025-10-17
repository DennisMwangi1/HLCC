"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Quote, Users, Sparkles, BarChart3 } from "lucide-react";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";

export default function About() {
  return (
    <main>
      <OurStory />
      <OurPurpose />
      <OurPhilosophy />
      <OurTeam />
      <OurImpact />
    </main>
  );
}

function SectionContainer({ children, className = "" }: { children: React.ReactNode; className?: string; }) {
  return (
    <section className={className}>
      <div className="container mx-auto px-4 md:px-6">{children}</div>
    </section>
  );
}

// 1) Our Story
function OurStory() {
  const timeline = [
    {
      number: "2016",
      title: "Founded as Elite HR Solutions Ltd",
      description: "Rooted in people, practice, and purpose."
    },
    {
      number: "2020",
      title: "Regional Expansion",
      description: "Growing across East Africa with culture-first work."
    },
    {
      number: "2023",
      title: "Transformation to HLCC",
      description: "A new identity with the same human-centered conviction."
    },
    {
      number: "2025",
      title: "Scaling Impact",
      description: "Partnering across Africa and beyond to shape thriving cultures."
    },
  ];

  return (
    <SectionContainer className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--navy-dark)] mb-6">Our Story</h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          From Elite HR to HLCC, our journey has always been about one thing — helping
          organizations grow through people. We've evolved from an HR-focused firm to a leadership
          and culture partner, aligning strategy with lived values, people with purpose, and performance with belonging.
        </p>
      </div>

      {/* Process Timeline */}
      <div className="relative">
        <ProcessTimeline steps={timeline} />
      </div>
    </SectionContainer>
  );
}

// 2) Our Purpose
function OurPurpose() {
  return (
    <SectionContainer className="py-24 relative">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl p-10 bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-sm"
        >
          <Quote className="w-8 h-8 mx-auto mb-4 text-[var(--gold-deep)]" />
          <h3 className="text-2xl md:text-3xl font-semibold text-[var(--navy-dark)] mb-4">
            People are not just part of the plan — they are the plan.
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            HLCC exists to align people, culture, and leadership so that strategy becomes
            lived behavior. We design environments where belonging drives performance, and
            leadership is practiced with courage, empathy, and accountability.
          </p>
          <div className="mt-6 h-[3px] w-24 mx-auto bg-gradient-to-r from-[var(--gold-accent)] to-[var(--blue-accent)] animate-pulse rounded-full" />
        </motion.div>
      </div>
    </SectionContainer>
  );
}

// 3) Our Philosophy
function OurPhilosophy() {
  const pillars = [
    {
      icon: Users,
      title: "Empathy in Action",
      desc: "We lead with listening and design with people at the center — building trust and shared growth.",
    },
    {
      icon: Sparkles,
      title: "Evidence in Practice",
      desc: "Our work blends behavioral science with practical tools leaders can use every day.",
    },
    {
      icon: BarChart3,
      title: "Growth through Connection",
      desc: "We enable teams and cultures where relationships fuel clarity, courage, and performance.",
    },
  ];

  return (
    <SectionContainer className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--navy-dark)] mb-4">Our Philosophy</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Human-Centered Leadership — practical, evidence-based, and deeply relational.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-2 hover:border-[var(--gold-deep)] transition-colors">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--blue-accent)] to-[var(--gold-accent)] flex items-center justify-center mb-4">
                  <p.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl text-[var(--navy-dark)]">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600">{p.desc}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}

// 4) Our Team
function OurTeam() {
  const team = [
    {
      name: "Wanjiru K.",
      title: "Founder & CEO",
      image: "/assets/img/wanjiru.jpg",
      insight: "Leads leadership culture programs across Africa.",
    },
    {
      name: "Michael A.",
      title: "Head of Culture & Strategy",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=600&q=80",
      insight: "Designs culture diagnostics and playbooks.",
    },
    {
      name: "Amina S.",
      title: "Senior Coach",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
      insight: "Facilitates leadership labs and coaching journeys.",
    },
    {
      name: "Daniel N.",
      title: "HR Advisory Lead",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
      insight: "Builds HR systems aligned to growth and compliance.",
    },
  ];

  return (
    <SectionContainer className="py-24">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--navy-dark)] mb-4">Our Team</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A diverse team of coaches, facilitators, and culture strategists.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="group overflow-hidden">
              <div className="relative h-64">
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-white text-sm bg-white/10 backdrop-blur px-3 py-2 rounded">

                    {member.insight}
                  </div>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg text-[var(--navy-dark)]">{member.name}</CardTitle>
                    <CardDescription className="text-gray-600">{member.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}

// 5) Our Impact
function OurImpact() {
  const milestones = [
    { year: 2016, text: "Elite HR Solutions founded" },
    { year: 2020, text: "Regional expansion" },
    { year: 2023, text: "Rebranded to HLCC" },
    { year: 2025, text: "200+ projects delivered" },
  ];

  const metrics = [
    { label: "Organizations Transformed", value: 50, suffix: "+" },
    { label: "Leaders Developed", value: 10000, suffix: "+" },
    { label: "Client Retention", value: 97, suffix: "%" },
  ];

  const [counts, setCounts] = useState(metrics.map(() => 0));

  useEffect(() => {
    const duration = 1200;
    const steps = 60;
    //@ts-ignore
    const timers: NodeJS.Timeout[] = [];

    metrics.forEach((m, i) => {
      let step = 0;
      const increment = m.value / steps;
      const timer = setInterval(() => {
        step++;
        setCounts((prev) => {
          const arr = [...prev];
          arr[i] = Math.floor(Math.min(m.value, increment * step));
          return arr;
        });
        if (step >= steps) clearInterval(timer);
      }, duration / steps);
      timers.push(timer);
    });

    return () => timers.forEach(clearInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="py-24 bg-[var(--navy-dark)] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold-accent)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--blue-accent)]/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold">Our Impact</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Milestones and metrics that reflect our journey and the results we deliver.
          </p>
        </div>

        {/* Milestones timeline */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/20" />
          <div className="grid md:grid-cols-2 gap-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${i % 2 === 0 ? "md:text-right" : ""}`}
              >
                <div
                  className={`md:absolute ${i % 2 === 0 ? "right-[calc(50%+16px)]" : "left-[calc(50%+16px)]"} top-2`}
                >
                  <div className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/20 inline-block">
                    {m.year}
                  </div>
                </div>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-5 text-gray-200">{m.text}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid sm:grid-cols-3 gap-6">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15"
            >
              <div className="text-4xl md:text-5xl bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] bg-clip-text text-transparent mb-2">
                {counts[i]}
                {m.suffix}
              </div>
              <div className="text-gray-200 font-medium">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
