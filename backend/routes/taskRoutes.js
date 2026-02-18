const express = require('express');
const { getTasks, getTaskById, createTask, updateTask, deleteTask, getTasksByStudent } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.route('/:id')
  .get(protect, getTaskById)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

router.get('/student/:studentId', protect, getTasksByStudent);

module.exports = router;