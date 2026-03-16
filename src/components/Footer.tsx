import { Button } from "@/components/ui/button";
import { Mail, MapPin, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

interface FooterProps {
    onBookConsultation: () => void;
}

export function Footer({ onBookConsultation }: FooterProps) {
    const footerLinks = {
        "Capabilities": ["Leadership Development", "Culture Transformation", "Team Coaching", "HR Advisory"],
        "Insights": ["Case Studies", "Articles", "White Papers", "Events"],
        "Institute": ["About HLCC", "Our Legacy", "Careers", "Contact"],
    };

    const getLinkPath = (category: string, link: string) => {
        if (category === "Capabilities") return "/services";
        if (category === "Insights") return "/insights";
        if (category === "Institute") {
            if (link === "Contact") return "/contact";
            return "/about";
        }
        return "#";
    };

    return (
        <footer className="bg-slate-900 text-slate-100">
            {/* CTA Section */}
            <div className="border-t border-slate-700/40 py-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs font-bold mb-4">
                            Inquiry
                        </p>
                        <h2 className="text-2xl md:text-4xl mb-8 font-heading font-light leading-tight italic">
                            Elevate Your Leadership & Culture
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                className="bg-[#D4AF37] text-black hover:bg-[#F3E5AB] transition-all duration-500 rounded-none px-6 py-4 text-sm uppercase tracking-widest font-bold h-auto"
                                onClick={() => onBookConsultation()}
                            >
                                Schedule Discovery
                            </Button>
                            <Link
                                to="/contact"
                                className="text-slate-200/80 hover:text-[#D4AF37] font-bold text-sm uppercase tracking-[0.2em] border-b border-slate-500/40 pb-1 transition-all duration-300"
                            >
                                Contact Team
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container mx-auto px-4 md:px-6 py-10 border-t border-white/5">
                <div className="grid lg:grid-cols-6 gap-8">
                    {/* Brand Meta */}
                    <div className="lg:col-span-3">
                        <div className="flex flex-col gap-2 mb-6">
                            <img src="/assets/img/HLCC.png" alt="HLCC logo" className="h-5 w-fit" />
                            <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]/60 font-bold leading-relaxed max-w-sm">
                                HUMAN-CENTERED LEADERSHIP & CULTURE CONSULTING LTD
                            </p>
                        </div>
                        <p className="text-slate-200/80 text-sm font-light leading-relaxed max-w-sm mb-8">
                            A premier advisory firm dedicated to institutional transformation across the African continent.
                        </p>

                        {/* Direct Contact */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-slate-200/70 hover:text-[#D4AF37] transition-colors duration-300">
                                <Mail className="h-4 w-4" strokeWidth={1.5} />
                                <span className="text-sm font-medium tracking-wide">info@hlcc.africa</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-200/70">
                                <MapPin className="h-4 w-4" strokeWidth={1.5} />
                                <span className="text-xs font-medium tracking-wide">Regional Hubs: Nairobi • Johannesburg • Kigali • Dar es Salaam</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category} className="lg:col-span-1">
                            <h3 className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4">{category}</h3>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link}>
                                        <Link
                                            to={getLinkPath(category, link)}
                                            className="text-slate-200/80 hover:text-slate-50 text-sm font-medium transition-colors duration-300"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-700/40 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-slate-300/70 text-xs uppercase tracking-[0.2em] font-medium order-2 md:order-1">
                        © {new Date().getFullYear()} HLCC.
                        <span className="mx-2 text-slate-500">|</span>
                        <a href="#" className="hover:text-slate-100 transition-colors">Privacy</a>
                        <span className="mx-2 text-slate-500">|</span>
                        <a href="#" className="hover:text-slate-100 transition-colors">Terms</a>
                    </div>

                    {/* Social Hub */}
                    <div className="flex gap-4 order-1 md:order-2">
                        {[
                            { Icon: Linkedin, href: "#" },
                            { Icon: Twitter, href: "#" },
                            { Icon: Youtube, href: "#" }
                        ].map(({ Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                className="text-slate-300/60 hover:text-[#D4AF37] transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <Icon className="h-4 w-4" strokeWidth={1.5} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
