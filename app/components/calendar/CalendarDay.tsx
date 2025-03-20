import { CalendarEvent } from '../../lib/types'; // Import CalendarEvent

interface CalendarDayProps {
  day: Date;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

export default function CalendarDay({ day, events, isCurrentMonth, isToday }: CalendarDayProps) {
  const handleAddEvent = async () => {
    const title = prompt('Enter event title:');
    if (title) {
      // Add event logic here
    }
  };

  return (
    <div className={`bg-white min-h-24 p-1 ${!isCurrentMonth ? 'text-gray-400' : ''}`}>
      <div className="flex justify-between items-center mb-1">
        <span
          className={`text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full ${
            isToday ? 'bg-blue-500 text-white' : ''
          }`}
        >
          {day.getDate()}
        </span>
        <button
          className="text-gray-400 hover:text-gray-600 p-1 opacity-0 hover:opacity-100"
          onClick={handleAddEvent}
        >
          +
        </button>
      </div>
      <div className="space-y-1">
        {events.map((event) => (
          <div
            key={event.id}
            className={`px-2 py-1 text-xs rounded ${event.color} truncate`}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
}