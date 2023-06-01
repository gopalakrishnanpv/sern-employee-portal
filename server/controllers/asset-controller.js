const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('../middleware/validate-request');
const assetService = require('../services/asset-service');

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
    assetService.getAll()
        .then(assets => res.json(assets))
        .catch(next);
}

function getById(req, res, next) {
    assetService.getById(req.params.id)
        .then(asset => res.json(asset))
        .catch(next);
}

function create(req, res, next) {
    assetService.create(req.body)
        .then(() => res.json({ message: `Asset '${req.body.SerialNumber}' created successfully.` }))
        .catch(next);
}

function bulkCreate(req, res, next) {
    assetService.bulkCreate(req.body)
        .then(() => res.json({ message: `Assets imported successfully.` }))
        .catch(next);
}

function update(req, res, next) {
    assetService.update(req.params.id, req.body)
        .then(() => res.json({ message: `Asset updated successfully.` }))
        .catch(next);
}

function _delete(req, res, next) {
    const ids = req.query.ids
    const idList = ids.split(",")
    assetService.delete(idList)
        .then(() => res.json({ message: `Assets deleted successfully.` }))
        .catch(next);
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        SerialNumber: Joi.string().required(),
        Make: Joi.string().required(),
        Model: Joi.string().required(),
        WarrantyStatus: Joi.string().required(),
        AssetStatus: Joi.string().required(),
        PurchaseDate: Joi.string().required(),
        InvoiceNumber: Joi.string().required(),
        WarrantyExpirationDate: Joi.string().required(),
        AssetType: Joi.string().required(),
        HostName: Joi.string().required(),
        RequestNumber: Joi.string().required(),
        Age: Joi.string().required(),
        OperatingSystem: Joi.string().required(),
        Processor: Joi.string().required(),
        ClockSpeed: Joi.string().required(),
        RAM: Joi.string().required(),
        EmployeeId: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        SerialNumber: Joi.string().empty(''),
        Make: Joi.string().empty(''),
        Model: Joi.string().empty(''),
        WarrantyStatus: Joi.string().empty(''),
        AssetStatus: Joi.string().empty(''),
        PurchaseDate: Joi.string().empty(''),
        InvoiceNumber: Joi.string().empty(''),
        WarrantyExpirationDate: Joi.string().empty(''),
        AssetType: Joi.string().empty(''),
        HostName: Joi.string().empty(''),
        RequestNumber: Joi.string().empty(''),
        Age: Joi.string().empty(''),
        OperatingSystem: Joi.string().empty(''),
        Processor: Joi.string().empty(''),
        ClockSpeed: Joi.string().empty(''),
        RAM: Joi.string().empty(''),
        EmployeeId: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}