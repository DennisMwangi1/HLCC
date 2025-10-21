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
      <DialogContent className="sm:max-w-1/2 max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/*<Button*/}
          {/*  variant="ghost"*/}
          {/*  size="icon"*/}
          {/*  className="absolute -right-2 -top-2 h-8 w-8 rounded-full"*/}
          {/*  onClick={handleClose}*/}
          {/*>*/}
          {/*  <X className="h-4 w-4" />*/}
          {/*  <span className="sr-only">Close</span>*/}
          {/*</Button>*/}

          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl text-center">
              {getTitle()}
            </DialogTitle>
          </DialogHeader>

          <div className="px-1">
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
