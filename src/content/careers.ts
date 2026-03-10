export type JobPosting = {
    slug: string;
    title: string;
    department: string;
    location: string;
    type: 'Full-time' | 'Contract' | 'Part-time';
    description: string;
    responsibilities: string[];
    requirements: string[];
    niceToHave: string[];
    salary?: string;
    postedDate: string;
    closingDate?: string;
    isActive: boolean;
};

export const jobPostings: JobPosting[] = [
    {
        slug: "senior-hr-consultant",
        title: "Senior HR Consultant",
        department: "Consulting",
        location: "Nairobi, Kenya",
        type: "Full-time",
        description:
            "We are seeking an experienced Senior HR Consultant to join our advisory practice. You will work directly with C-suite leaders across Africa, designing and implementing human-centered people strategies that drive culture transformation and organizational performance.",
        responsibilities: [
            "Lead end-to-end HR consulting engagements for enterprise clients across East and Southern Africa",
            "Conduct culture diagnostics, engagement assessments, and organizational health audits",
            "Design and facilitate leadership development programs and team coaching sessions",
            "Develop bespoke HR frameworks including compensation structures, performance systems, and talent strategies",
            "Build and maintain trusted advisory relationships with senior stakeholders",
            "Contribute to the development of HLCC's thought leadership and methodology",
        ],
        requirements: [
            "8+ years of progressive HR experience, with at least 3 years in a consulting or advisory capacity",
            "Deep expertise in culture transformation, organizational development, or talent management",
            "Proven track record of working with executive leadership teams",
            "Strong facilitation and presentation skills",
            "IHRM certification or equivalent professional HR qualification",
            "Bachelor's degree in HR, Business Administration, or related field; MBA preferred",
        ],
        niceToHave: [
            "Experience working across multiple African markets",
            "ICF coaching certification or equivalent",
            "Published thought leadership in the people and culture space",
            "Fluency in French or Swahili",
        ],
        salary: "Competitive, commensurate with experience",
        postedDate: "March 3, 2026",
        closingDate: "April 15, 2026",
        isActive: true,
    },
    {
        slug: "talent-acquisition-specialist",
        title: "Talent Acquisition Specialist",
        department: "Executive Search",
        location: "Nairobi, Kenya (Hybrid)",
        type: "Full-time",
        description:
            "Join our Executive & Talent Search practice to help place transformational leaders across Africa. You will manage the full recruitment lifecycle for mid-to-senior level positions, ensuring every placement aligns with our clients' culture, values, and strategic direction.",
        responsibilities: [
            "Manage end-to-end recruitment processes for client mandates across diverse industries",
            "Develop candidate sourcing strategies using direct headhunting, networking, and research",
            "Conduct competency-based interviews and psychometric assessments",
            "Prepare candidate briefs and present shortlists to client stakeholders",
            "Build and maintain a robust pipeline of high-caliber professionals across the continent",
            "Coordinate with clients on offer management and onboarding support",
        ],
        requirements: [
            "4+ years of experience in recruitment, executive search, or talent acquisition",
            "Strong understanding of the African talent landscape, particularly East Africa",
            "Excellent interviewing, assessment, and candidate evaluation skills",
            "Ability to manage multiple mandates simultaneously with attention to detail",
            "Outstanding written and verbal communication skills",
            "Bachelor's degree in HR, Business, Psychology, or related field",
        ],
        niceToHave: [
            "Experience with applicant tracking systems and recruitment platforms",
            "Background in retained executive search",
            "Exposure to leadership assessment frameworks",
            "Professional network across multiple African markets",
        ],
        postedDate: "February 24, 2026",
        isActive: true,
    },
];

export const activeJobPostings = jobPostings.filter((j) => j.isActive);
export const jobBySlug = Object.fromEntries(jobPostings.map((j) => [j.slug, j]));
