import { Hero } from "../components/Hero";
import { WhoWeAre } from "../components/WhoWeAre";
import { InsightToImpact } from "../components/InsightToImpact";
import { Offerings } from "../components/Offerings";
import { WhyHLCC } from "../components/WhyHLCC";
import { ImpactAtScale } from "../components/Metrics";
import { Insights } from "../components/Insights";
import { FAQ } from "../components/FAQ";
import { useSEO } from "@/hooks/useSEO";
import { pageSEO } from "@/lib/seo";
import { OrganizationSchema, WebSiteSchema } from "@/components/StructuredData";

interface HomeProps {
  onBookConsultation: () => void;
}

export default function Home({ onBookConsultation }: HomeProps) {
  useSEO(pageSEO.home);

  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <main>
        <Hero onBookConsultation={onBookConsultation} />
        <WhoWeAre />
        <InsightToImpact />
        <Offerings />
        <WhyHLCC />
        <ImpactAtScale />
        {/* <Testimonials /> */}
        {/*<CaseStudies />*/}
        <Insights />
        <FAQ />
      </main>
    </>
  );
}
