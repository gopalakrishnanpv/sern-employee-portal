const express = require('express');
const router = express.Router();

const authService = require('../services/auth-service');

router.get('/', getLoggedInUser);

module.exports = router;

function getLoggedInUser(req, res, next) {
    authService.getLoggedInUser()
        .then(loggedInUser => res.json(loggedInUser))
        .catch(next);
}