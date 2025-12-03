import { format } from 'date-fns';
import { cn } from '@/utils';
import { Clock } from 'lucide-react';
import type { GroupedTimeSlots, TimeSlot } from '../hooks/useTimeSlots';

interface TimeSlotGroupProps {
  groupedSlots: GroupedTimeSlots;
  selectedTime: string;
  onTimeSelect: (time: Date) => void;
  selectedDate?: Date;
}

const periodLabels = {
  morning: { label: 'Morning', timeRange: '9:00 AM - 12:00 PM' },
  afternoon: { label: 'Afternoon', timeRange: '12:00 PM - 3:00 PM' },
  evening: { label: 'Evening', timeRange: '3:00 PM - 5:00 PM' },
};

export function TimeSlotGroup({ groupedSlots, selectedTime, onTimeSelect, selectedDate }: TimeSlotGroupProps) {
  const periods = [
    { key: 'morning' as const, slots: groupedSlots.morning },
    { key: 'afternoon' as const, slots: groupedSlots.afternoon },
    { key: 'evening' as const, slots: groupedSlots.evening },
  ];

  const hasAnySlots = periods.some(p => p.slots.length > 0);

  if (!hasAnySlots) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <Clock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
        <p className="text-sm font-medium text-gray-900 mb-1">No available time slots</p>
        <p className="text-xs text-gray-600">
          {selectedDate 
            ? `No available times for ${format(selectedDate, 'MMMM d, yyyy')}. Please select another date.`
            : 'Please select a date first.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {periods.map(({ key, slots }) => {
        if (slots.length === 0) return null;

        const periodInfo = periodLabels[key];

        return (
          <div key={key} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-sm font-semibold text-gray-900">{periodInfo.label}</h5>
                <p className="text-xs text-gray-500">{periodInfo.timeRange}</p>
              </div>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded font-medium">
                {slots.length} {slots.length === 1 ? 'slot' : 'slots'}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {slots.map((slot) => {
                const timeString = format(slot.time, 'HH:mm');
                const isSelected = selectedTime === timeString;

                return (
                  <button
                    key={slot.time.toString()}
                    type="button"
                    onClick={() => onTimeSelect(slot.time)}
                    className={cn(
                      'py-2.5 px-3 rounded-lg border-2 text-sm font-medium transition-all duration-200',
                      'hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      isSelected
                        ? 'bg-primary text-white border-primary shadow-md scale-[1.02] ring-2 ring-primary/20'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white active:scale-95'
                    )}
                    aria-pressed={isSelected}
                    aria-label={`Select time ${slot.formatted}`}
                  >
                    {slot.formatted}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

