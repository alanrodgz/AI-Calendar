import { CalendarEvent } from '../../lib/types';

interface EventItemProps {
  event: CalendarEvent;
}

export default function EventItem({ event }: EventItemProps) {
  return (
    <div className={`px-2 py-1 text-xs rounded ${event.color} truncate`}>
      {event.title}
    </div>
  );
}