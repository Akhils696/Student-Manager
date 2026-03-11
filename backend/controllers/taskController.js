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
  const { studentId, title, description, dueDate, priority, category, subject, notes, status } = req.body;

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
    subject,
    notes,
    status: status || 'pending',
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { studentId, title, description, dueDate, priority, status, category, subject, notes } = req.body;

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
      studentId,
      title,
      description,
      dueDate,
      priority,
      status,
      category,
      subject,
      notes,
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

// @desc    Filter tasks by criteria
// @route   GET /api/tasks/filter
// @access  Private
const filterTasks = asyncHandler(async (req, res) => {
  const { status, priority, category, startDate, endDate } = req.query;
  
  let filter = { userId: req.user._id };
  
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (category) filter.category = category;
  if (startDate || endDate) {
    filter.dueDate = {};
    if (startDate) filter.dueDate.$gte = new Date(startDate);
    if (endDate) filter.dueDate.$lte = new Date(endDate);
  }
  
  const tasks = await Task.find(filter).populate('studentId', 'firstName lastName').sort({ dueDate: 1 });
  
  res.status(200).json(tasks);
});

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Private
const getTaskStats = asyncHandler(async (req, res) => {
  const stats = await Task.aggregate([
    { $match: { userId: req.user._id } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);
  
  const priorityStats = await Task.aggregate([
    { $match: { userId: req.user._id } },
    {
      $group: {
        _id: '$priority',
        count: { $sum: 1 },
      },
    },
  ]);
  
  const overdueCount = await Task.countDocuments({
    userId: req.user._id,
    status: { $ne: 'completed' },
    dueDate: { $lt: new Date() },
  });
  
  res.status(200).json({
    statusCounts: stats,
    priorityCounts: priorityStats,
    overdueCount,
    totalCount: await Task.countDocuments({ userId: req.user._id }),
  });
});

// @desc    Bulk create tasks
// @route   POST /api/tasks/bulk
// @access  Private
const bulkCreateTasks = asyncHandler(async (req, res) => {
  const tasksData = req.body;
  
  if (!Array.isArray(tasksData)) {
    res.status(400);
    throw new Error('Request body must be an array');
  }
  
  const tasks = tasksData.map(taskData => ({
    ...taskData,
    userId: req.user._id,
    status: taskData.status || 'pending',
  }));
  
  const createdTasks = await Task.insertMany(tasks);
  
  res.status(201).json(createdTasks);
});

// @desc    Bulk update tasks
// @route   PUT /api/tasks/bulk
// @access  Private
const bulkUpdateTasks = asyncHandler(async (req, res) => {
  const { updates, ids } = req.body;
  
  if (!Array.isArray(ids) || !updates || Object.keys(updates).length === 0) {
    res.status(400);
    throw new Error('Invalid request format');
  }
  
  const result = await Task.updateMany(
    { _id: { $in: ids }, userId: req.user._id },
    { $set: updates }
  );
  
  res.status(200).json({ modifiedCount: result.modifiedCount, matchedCount: result.matchedCount });
});

// @desc    Bulk delete tasks
// @route   DELETE /api/tasks/bulk
// @access  Private
const bulkDeleteTasks = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  
  if (!Array.isArray(ids)) {
    res.status(400);
    throw new Error('IDs must be provided as an array');
  }
  
  const result = await Task.deleteMany({ _id: { $in: ids }, userId: req.user._id });
  
  res.status(200).json({ deletedCount: result.deletedCount });
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByStudent,
  filterTasks,
  getTaskStats,
  bulkCreateTasks,
  bulkUpdateTasks,
  bulkDeleteTasks,
};
