const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('../middleware/validate-request');
const employeeService = require('../services/employee-service');

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
    employeeService.getAll()
        .then(employees => res.json(employees))
        .catch(next);
}

function getById(req, res, next) {
    employeeService.getById(req.params.id)
        .then(employee => res.json(employee))
        .catch(next);
}

function create(req, res, next) {
    employeeService.create(req.body)
        .then(() => res.json({ message: `Employee '${req.body.Name}' created successfully.` }))
        .catch(next);
}

function bulkCreate(req, res, next) {
    employeeService.bulkCreate(req.body)
        .then(() => res.json({ message: `Employees imported successfully.` }))
        .catch(next);
}

function update(req, res, next) {
    employeeService.update(req.params.id, req.body)
        .then(() => res.json({ message: `Employee updated successfully.` }))
        .catch(next);
}

function _delete(req, res, next) {
    const ids = req.query.ids
    const idList = ids.split(",")
    employeeService.delete(idList)
        .then(() => res.json({ message: `Employees deleted successfully.` }))
        .catch(() => res.json({ message: `Delete failed. Please unlink assets from employees and try again.` }));
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        Name: Joi.string().required(),
        EmployeeId: Joi.number().required(),
        RoleName: Joi.string().required(),
        UserName: Joi.string().required(),
        FatherName: Joi.string().required(),
        MotherName: Joi.string().required(),
        DateOfBirth: Joi.string().required(),
        DateOfJoining: Joi.string().required(),
        EmailId: Joi.string().required(),
        MobileNumber: Joi.string().required(),
        Education: Joi.string().required(),
        Gender: Joi.string().required(),
        MaritalStatus: Joi.string().required(),
        BloodGroup: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        Name: Joi.string().empty(''),
        EmployeeId: Joi.number().required(),
        RoleName: Joi.string().empty(''),
        UserName: Joi.string().empty(''),
        FatherName: Joi.string().empty(''),
        MotherName: Joi.string().empty(''),
        DateOfBirth: Joi.string().empty(''),
        DateOfJoining: Joi.string().empty(''),
        EmailId: Joi.string().empty(''),
        MobileNumber: Joi.string().empty(''),
        Education: Joi.string().empty(''),
        Gender: Joi.string().empty(''),
        MaritalStatus: Joi.string().empty(''),
        BloodGroup: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}