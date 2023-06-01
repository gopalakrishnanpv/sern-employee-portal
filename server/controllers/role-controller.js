const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('../middleware/validate-request');
const roleService = require('../services/role-service');

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
    roleService.getAll()
        .then(roles => res.json(roles))
        .catch(next);
}

function getById(req, res, next) {
    roleService.getById(req.params.id)
        .then(role => res.json(role))
        .catch(next);
}

function create(req, res, next) {
    roleService.create(req.body)
        .then(() => res.json({ message: `Role '${req.body.Name}' created successfully.` }))
        .catch(next);
}

function bulkCreate(req, res, next) {
    roleService.bulkCreate(req.body)
        .then(() => res.json({ message: `Roles imported successfully.` }))
        .catch(next);
}

function update(req, res, next) {
    roleService.update(req.params.id, req.body)
        .then(() => res.json({ message: `Role updated successfully.` }))
        .catch(next);
}

function _delete(req, res, next) {
    const ids = req.query.ids
    const idList = ids.split(",")
    roleService.delete(idList)
        .then(() => res.json({ message: `Roles deleted successfully.` }))
        .catch(() => res.json({ message: `Delete failed. Please unlink roles from employees and try again.` }));
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        Name: Joi.string().required(),
        DepartmentName: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        Name: Joi.string().empty(''),
        DepartmentName: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}