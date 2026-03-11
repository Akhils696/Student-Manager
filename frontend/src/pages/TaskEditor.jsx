import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TaskForm from '../components/Tasks/TaskForm';
import { getStudents } from '../store/studentSlice';
import { createTask, getTaskById, updateTask } from '../store/taskSlice';

const emptyForm = {
  title: '',
  description: '',
  studentId: '',
  dueDate: '',
  priority: 'medium',
  status: 'pending',
  subject: '',
  notes: '',
};

const TaskEditor = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { students } = useSelector((state) => state.students);
  const { selectedTask, isLoading } = useSelector((state) => state.tasks);
  const [formData, setFormData] = useState({
    ...emptyForm,
    studentId: searchParams.get('studentId') || '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getStudents());
    if (isEditing) {
      dispatch(getTaskById(id));
    }
  }, [dispatch, id, isEditing]);

  useEffect(() => {
    if (isEditing && selectedTask?._id === id) {
      setFormData({
        title: selectedTask.title || '',
        description: selectedTask.description || '',
        studentId: selectedTask.studentId?._id || selectedTask.studentId || '',
        dueDate: selectedTask.dueDate ? selectedTask.dueDate.slice(0, 10) : '',
        priority: selectedTask.priority || 'medium',
        status: selectedTask.status || 'pending',
        subject: selectedTask.subject || selectedTask.category || '',
        notes: selectedTask.notes || '',
      });
    }
  }, [id, isEditing, selectedTask]);

  const pageTitle = useMemo(() => (isEditing ? 'Edit Task' : 'Create Task'), [isEditing]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.title.trim()) nextErrors.title = 'Task title is required';
    if (!formData.description.trim()) nextErrors.description = 'Description is required';
    if (!formData.studentId) nextErrors.studentId = 'Select a student';
    if (!formData.dueDate) nextErrors.dueDate = 'Due date is required';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      studentId: formData.studentId,
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: formData.status,
      subject: formData.subject,
      category: formData.subject,
      notes: formData.notes,
    };

    const action = isEditing
      ? updateTask({ id, taskData: payload })
      : createTask(payload);

    const result = await dispatch(action);

    if (!result.error) {
      const taskId = result.payload?._id || id;
      navigate(taskId ? `/tasks/${taskId}` : '/tasks');
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Plan upcoming work, assign it to a student, and keep deadlines visible.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <TaskForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          errors={errors}
          students={students}
          isEditing={isEditing}
          onCancel={() => navigate(isEditing ? `/tasks/${id}` : '/tasks')}
        />
      </div>
    </div>
  );
};

export default TaskEditor;
