import { useCalendar } from '../../lib/calendarUtils';

export default function CalendarHeader() {
  const { currentMonth, prevMonth, nextMonth, goToToday, getMonthName } = useCalendar();

  return (
    <div className="p-4 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-medium">
          {getMonthName(currentMonth)} {currentMonth.getFullYear()}
        </h2>
        <button onClick={goToToday} className="px-3 py-1 text-sm rounded text-gray-600 hover:bg-gray-100">
          Today
        </button>
      </div>
      <div className="flex items-center space-x-1">
        <button onClick={prevMonth} className="p-1 rounded hover:bg-gray-100">
          ←
        </button>
        <button onClick={nextMonth} className="p-1 rounded hover:bg-gray-100">
          →
        </button>
      </div>
    </div>
  );
}