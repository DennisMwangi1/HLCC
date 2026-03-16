import { format } from 'date-fns';
import { cn } from '@/utils';
import type { GroupedTimeSlots } from '../hooks/useTimeSlots';

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
      <div className="text-center py-24 border border-dashed border-black/5 bg-white">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D4AF37] mb-4">Availability Status</p>
        <p className="text-xl font-heading font-light text-black italic">
          {selectedDate
            ? `No sessions found for ${format(selectedDate, 'MMM d, yyyy')}`
            : 'Pending Calendar Selection'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {periods.map(({ key, slots }) => {
        if (slots.length === 0) return null;

        const periodInfo = periodLabels[key];

        return (
          <div key={key} className="space-y-4">
            <div className="flex items-center justify-between border-b border-black/5 pb-2">
              <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">{periodInfo.label}</h5>
              <span className="text-[8px] uppercase tracking-widest text-black/20 font-bold">
                {periodInfo.timeRange}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {slots.map((slot) => {
                const timeString = format(slot.time, 'HH:mm');
                const isSelected = selectedTime === timeString;

                return (
                  <button
                    key={slot.time.toString()}
                    type="button"
                    onClick={() => onTimeSelect(slot.time)}
                    className={cn(
                      'py-3 px-4 rounded-none border text-[10px] uppercase tracking-widest font-bold transition-all duration-500',
                      'focus:outline-none',
                      'disabled:opacity-30 disabled:cursor-not-allowed',
                      isSelected
                        ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-xl translate-y-[-2px]'
                        : 'border-black/5 hover:border-black/20 hover:bg-slate-900/[0.02] bg-white text-black/60'
                    )}
                    aria-pressed={isSelected}
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

