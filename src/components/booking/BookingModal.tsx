import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BookingForm } from './BookingForm';
import type { BookingType } from "@/components/booking/types.ts";

interface BookingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  type: BookingType;
}

export function BookingModal({ isOpen, onOpenChange, type }: BookingModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset form state when closing
    setTimeout(() => {
      setIsSuccess(false);
    }, 300);
  };

  const getTitle = () => {
    if (isSuccess) return '';
    return type === 'discovery'
      ? 'Schedule a Discovery Call'
      : 'Book a Consultation';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl lg:max-w-4xl max-h-[95vh] overflow-y-auto p-0 border-none shadow-2xl rounded-none">
        <div className="relative bg-white">
          <DialogHeader className="px-12 pt-12 pb-4 text-center">
            <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-4">
              Engagement
            </p>
            <DialogTitle className="text-3xl md:text-4xl font-heading font-light text-black italic">
              {getTitle()}
            </DialogTitle>
          </DialogHeader>

          <div className="px-12 pb-12">
            <BookingForm
              type={type}
              onSuccess={handleSuccess}
              onCancel={handleClose}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
