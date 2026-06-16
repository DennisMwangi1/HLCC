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
        slug: "software-developer-solarjiji",
        title: "Software Developer – SolarJiji Technologies",
        department: "Technology",
        location: "Nairobi, Kenya",
        type: "Full-time",
        description:
            "SolarJiji is a dynamic startup at the intersection of clean energy and technology, developing a cutting-edge platform that enables solar forecasting, project sizing, and a dedicated e-commerce marketplace for solar installation components. Our mission is to accelerate solar adoption by making solar project planning and procurement more intelligent, data-driven, and accessible. We are seeking a skilled and innovative Software Developer to lead the development, testing, and maintenance of SolarJiji's digital platforms and applications. You will work closely with AI, data science, and product teams to build scalable, user-friendly, and reliable software solutions focused on renewable energy analytics, forecasting, and decision support systems. We offer the opportunity to work on impactful AI and renewable energy solutions, exposure to cutting-edge energy forecasting and analytics systems, professional growth and leadership opportunities, and a flexible, collaborative work environment.",
        responsibilities: [
            "Design, develop, test, and maintain scalable web applications and digital platforms.",
            "Lead frontend development using React.js and related modern frontend technologies.",
            "Develop and integrate backend APIs and services.",
            "Collaborate with data scientists and AI engineers to integrate machine learning models into applications.",
            "Build interactive dashboards and data visualization tools for energy analytics.",
            "Optimize application performance, responsiveness, and user experience.",
            "Participate in software architecture, code reviews, and technical decision-making.",
            "Write clean, maintainable, secure, and well-documented code.",
            "Support deployment, cloud infrastructure, and CI/CD workflows.",
            "Troubleshoot software issues and improve system reliability.",
            "Stay updated with emerging technologies in software engineering, AI, and renewable energy systems.",
        ],
        requirements: [
            "Bachelor's degree in Computer Science, Software Engineering, Information Technology, or a related field.",
            "Minimum of 4 years of professional experience in software development.",
            "Strong proficiency in React.js and modern JavaScript/TypeScript development.",
            "Experience with frontend state management and responsive UI development.",
            "Proficiency in backend development using technologies such as Python, Node.js, or PHP.",
            "Experience working with RESTful APIs and database systems such as PostgreSQL, MySQL, or MongoDB.",
            "Strong understanding of Git/GitHub and software development best practices.",
            "Additional knowledge or exposure to data science, machine learning workflows, or analytics platforms.",
            "Strong problem-solving, analytical, and communication skills.",
        ],
        niceToHave: [
            "Experience integrating AI/ML models into production systems.",
            "Familiarity with cloud platforms such as AWS, Azure, or Google Cloud.",
            "Experience with Docker, DevOps, and CI/CD pipelines.",
            "Knowledge of dashboarding and data visualization frameworks.",
            "Experience working in startups, climate-tech, energy-tech, or SaaS environments.",
            "Understanding of renewable energy systems and forecasting platforms.",
        ],
        postedDate: "June 16, 2026",
        closingDate: "June 21, 2026",
        isActive: true,
    },
];

/**
 * Returns true if the job's closing date has passed.
 * Compares the closing date string (e.g. "March 30, 2026") against now.
 */
export function isApplicationClosed(job: JobPosting): boolean {
    if (!job.isActive) return true;
    if (!job.closingDate) return false;
    const closing = new Date(job.closingDate);
    // Set closing to end of day so it stays open on the closing date itself
    closing.setHours(23, 59, 59, 999);
    return Date.now() > closing.getTime();
}

/** Open roles first, closed roles last (preserving original order within each group). */
export function sortJobsByApplicationStatus(jobs: JobPosting[]): JobPosting[] {
    return [...jobs].sort((a, b) => {
        const aClosed = isApplicationClosed(a);
        const bClosed = isApplicationClosed(b);
        if (aClosed === bClosed) return 0;
        return aClosed ? 1 : -1;
    });
}

export const activeJobPostings = jobPostings.filter((j) => j.isActive);
export const jobBySlug = Object.fromEntries(jobPostings.map((j) => [j.slug, j]));
