import { useState } from 'react';

type BookingType = 'discovery' | 'consultation';

export function useBookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<BookingType>('discovery');

  const openModal = (modalType: BookingType = 'discovery') => {
    setType(modalType);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    type,
    openModal,
    closeModal,
  };
}
