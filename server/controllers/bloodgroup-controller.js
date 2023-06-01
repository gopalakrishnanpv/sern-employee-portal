const express = require('express');
const router = express.Router();

const bloodGroupService = require('../services/bloodgroup-service');

// routes
router.get('/', getAll);

module.exports = router;

// route functions
function getAll(req, res, next) {
    bloodGroupService.getAll()
        .then(bloodgroup => res.json(bloodgroup))
        .catch(next);
}