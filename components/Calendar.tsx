import React from 'react';
import PageHeader from './ui/PageHeader';

const Calendar: React.FC = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // Dummy empty cells for October 2025 layout (starts on a Wednesday)
    const emptyCells = Array(3).fill(null);
    const dayCells = Array(31).fill(null).map((_, i) => i + 1);
    const calendarCells = [...emptyCells, ...dayCells];

    const LegendItem = ({ color, label }: { color: string, label: string }) => (
        <div className="flex items-center">
            <div className={`w-3.5 h-3.5 rounded-sm ${color}`}></div>
            <span className="ml-2 text-sm text-text-secondary">{label}</span>
        </div>
    );

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <PageHeader title="Calendar" description="View your assignments and events in calendar view" />
        <div className="flex items-center space-x-2">
            <span className="font-semibold text-lg">October 2025</span>
        </div>
      </div>
      <div className="flex items-center space-x-6 mb-4 px-2">
          <span className="text-sm font-semibold text-text-secondary">Color Legend:</span>
          <LegendItem color="bg-status-overdue" label="Overdue" />
          <LegendItem color="bg-status-upcoming" label="Due in 1-2 days" />
          <LegendItem color="bg-blue-500" label="Due in 3-7 days" />
          <LegendItem color="bg-status-completed" label="Due later" />
      </div>

      <div className="grid grid-cols-7 flex-grow border-t border-l border-border bg-card">
        {days.map(day => (
          <div key={day} className="text-center font-semibold text-text-secondary p-2 border-r border-b border-border text-sm">
            {day}
          </div>
        ))}
        {calendarCells.map((day, index) => (
          <div key={index} className="relative p-2 border-r border-b border-border min-h-[120px]">
            {day && <span className="absolute top-2 left-2 text-sm text-text-secondary">{day}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
