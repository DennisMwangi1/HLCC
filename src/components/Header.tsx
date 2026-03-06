import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useBookingModal } from "@/hooks/useBookingModal";
import { BookingModal } from "./booking/BookingModal";

export function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navLinks = [
        "Home",
        "About",
        "Services",
        "Why HLCC",
        "Blogs & Insights",
        "Contact",
    ];
    const { isOpen, type, closeModal } = useBookingModal();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const sectionMap: Record<string, string> = {
        "Why HLCC": "why-hlcc",
    };

    const toHref = (label: string) => {
        if (label === "Home") return "/";
        if (label === "About") return "/about";
        if (label === "Contact") return "/contact";
        if (label === "Offerings" || label === "Services") return "/services";
        if (label === "Blogs & Insights") return "/insights";
        const slug = sectionMap[label] ?? label.toLowerCase().replace(/\s+/g, "-");
        return `/#${slug}`;
    };

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-500 border-b bg-black border-white/10 shadow-2xl`}>
            <div className={`container mx-auto flex transition-all duration-500 items-center justify-between px-4 md:px-6 ${isScrolled ? "h-16" : "h-20"}`}>
                <div>
                    <Link to="/" className="flex flex-col items-start w-fit group">
                        <img src="/assets/img/HLCC.png" alt="HLCC logo" className="h-7 md:h-8 w-auto sm:w-fit transition-all duration-500 group-hover:scale-105" />
                        <p className={`hidden md:flex flex-col items-start text-[8px] uppercase tracking-[0.2em] font-medium font-sans border-0 transition-all duration-500 ${isScrolled ? "opacity-0 max-h-0 mt-0 overflow-hidden" : "opacity-100 max-h-16 mt-1 text-white"}`}>
                            <span>Human-Centered Leadership &</span>
                            <span>Culture Consulting Ltd</span>
                        </p>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {/* Desktop Navigation */}
                    <nav aria-label="Main" className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link}
                                to={toHref(link)}
                                className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-[#D4AF37] transition-all duration-300"
                            >
                                {link}
                            </Link>
                        ))}

                        <div className="relative group">
                            <Button
                                variant="ghost"
                                className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-[#D4AF37] hover:bg-transparent transition-all duration-300 rounded-none h-auto py-2 p-0"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                Register <ChevronDown className="ml-1 h-3 w-3 opacity-50" />
                            </Button>
                            {showDropdown && (
                                <div
                                    className="absolute right-0 mt-4 w-56 bg-black border border-white/10 shadow-2xl z-50 overflow-hidden"
                                    onMouseLeave={() => setShowDropdown(false)}
                                >
                                    <Link
                                        to="/register/coach"
                                        className="block px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] border-b border-white/5 transition-all"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        As Coach
                                    </Link>
                                    <Link
                                        to="/register/facilitator"
                                        className="block px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        As Facilitator
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/5 transition-colors">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="bg-black border-l border-white/10 text-white w-80 max-w-full p-0"
                        >
                            <nav className="flex flex-col h-full">
                                <div className="p-8 pt-20 flex flex-col gap-8">
                                    <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-[9px] font-bold mb-4">Navigation</p>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link}
                                            to={toHref(link)}
                                            className="text-2xl font-heading font-light tracking-wide text-white/60 hover:text-[#D4AF37] transition-all"
                                        >
                                            {link}
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-auto p-8 bg-[#050505] border-t border-white/5">
                                    <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-[9px] font-bold mb-6">Partnerships</p>
                                    <div className="flex flex-col gap-4">
                                        <Link
                                            to="/register/coach"
                                            className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-[#D4AF37] py-2"
                                        >
                                            Register as Coach &rarr;
                                        </Link>
                                        <Link
                                            to="/register/facilitator"
                                            className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-[#D4AF37] py-2"
                                        >
                                            Register as Facilitator &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <BookingModal isOpen={isOpen} onOpenChange={closeModal} type={type} />
        </header>
    );
}

