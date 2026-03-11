import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import TaskDetails from '../components/Tasks/TaskDetails';
import { deleteTask, getTaskById } from '../store/taskSlice';

const TaskDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedTask: task, isLoading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTaskById(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this task and return to the task list?')) {
      return;
    }

    const result = await dispatch(deleteTask(id));
    if (!result.error) {
      navigate('/tasks');
    }
  };

  if (!task) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isLoading ? 'Loading task...' : 'Task not found'}
        </h1>
      </div>
    );
  }

  const studentName = task.studentId
    ? `${task.studentId.firstName || ''} ${task.studentId.lastName || ''}`.trim()
    : '';

  return (
    <TaskDetails
      task={task}
      studentName={studentName}
      onEdit={() => navigate(`/tasks/${id}/edit`)}
      onDelete={handleDelete}
    />
  );
};

export default TaskDetailsPage;
