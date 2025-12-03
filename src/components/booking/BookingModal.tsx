import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BookingForm } from './BookingForm';
import type {BookingType} from "@/components/booking/types.ts";

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
      <DialogContent className="sm:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative bg-gradient-to-br from-white to-gray-50/50">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-2xl font-semibold text-center text-gray-900">
              {getTitle()}
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-6">
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
