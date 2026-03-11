import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import StudentForm from '../components/Students/StudentForm';
import { createStudent, getStudentById, updateStudent } from '../store/studentSlice';

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  gradeLevel: '',
  subjects: '',
  enrollmentDate: '',
  address: '',
  status: 'active',
};

const StudentEditor = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedStudent, isLoading } = useSelector((state) => state.students);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      dispatch(getStudentById(id));
    }
  }, [dispatch, id, isEditing]);

  useEffect(() => {
    if (isEditing && selectedStudent?._id === id) {
      setFormData({
        firstName: selectedStudent.firstName || '',
        lastName: selectedStudent.lastName || '',
        email: selectedStudent.email || '',
        phone: selectedStudent.phone || '',
        gradeLevel: selectedStudent.gradeLevel || '',
        subjects: (selectedStudent.subjects || []).join(', '),
        enrollmentDate: selectedStudent.enrollmentDate ? selectedStudent.enrollmentDate.slice(0, 10) : '',
        address: selectedStudent.address || '',
        status: selectedStudent.status || 'active',
      });
    }
  }, [id, isEditing, selectedStudent]);

  const title = useMemo(() => (isEditing ? 'Edit Student' : 'Add Student'), [isEditing]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.firstName.trim()) nextErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) nextErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) nextErrors.email = 'Email is required';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      ...formData,
      subjects: formData.subjects
        .split(',')
        .map((subject) => subject.trim())
        .filter(Boolean),
    };

    const action = isEditing
      ? updateStudent({ id, studentData: payload })
      : createStudent(payload);

    const result = await dispatch(action);

    if (!result.error) {
      const studentId = result.payload?._id || id;
      navigate(studentId ? `/students/${studentId}` : '/students');
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Capture student details, academic context, and enrollment status in one place.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <StudentForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          errors={errors}
          isEditing={isEditing}
          onCancel={() => navigate(isEditing ? `/students/${id}` : '/students')}
        />
      </div>
    </div>
  );
};

export default StudentEditor;
