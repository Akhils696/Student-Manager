const express = require('express');
const { 
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
  bulkDeleteTasks
} = require('../controllers/taskController');
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
router.get('/filter', protect, filterTasks);
router.get('/stats', protect, getTaskStats);
router.post('/bulk', protect, bulkCreateTasks);
router.put('/bulk', protect, bulkUpdateTasks);
router.delete('/bulk', protect, bulkDeleteTasks);

module.exports = router;