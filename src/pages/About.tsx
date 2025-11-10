"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Quote, Users, Linkedin } from "lucide-react";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { useSEO } from "@/hooks/useSEO";
import { pageSEO } from "@/lib/seo";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

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
      <main>
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
      description: "Rooted in people, practice, and purpose.",
    },
    {
      number: "2020",
      title: "Regional Expansion",
      description: "Growing across East Africa with culture-first work.",
    },
    {
      number: "2025",
      title: "Rebranded to HLCC",
      description: "A new identity with the same human-centered conviction.",
    },
    {
      number: "2026",
      title: "Scaling impact",
      description: "Partnering across Africa and beyond to shape thriving cultures.",
    },
  ];

  return (
    <SectionContainer className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--navy-dark)] mb-6">Our Story</h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Founded in 2016 as Elite HR Solutions, we have grown into Human Centered Leadership & Culture Consulting (HLCC), helping organizations grow through their people.
          <br />
          We believe transformation happens when leaders live their values and culture becomes strategy. Across Africa and beyond, we align people, purpose, and performance to build workplaces where business and humanity thrive.
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
    <SectionContainer className="py-24 relative bg-[var(--navy-dark)]">
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
            People are not just part of the plan, they are the plan.
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            HLCC exists to align people, culture, and leadership so that strategy becomes lived behavior. We design environments where belonging drives performance and leadership is practiced with courage, empathy, and accountability.
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
      image: "/assets/img/empathy.png",
      title: "Empathy in Action",
      desc: "We start with people listening deeply and designing with humanity at the center to build trust and lasting growth.\n",
    },
    {
      image: "/assets/img/ebp.jpg",
      title: "Evidence in Practice",
      desc: "We turn behavioral insight into practical tools that make culture and leadership come alive every day.\n",
    },
    {
      image: "/assets/img/growth.webp",
      title: "Growth through Connection",
      desc: "We create spaces where relationships spark clarity, courage, and performance that endures.",
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
                <div className="w-20 h-14 rounded-2xl bg-gradient-to-br from-[var(--blue-accent)] to-[var(--gold-accent)] flex items-center justify-center mb-4">
                  <ImageWithFallback
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
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
      name: "Wanjiru Mwangi",
      title: "Chief People and Culture Architect",
      linkedin: "https://www.linkedin.com/in/carolinewmwangi/",
      image: "/assets/img/wanjiru.jpg",
    },
    {
      name: "Carolyne Mutheu",
      title: "Chief of Staff",
      linkedin: "https://www.linkedin.com/in/carolyne-mutheu-699342b0/",
      image: "/assets/img/carolyne.jpg",
    }
    // Add more team members here
  ];

  return (
    <SectionContainer className="py-24 bg-gradient-to-b from-white to-slate-50">
      {/* Advisory Board Section */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Strategic advisors guiding our vision and impact.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-dashed border-gray-300 bg-slate-50/50">
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 text-lg">
                Our distinguished advisory board members will be announced soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Our Staff Section */}
      <div>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--navy-dark)] mb-4">Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet Some of our team members.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-[var(--gold-deep)]">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 md:w-40 md:h-40 rounded-full object-cover border-1 border-[var(--gold-accent)] shadow-sm"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--blue-accent)] to-[var(--gold-accent)] flex items-center justify-center text-white text-2xl font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--navy-dark)] mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {member.title}
                    </p>
                  </div>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#0A66C2] hover:bg-[#004182] transition-colors"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>

          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

// 5) Our Impact
function OurImpact() {
  const milestones = [
    { year: "2016", text: "Elite HR Solutions founded" },
    { year: "2020", text: "Regional expansion" },
    { year: "2023", text: "Rebranded to HLCC" },
    { year: "2025/2026", text: "Scaling impact" },
  ];

  const metrics = [
    { label: "Organizations Transformed", value: 50, suffix: "+" },
    { label: "Leaders Developed", value: 400, suffix: "+" },
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
                  className={`md:absolute ${i % 2 === 0 ? "right-[calc(50%+16px)]" : "left-[calc(50%+16px)]"} top-4 z-10`}
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
