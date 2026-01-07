const express = require('express');
const router = express.Router();
const taskManagerController = require('../controllers/taskManagerController');

// Public routes - no authentication required
router.get('/stats', taskManagerController.getTaskStats);
router.get('/', taskManagerController.getAllTasks);
router.post('/', taskManagerController.createTask);
router.get('/:id', taskManagerController.getTask);
router.put('/:id', taskManagerController.updateTask);
router.delete('/:id', taskManagerController.deleteTask);

module.exports = router;
