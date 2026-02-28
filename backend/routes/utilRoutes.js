const express = require('express');
const { getServerStats, getApiDocs } = require('../controllers/utilController');
const router = express.Router();

// Public routes (no authentication required)
router.get('/stats', getServerStats);
router.get('/docs', getApiDocs);

module.exports = router;