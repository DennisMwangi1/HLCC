export type BookingType = 'discovery' | 'consultation';

export interface BookingFormData {
  // Step 1: Basic Information
  name: string;
  email: string;
  phone: string;
  company: string;
  
  // Step 2: Needs Assessment
  needs: string[];
  timeframe: string;
  contactMethod: 'email' | 'phone' | 'video';
  
  // Step 3: Scheduling
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  
  // Additional Info
  message?: string;
  howDidYouHear: string;
  agreeToTerms: boolean;
}

export interface AvailableSlot {
  date: string;
  time: string;
  available: boolean;
}
