import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface BookingConfirmationProps {
  onClose?: () => void;
}

export function BookingConfirmation({ onClose }: BookingConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="text-center py-20 px-8 bg-white max-w-2xl mx-auto"
    >
      <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-none border border-[#D4AF37] mb-10 transition-all duration-1000 rotate-45 scale-75 group">
        <div className="-rotate-45">
          <p className="text-[#D4AF37] text-3xl font-light italic">✓</p>
        </div>
      </div>

      <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Success</p>
      <h3 className="text-3xl md:text-4xl font-heading font-light text-black italic mb-6 leading-tight">Request Received</h3>

      <p className="text-black/40 text-[11px] uppercase tracking-widest leading-loose mb-12 max-w-sm mx-auto font-medium">
        Thank you for scheduling a session with HLCC. We are aligning our expertise to meet your professional requirements.
        Detailed confirmation protocol has been dispatched to your official email.
      </p>

      <div className="border border-black/5 p-10 mb-12 text-center bg-slate-900/[0.01]">
        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-black mb-6">Engagement Protocol</h4>
        <div className="space-y-4 text-[10px] uppercase tracking-widest text-black/40 font-medium leading-relaxed">
          <p>1. Verify dispatch in your primary inbox</p>
          <p>2. Integrate the consultative slot into your calendar</p>
          <p>3. Review the preparatory brief provided</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <Button
          onClick={onClose}
          variant="ghost"
          className="text-[10px] uppercase tracking-widest font-bold text-black/40 hover:text-black hover:bg-transparent"
        >
          &larr; Return to Portal
        </Button>
        <Button className="bg-slate-900 text-white hover:bg-[#D4AF37] transition-all duration-500 rounded-none px-12 py-7 text-[10px] uppercase tracking-widest font-bold h-auto shadow-xl">
          Integrate to Calendar
        </Button>
      </div>

      <p className="mt-16 text-[9px] uppercase tracking-[0.2em] text-black/20 font-bold max-w-xs mx-auto">
        Rescheduling requirements must be coordinated via the digital link provided in your confirmation dispatch.
      </p>
    </motion.div>
  );
}
