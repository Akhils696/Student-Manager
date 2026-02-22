import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents } from '../store/studentSlice';

const StudentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { students } = useSelector(state => state.students);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const student = students.find(s => s._id === id);

  if (!student) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold">Student not found</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Details</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="mt-1 text-lg">{student.firstName} {student.lastName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-lg">{student.email || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-lg">{student.phone || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Grade Level</label>
                <p className="mt-1 text-lg">{student.gradeLevel || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Academic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Subjects</label>
                <div className="mt-1">
                  {student.subjects && student.subjects.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {student.subjects.map((subject, index) => (
                        <li key={index} className="text-lg">{subject}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-lg">N/A</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Enrollment Date</label>
                <p className="mt-1 text-lg">
                  {student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="flex space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              Edit Student
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors">
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;