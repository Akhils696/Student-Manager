import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StudentDetailsCard from '../components/Students/StudentDetails';
import { deleteStudent, getStudentById } from '../store/studentSlice';
import { getTasksByStudent } from '../store/taskSlice';

const StudentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedStudent: student, isLoading } = useSelector((state) => state.students);
  const { tasksByStudent } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getStudentById(id));
    dispatch(getTasksByStudent(id));
  }, [dispatch, id]);

  const taskStats = useMemo(() => ({
    taskCount: tasksByStudent.length,
    completedTasks: tasksByStudent.filter((task) => task.status === 'completed').length,
    pendingTasks: tasksByStudent.filter((task) => task.status !== 'completed').length,
  }), [tasksByStudent]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this student and return to the student list?')) {
      return;
    }

    const result = await dispatch(deleteStudent(id));
    if (!result.error) {
      navigate('/students');
    }
  };

  if (!student) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold">{isLoading ? 'Loading student...' : 'Student not found'}</h1>
      </div>
    );
  }

  return (
    <StudentDetailsCard
      student={{ ...student, ...taskStats }}
      onEdit={() => navigate(`/students/${id}/edit`)}
      onDelete={handleDelete}
    />
  );
};

export default StudentDetails;
