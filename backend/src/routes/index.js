const express = require('express');
const router = express.Router();
const { getAllItems, createItem } = require('../controllers/index');

// Define routes
router.get('/items', getAllItems);
router.post('/items', createItem);

module.exports = router;