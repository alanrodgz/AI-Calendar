import { getUserEvents } from '../lib/events';
import CalendarGrid from  '../components/calendar/CalendarGrid';

export default async function UserPage({ params }: { params: { username: string } }) {
  const events = await getUserEvents(params.username);

  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-xl font-semibold text-gray-800 p-4">{params.username}s Calendar</h1>
      <CalendarGrid events={events} />
    </div>
  );
}