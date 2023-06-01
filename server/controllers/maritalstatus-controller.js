const express = require('express');
const router = express.Router();

const maritalStatusService = require('../services/maritalstatus-service');

// routes
router.get('/', getAll);

module.exports = router;

// route functions
function getAll(req, res, next) {
    maritalStatusService.getAll()
        .then(maritalstatus => res.json(maritalstatus))
        .catch(next);
}