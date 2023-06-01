const express = require('express');
const router = express.Router();

const dashboardService = require('../services/dashboard-service');

// routes
router.get('/', getAll);

module.exports = router;

// route functions
function getAll(req, res, next) {
    dashboardService.getAll()
        .then(dashboard => res.json(dashboard))
        .catch(next);
}