const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('../middleware/validate-request');
const departmentService = require('../services/department-service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.post('/bulkCreate', bulkCreate);
router.put('/:id', updateSchema, update);
router.delete('/', _delete);

module.exports = router;

// route functions
function getAll(req, res, next) {
    departmentService.getAll()
        .then(departments => res.json(departments))
        .catch(next);
}

function getById(req, res, next) {
    departmentService.getById(req.params.id)
        .then(department => res.json(department))
        .catch(next);
}

function create(req, res, next) {
    departmentService.create(req.body)
        .then(() => res.json({ message: `Department '${req.body.Name}' created successfully.` }))
        .catch(next);
}

function bulkCreate(req, res, next) {
    departmentService.bulkCreate(req.body)
        .then(() => res.json({ message: `Departments imported successfully.` }))
        .catch(next);
}

function update(req, res, next) {
    departmentService.update(req.params.id, req.body)
        .then(() => res.json({ message: `Department updated successfully.` }))
        .catch(next);
}

function _delete(req, res, next) {
    const ids = req.query.ids
    const idList = ids.split(",")
    departmentService.delete(idList)
        .then(() => res.json({ message: `Departments deleted successfully.` }))
        .catch(() => res.json({ message: `Delete failed. Please unlink departments from roles and try again.` }));
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        Name: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        Name: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}