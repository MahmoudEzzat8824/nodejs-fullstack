const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

// Task routes
router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.get('/stats', taskController.getTaskStats);
router.get('/:id', taskController.getTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
