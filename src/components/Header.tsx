import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useBookingModal } from "@/hooks/useBookingModal";
import { BookingModal } from "./booking/BookingModal";

export function Header() {
    const [showDropdown, setShowDropdown] = useState(false);
    const navLinks = [
        "Home",
        "About",
        "Services",
        "Why HLCC",
        "Blogs & Insights",
        "Contact",
    ];
    const { isOpen, type, closeModal } = useBookingModal();

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
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[var(--navy-dark)] backdrop-blur supports-[backdrop-filter]:bg-[var(--navy-dark)]/95">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                <div>
                    <Link to="/" className="flex flex-col items-start w-fit">
                        <img src="/assets/img/HLCC.png" alt="HLCC logo" className="h-8 md:h-10 w-auto sm:w-fit " />
                        <p className="hidden md:flex items-center text-[10px] uppercase tracking-widest bg-gradient-to-b from-white to-[var(--gold-accent)] bg-clip-text text-transparent font-bold mt-1 leading-tight max-w-[200px]">
                            HUMAN-CENTERED LEADERSHIP & CULTURE CONSULTING LTD
                        </p>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {/* Desktop Navigation */}
                    <nav aria-label="Main" className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link}
                                to={toHref(link)}
                                className="text-sm text-gray-300 hover:text-white transition-colors"
                            >
                                {link}
                            </Link>
                        ))}

                        <div className="relative group">
                            <Button
                                variant="ghost"
                                className="text-gray-300 hover:text-white hover:bg-white/10"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                Register <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                            {showDropdown && (
                                <div
                                    className="absolute right-0 mt-1 w-48 bg-[var(--navy-medium)] rounded-md shadow-lg z-50 border border-white/10 overflow-hidden"
                                    onMouseLeave={() => setShowDropdown(false)}
                                >
                                    <Link
                                        to="/register/coach"
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white border-b border-white/10"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        As Coach
                                    </Link>
                                    <Link
                                        to="/register/facilitator"
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
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
                            <Button variant="ghost" size="icon" className="text-white">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="bg-[var(--navy-dark)] border-white/10 text-white w-80"
                        >
                            <nav className="flex flex-col gap-4 mt-8 text-center">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link}
                                        to={toHref(link)}
                                        className="text-gray-300 hover:text-white transition-colors py-2"
                                    >
                                        {link}
                                    </Link>
                                ))}

                                <div className="border-t border-white/10 pt-4 mt-4 flex flex-col gap-3">
                                    <h1 className="text-lg font-semibold text-white">Register</h1>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="border-white/20 text-white bg-[var(--navy-dark)] hover:bg-white/10 justify-start"
                                    >
                                        <Link to="/register/coach">As Coach</Link>
                                    </Button>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="border-white/20 bg-[var(--navy-dark)]  text-white hover:bg-white/10 justify-start"
                                    >
                                        <Link to="/register/facilitator">As Facilitator</Link>
                                    </Button>
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
