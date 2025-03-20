"use client";

import CalendarDay from './CalendarDay';
import { useCalendar } from '../../lib/calendarUtils';
import { CalendarEvent } from '../../lib/types'; // Import CalendarEvent

interface CalendarGridProps {
  events?: { [key: string]: CalendarEvent[] }; // Optional events prop
}

export default function CalendarGrid({ events }: CalendarGridProps) {
  const {
    calendarDays,
    getEventsForDay,
    isCurrentMonth,
    isToday,
  } = useCalendar();

  return (
    <div className="p-4">
      <div className="grid grid-cols-7 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center py-2 text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {calendarDays.map((day, index) => (
          <CalendarDay
            key={index}
            day={day}
            events={events ? events[formatDateKey(day)] || [] : getEventsForDay(day)}
            isCurrentMonth={isCurrentMonth(day)}
            isToday={isToday(day)}
          />
        ))}
      </div>
    </div>
  );
}

// Helper function to format date as a key
const formatDateKey = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};