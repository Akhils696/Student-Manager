import React from 'react';

const Calendar = ({ tasks, onTaskClick }) => {
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay, year, month };
  };

  const getTasksForDate = (day) => {
    const today = new Date();
    const taskDate = new Date(today.getFullYear(), today.getMonth(), day);
    return tasks.filter(task => {
      const taskDueDate = new Date(task.dueDate);
      return taskDueDate.toDateString() === taskDate.toDateString();
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const { daysInMonth, startingDay, year, month } = getDaysInMonth(new Date());
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const renderDays = () => {
    const days = [];
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-semibold text-gray-700 py-2">
          {dayLabels[i]}
        </div>
      );
    }
    return days;
  };

  const renderDates = () => {
    const dates = [];
    const totalCells = Math.ceil((daysInMonth + startingDay) / 7) * 7;
    
    for (let i = 0; i < totalCells; i++) {
      const day = i - startingDay + 1;
      const isCurrentDay = day > 0 && day <= daysInMonth;
      const dayTasks = isCurrentDay ? getTasksForDate(day) : [];
      
      dates.push(
        <div
          key={i}
          className={`min-h-[100px] p-2 border ${
            isCurrentDay ? 'bg-white hover:bg-blue-50 cursor-pointer' : 'bg-gray-50'
          }`}
          onClick={() => isCurrentDay && onTaskClick && onTaskClick(dayTasks)}
        >
          {isCurrentDay && (
            <>
              <div className="font-medium text-gray-900 mb-1">{day}</div>
              <div className="space-y-1">
                {dayTasks.slice(0, 3).map((task) => (
                  <div
                    key={task._id}
                    className={`text-xs px-2 py-1 rounded truncate text-white ${getPriorityColor(task.priority)}`}
                    title={task.title}
                  >
                    {task.title}
                  </div>
                ))}
                {dayTasks.length > 3 && (
                  <div className="text-xs text-gray-600">
                    +{dayTasks.length - 3} more
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      );
    }
    return dates;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 text-white py-4 px-6">
        <h2 className="text-2xl font-bold">
          {monthNames[month]} {year}
        </h2>
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {renderDays()}
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {renderDates()}
      </div>
    </div>
  );
};

export default Calendar;
