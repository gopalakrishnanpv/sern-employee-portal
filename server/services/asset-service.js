const db = require('../models/index');

module.exports = {
    getAll,
    getById,
    create,
    bulkCreate: bulkCreate,
    update,
    delete: _delete,
};

async function getAll() {
    return await db.Asset.findAll({
        include: [
            { model: db.Employee }
        ]
    });
}

async function getById(id) {
    return await getAsset(id);
}

async function create(params) {
    if (await db.Asset.findOne({ where: { SerialNumber: params.SerialNumber } })) {
        throw 'Asset "' + params.SerialNumber + '" already exists."';
    }
    const Asset = new db.Asset(params);
    await Asset.save();
}

async function bulkCreate(params) {
    for (let param of params) {
        if (await db.Asset.findOne({ where: { SerialNumber: param.SerialNumber } })) {
            throw 'Asset "' + param.SerialNumber + '" already exists."';
        }
        let employee = await db.Employee.findOne({ where: { EmployeeId: param.EmployeeId } })
        if (!employee) throw `Employee with id '${param.EmployeeId}' not found`;

        const assetData = {
            ...param, EmployeeId: employee.Id
        }
        const Asset = new db.Asset(assetData);
        await Asset.save();
    };
}

async function update(id, params) {
    const Asset = await getAsset(id);
    Object.assign(Asset, params);
    await Asset.save();
}

async function _delete(ids) {
    for (let id of ids) {
        const Asset = await getAsset(id);
        await Asset.destroy();
    }
}

async function getAsset(id) {
    const Asset = await db.Asset.findByPk(id, { include: { model: db.Employee } });
    if (!Asset) throw 'Asset not found';
    return Asset;
}