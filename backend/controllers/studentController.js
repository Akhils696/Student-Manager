const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Student = require('../models/Student');

// @desc    Get all students for logged-in user
// @route   GET /api/students
// @access  Private
const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({ userId: req.user._id }).sort({ createdAt: -1 });
  
  res.status(200).json(students);
});

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private
const getStudentById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error('Invalid student ID');
  }

  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  // Make sure user owns the student
  if (student.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.status(200).json(student);
});

// @desc    Create new student
// @route   POST /api/students
// @access  Private
const createStudent = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    gradeLevel,
    subjects,
    enrollmentDate,
    profilePicture,
    address,
    status,
  } = req.body;

  if (!firstName || !lastName) {
    res.status(400);
    throw new Error('Please add first name and last name');
  }

  const student = new Student({
    userId: req.user._id,
    firstName,
    lastName,
    email,
    phone,
    gradeLevel,
    subjects,
    enrollmentDate,
    profilePicture,
    address,
    status,
  });

  const createdStudent = await student.save();
  res.status(201).json(createdStudent);
});

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private
const updateStudent = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    gradeLevel,
    subjects,
    enrollmentDate,
    profilePicture,
    address,
    status,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error('Invalid student ID');
  }

  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  // Make sure user owns the student
  if (student.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    {
      firstName,
      lastName,
      email,
      phone,
      gradeLevel,
      subjects,
      enrollmentDate,
      profilePicture,
      address,
      status,
      updatedAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedStudent);
});

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private
const deleteStudent = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error('Invalid student ID');
  }

  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  // Make sure user owns the student
  if (student.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await Student.deleteOne({ _id: req.params.id });

  res.status(200).json({ success: true, message: 'Student removed' });
});

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
