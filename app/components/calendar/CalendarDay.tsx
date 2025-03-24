// import { CalendarEvent } from '../../lib/types'; // Import CalendarEvent

// interface CalendarDayProps {
//   day: Date;
//   events: CalendarEvent[];
//   isCurrentMonth: boolean;
//   isToday: boolean;
// }

// export default function CalendarDay({ day, events, isCurrentMonth, isToday }: CalendarDayProps) {
//   const handleAddEvent = async () => {
//     const title = prompt('Enter event title:');
//     if (title) {
//       // Add event logic here
//     }
//   };

//   return (
//     <div className={`bg-white min-h-24 p-1 ${!isCurrentMonth ? 'text-gray-400' : ''}`}>
//       <div className="flex justify-between items-center mb-1">
//         <span
//           className={`text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full ${
//             isToday ? 'bg-blue-500 text-white' : ''
//           }`}
//         >
//           {day.getDate()}
//         </span>
//         <button
//           className="text-gray-400 hover:text-gray-600 p-1 opacity-0 hover:opacity-100"
//           onClick={handleAddEvent}
//         >
//           +
//         </button>
//       </div>
//       <div className="space-y-1">
//         {events.map((event) => (
//           <div
//             key={event.id}
//             className={`px-2 py-1 text-xs rounded ${event.color} truncate`}
//           >
//             {event.title}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";

import React from 'react';
import { CalendarEvent } from '../../lib/types';

interface CalendarDayProps {
  day: Date;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

export default function CalendarDay({ day, events, isCurrentMonth, isToday }: CalendarDayProps) {
  // Format the day number
  const dayNumber = day.getDate();
  
  return (
    <div
      className={`min-h-[100px] p-2 ${
        isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
      } ${isToday ? 'border-2 border-blue-500' : ''}`}
    >
      <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : ''}`}>
        {dayNumber}
      </div>
      
      {/* Display events for this day */}
      <div className="space-y-1 overflow-y-auto max-h-[80px]">
        {events.map((event, index) => (
          <div
            key={index}
            className="text-xs p-1 rounded truncate"
            style={{ backgroundColor: event.color, color: 'white' }}
            title={event.title}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
}