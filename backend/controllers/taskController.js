const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

// @desc    Get all tasks for logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id }).populate('studentId', 'firstName lastName').sort({ dueDate: 1 });
  
  res.status(200).json(tasks);
});

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).populate('studentId', 'firstName lastName');

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Make sure user owns the task
  if (task.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.status(200).json(task);
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { studentId, title, description, dueDate, priority, category } = req.body;

  if (!studentId || !title || !dueDate) {
    res.status(400);
    throw new Error('Please provide student, title, and due date');
  }

  const task = new Task({
    userId: req.user._id,
    studentId,
    title,
    description,
    dueDate,
    priority: priority || 'medium',
    category,
    status: 'pending',
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority, status, category } = req.body;

  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Make sure user owns the task
  if (task.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
      dueDate,
      priority,
      status,
      category,
      updatedAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedTask);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Make sure user owns the task
  if (task.userId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await Task.deleteOne({ _id: req.params.id });

  res.status(200).json({ success: true, message: 'Task removed' });
});

// @desc    Get tasks by student
// @route   GET /api/tasks/student/:studentId
// @access  Private
const getTasksByStudent = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ 
    userId: req.user._id,
    studentId: req.params.studentId 
  }).sort({ dueDate: 1 });
  
  res.status(200).json(tasks);
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByStudent,
};