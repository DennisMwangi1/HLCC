import { Header } from "../../HLCC-v2/src/components/Header";
import { Footer } from "../../HLCC-v2/src/components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "../../HLCC-v2/src/pages/Home";
import About from "../../HLCC-v2/src/pages/About";
import ScrollToHash from "../../HLCC-v2/src/components/ScrollToHash";
import ServicesOverview from "../../HLCC-v2/src/pages/services/Overview";
import ServiceDetails from "../../HLCC-v2/src/pages/services/ServiceDetails";
import RegisterCoach from "../../HLCC-v2/src/pages/register/Coach";
import RegisterFacilitator from "../../HLCC-v2/src/pages/register/Facilitator";
import Contact from "../../HLCC-v2/src/pages/Contact";
import { BookingModal } from "../../HLCC-v2/src/components/booking/BookingModal";
import { useBookingModal } from "../../HLCC-v2/src/hooks/useBookingModal";

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