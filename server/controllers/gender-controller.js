const express = require('express');
const router = express.Router();

const genderService = require('../services/gender-service');

// routes
router.get('/', getAll);

module.exports = router;

// route functions
function getAll(req, res, next) {
    genderService.getAll()
        .then(gender => res.json(gender))
        .catch(next);
}