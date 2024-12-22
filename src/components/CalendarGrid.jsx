
import React from 'react';

const CalendarGrid = ({ currentDate, selectedDay, handleDayClick }) => {
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const renderCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInCurrentMonth = daysInMonth(month, year);
    const firstDayIndex = new Date(year, month, 1).getDay();

    const calendarDays = [];
    for (let i = 0; i < firstDayIndex; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="w-10 h-10" />);
    }

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
      calendarDays.push(
        <div
          key={day}
          onClick={() => handleDayClick(new Date(year, month, day))}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-full ${
            isToday ? 'bg-blue-200 text-blue-700' : 'bg-gray-100 text-gray-800'
          } ${
            selectedDay && selectedDay.toDateString() === new Date(year, month, day).toDateString()
              ? 'ring-2 ring-blue-500'
              : ''
          } hover:bg-blue-100`}
        >
          {day}
        </div>
      );
    }
    return calendarDays;
  };

  return <div className="grid grid-cols-7 gap-2">{renderCalendarGrid()}</div>;
};

export default CalendarGrid;
