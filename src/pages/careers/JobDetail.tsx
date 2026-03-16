import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Briefcase, Loader2 } from "lucide-react";
import { jobBySlug } from "@/content/careers";
import { useSEO } from "@/hooks/useSEO";
import { pageSEO } from "@/lib/seo";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
    fullName: z.string().min(2, { message: "Full name is required." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(5, { message: "Phone number is required." }),
    currentRole: z.string().min(2, { message: "Current role is required." }),
    linkedinUrl: z.string().optional(),
    resume: z.instanceof(File).refine((file) => file.size <= 5 * 1024 * 1024, { message: "File size must be less than 5MB." }).refine((file) => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type), { message: "Only PDF, DOC, or DOCX files are allowed." }),
    coverLetter: z.string().min(20, { message: "Please provide a brief cover letter." }),
});

export default function JobDetail() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const job = slug ? jobBySlug[slug] : undefined;

    useSEO({
        ...pageSEO.careers,
        title: job ? `${job.title} | Careers | HLCC` : 'Careers | HLCC',
        description: job?.description || pageSEO.careers.description,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            currentRole: "",
            linkedinUrl: "",
            resume: undefined,
            coverLetter: "",
        },
    });

    if (!job) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center bg-white text-black py-20 px-4 text-center">
                <h1 className="text-4xl font-heading font-light mb-4 italic">Position Not Found</h1>
                <p className="text-black/50 font-light mb-8">The role you are looking for does not exist or has been closed.</p>
                <Button onClick={() => navigate("/careers")} className="bg-slate-900 text-white rounded-none hover:bg-[#D4AF37] px-8 py-6 text-[10px] uppercase font-bold tracking-widest transition-all">
                    View Open Positions
                </Button>
            </div>
        );
    }

    const breadcrumbs = [
        { name: "Home", url: "/" },
        { name: "Careers", url: "/careers" },
        { name: job.title, url: `/careers/${job.slug}` },
    ];

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('to', "applications@hlcc.africa");
            formData.append('subject', `New Application: ${job!.title}`);
            formData.append('html', `
                <h3>Job Application Details</h3>
                <p><strong>Job Title:</strong> ${job!.title}</p>
                <p><strong>Full Name:</strong> ${values.fullName}</p>
                <p><strong>Email:</strong> ${values.email}</p>
                <p><strong>Phone:</strong> ${values.phone}</p>
                <p><strong>Current Role:</strong> ${values.currentRole}</p>
                <p><strong>LinkedIn URL:</strong> ${values.linkedinUrl || 'N/A'}</p>
                <p><strong>Cover Letter:</strong></p>
                <p>${values.coverLetter.replace(/\n/g, '<br>')}</p>
            `);
            formData.append('formName', "Job Application");
            formData.append('userEmail', values.email);
            formData.append('userName', values.fullName);
            if (values.resume) {
                formData.append('resume', values.resume);
            }

            const response = await fetch('/api/send-email', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Application submitted successfully. We will be in touch!");
                form.reset();
            } else {
                toast.error(result.error || "Submission failed. Please try again.");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <OrganizationSchema />
            <BreadcrumbSchema items={breadcrumbs} />
            <main className="bg-white">
                {/* HERO SECTION */}
                <section className="relative pt-32 pb-24 bg-slate-900 text-white">
                    <div className="absolute inset-0 bg-slate-900opacity-[0.1] pointer-events-none" />
                    <div className="container relative z-10 mx-auto px-4 md:px-6">
                        <Link to="/careers" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] hover:text-white transition-colors mb-12">
                            <ArrowLeft className="w-3 h-3" /> Back to Careers
                        </Link>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-heading font-light mb-8 leading-tight max-w-4xl"
                        >
                            {job.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-wrap items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-white/60"
                        >
                            <span className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                                {job.department}
                            </span>
                            <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                                {job.location}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
                                {job.type}
                            </span>
                        </motion.div>
                    </div>
                </section>

                {/* JOB DETAILS & APPLICATION */}
                <section className="py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid lg:grid-cols-12 gap-16 md:gap-24">

                            {/* DETAILS CONTENT */}
                            <div className="lg:col-span-7 space-y-16">
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-heading font-light text-black italic">About the Role</h2>
                                    <p className="text-black/60 font-light text-lg leading-relaxed">{job.description}</p>
                                </div>

                                <div className="space-y-6">
                                    <h2 className="text-2xl font-heading font-light text-black italic">Key Responsibilities</h2>
                                    <ul className="space-y-4">
                                        {job.responsibilities.map((req, i) => (
                                            <li key={i} className="flex gap-4 items-start">
                                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                                                <span className="text-black/60 font-light leading-relaxed">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-6">
                                    <h2 className="text-2xl font-heading font-light text-black italic">Requirements</h2>
                                    <ul className="space-y-4">
                                        {job.requirements.map((req, i) => (
                                            <li key={i} className="flex gap-4 items-start">
                                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                                                <span className="text-black/60 font-light leading-relaxed">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {job.niceToHave && job.niceToHave.length > 0 && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-heading font-light text-black italic">Nice to Have</h2>
                                        <ul className="space-y-4">
                                            {job.niceToHave.map((req, i) => (
                                                <li key={i} className="flex gap-4 items-start">
                                                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-slate-900/20 shrink-0" />
                                                    <span className="text-black/60 font-light leading-relaxed">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* APPLICATION FORM SIDEBAR */}
                            <div className="lg:col-span-5 relative">
                                <div className="sticky top-32 bg-[#fafafa] p-8 md:p-12 border border-black/5">
                                    <h3 className="text-2xl font-heading font-light text-black mb-8 italic border-b border-black/5 pb-6">Apply Now</h3>

                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                            <FormField
                                                control={form.control}
                                                name="fullName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">Full Name *</FormLabel>
                                                        <FormControl>
                                                            <Input className="border-0 border-b border-black/10 rounded-none bg-transparent px-0 py-4 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all" placeholder="Jane Doe" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-[10px] uppercase font-bold text-red-500/80" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">Email *</FormLabel>
                                                        <FormControl>
                                                            <Input type="email" className="border-0 border-b border-black/10 rounded-none bg-transparent px-0 py-4 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all" placeholder="jane@example.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-[10px] uppercase font-bold text-red-500/80" />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="grid grid-cols-2 gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">Phone *</FormLabel>
                                                            <FormControl>
                                                                <Input className="border-0 border-b border-black/10 rounded-none bg-transparent px-0 py-4 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all" placeholder="+254..." {...field} />
                                                            </FormControl>
                                                            <FormMessage className="text-[10px] uppercase font-bold text-red-500/80" />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="currentRole"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">Current Role *</FormLabel>
                                                            <FormControl>
                                                                <Input className="border-0 border-b border-black/10 rounded-none bg-transparent px-0 py-4 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all" placeholder="e.g. HR Manager" {...field} />
                                                            </FormControl>
                                                            <FormMessage className="text-[10px] uppercase font-bold text-red-500/80" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="linkedinUrl"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">LinkedIn URL</FormLabel>
                                                        <FormControl>
                                                            <Input className="border-0 border-b border-black/10 rounded-none bg-transparent px-0 py-4 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all" placeholder="https://linkedin.com/in/..." {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-[10px] uppercase font-bold text-red-500/80" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="resume"
                                                render={({ field: { value, onChange, ...field } }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">Resume/CV *</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="file"
                                                                accept=".pdf,.doc,.docx"
                                                                className="border-0 border-b border-black/10 rounded-none bg-transparent px-0 py-4 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all"
                                                                onChange={(e) => onChange(e.target.files?.[0])}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <p className="text-[10px] text-black/40 mt-1">Upload your resume (PDF, DOC, or DOCX, max 5MB).</p>
                                                        <FormMessage className="text-[10px] uppercase font-bold text-red-500/80" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="coverLetter"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">Cover Letter *</FormLabel>
                                                        <FormControl>
                                                            <Textarea className="border-0 border-b border-black/10 rounded-none bg-transparent px-0 py-4 focus-visible:ring-0 focus-visible:border-[#D4AF37] transition-all min-h-[120px] resize-none" placeholder="Tell us why you are a great fit..." {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-[10px] uppercase font-bold text-red-500/80" />
                                                    </FormItem>
                                                )}
                                            />

                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-slate-900 text-white hover:bg-[#D4AF37] rounded-none py-7 text-[10px] uppercase tracking-widest font-bold transition-colors duration-500"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    "Submit Application"
                                                )}
                                            </Button>
                                        </form>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
