import { Hero } from "../components/Hero";
import { WhoWeAre } from "../components/WhoWeAre";
import { InsightToImpact } from "../components/InsightToImpact";
import { Offerings } from "../components/Offerings";
import { WhyHLCC } from "../components/WhyHLCC";
import { ImpactAtScale } from "../components/Metrics";
import { Testimonials } from "../components/Testimonials";
import { CaseStudies } from "../components/CaseStudies";
import { Insights } from "../components/Insights";
import { FAQ } from "../components/FAQ";

interface HomeProps {
  onBookConsultation: () => void;
}

export default function Home({ onBookConsultation }: HomeProps) {
  return (
    <main>
      <Hero onBookConsultation={onBookConsultation} />
      <WhoWeAre />
      <InsightToImpact />
      <Offerings />
      <WhyHLCC />
      <ImpactAtScale />
      <Testimonials />
      <CaseStudies />
      <Insights />
      <FAQ />
    </main>
  );
}
