import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../store/taskSlice';

const CalendarView = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, isError, errorMessage } = useSelector(state => state.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  // Group tasks by date
  const tasksByDate = tasks.reduce((acc, task) => {
    const date = new Date(task.dueDate).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {});

  const sortedDates = Object.keys(tasksByDate).sort((a, b) => new Date(a) - new Date(b));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Calendar View</h1>

      {isError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <p>Loading calendar...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedDates.length > 0 ? (
            sortedDates.map(date => (
              <div key={date} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h2>
                <div className="space-y-3">
                  {tasksByDate[date].map(task => (
                    <div 
                      key={task._id} 
                      className={`p-4 rounded-md border-l-4 ${
                        task.priority === 'high' ? 'border-red-500 bg-red-50' :
                        task.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                        'border-green-500 bg-green-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{task.description || 'No description'}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            For: {task.studentId ? `${task.studentId.firstName} ${task.studentId.lastName}` : 'N/A'}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          task.status === 'completed' ? 'bg-green-200 text-green-800' :
                          task.status === 'in-progress' ? 'bg-blue-200 text-blue-800' :
                          'bg-yellow-200 text-yellow-800'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">No tasks scheduled</h2>
              <p className="text-gray-600">Add tasks to see them appear in your calendar.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarView;