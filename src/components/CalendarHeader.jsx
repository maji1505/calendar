import React from 'react';

const CalendarHeader = ({ currentDate, handleNextMonth, handlePreviousMonth }) => {
  return (
    <header className="flex items-center justify-between mb-4">
      <button
        onClick={handlePreviousMonth}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Previous
      </button>
      <h1 className="text-xl font-bold">
        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
      </h1>
      <button
        onClick={handleNextMonth}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Next
      </button>
    </header>
  );
};

export default CalendarHeader;