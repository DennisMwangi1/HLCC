import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookingConfirmationProps {
  onClose?: () => void;
}

export function BookingConfirmation({ onClose }: BookingConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-12 px-6"
    >
      <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3">Booking Confirmed!</h3>

      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Thank you for scheduling a call with us. We're excited to connect with you.
        A confirmation email with the meeting details has been sent to your email address.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 text-left max-w-md mx-auto">
        <h4 className="font-medium text-blue-800 mb-2">What's Next?</h4>
        <ul className="space-y-2 text-sm text-blue-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Check your email for the meeting link and details</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Add the meeting to your calendar using the .ics attachment</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Prepare any questions you'd like to discuss</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button onClick={onClose} variant="outline">
          Back to Home
        </Button>
        <Button>
          Add to Calendar
        </Button>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Need to reschedule? Check your email for a link to modify your booking.
      </p>
    </motion.div>
  );
}
