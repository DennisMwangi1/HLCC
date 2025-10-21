import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import ScrollToHash from "@/components/ScrollToHash";
import ServicesOverview from "@/pages/services/Overview";
import ServiceDetails from "@/pages/services/ServiceDetails";
import RegisterCoach from "@/pages/register/Coach";
import RegisterFacilitator from "@/pages/register/Facilitator";
import Contact from "@/pages/Contact";
import InsightsList from "@/pages/insights/InsightsList";
import InsightDetail from "@/pages/insights/InsightDetail";
import { BookingModal } from "@/components/booking/BookingModal";
import { useBookingModal } from "@/hooks/useBookingModal";

interface AppContentProps {
    onBookConsultation: () => void;
    onBookDiscovery: () => void;
}

function AppContent({ onBookConsultation, onBookDiscovery }: AppContentProps) {
    return (
        <div className="min-h-screen">
            <Header />
            <ScrollToHash />
            <Routes>
                <Route path="/" element={<Home onBookConsultation={onBookConsultation} />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<ServicesOverview />} />
                <Route path="/services/:slug" element={<ServiceDetails />} />
                <Route path="/insights" element={<InsightsList />} />
                <Route path="/insights/:slug" element={<InsightDetail />} />
                <Route path="/register/coach" element={<RegisterCoach />} />
                <Route path="/register/facilitator" element={<RegisterFacilitator />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer onBookConsultation={onBookDiscovery} />
        </div>
    );
}

export default function App() {
    const { isOpen, type, openModal, closeModal } = useBookingModal();

    return (
        <>
            <AppContent
                onBookConsultation={() => openModal('consultation')}
                onBookDiscovery={() => openModal('discovery')}
            />
            <BookingModal isOpen={isOpen} onOpenChange={closeModal} type={type} />
        </>
    );
}