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
    return await db.Department.findAll({
        include: [
            { model: db.Employee }
        ]
    });
}

async function getById(id) {
    return await getDepartment(id);
}

async function create(params) {
    if (await db.Department.findOne({ where: { Name: params.Name } })) {
        throw 'Department "' + params.Name + '" already exists.';
    }

    const Department = new db.Department(params);
    await Department.save();
}

async function bulkCreate(params) {
    for (let param of params) {
        if (await db.Department.findOne({ where: { Name: param.Name } })) {
            throw 'Department "' + param.Name + '" already exists.';
        }

        const Department = new db.Department(param);
        await Department.save();
    };
}

async function update(id, params) {
    const Department = await getDepartment(id);
    const nameChanged = params.Name && Department.Name !== params.Name;
    if (nameChanged && await db.Department.findOne({ where: { Name: params.Name } })) {
        throw 'Department "' + params.Name + '" is already exists.';
    }

    Object.assign(Department, params);
    await Department.save();
}

async function _delete(ids) {
    for (let id of ids) {
        const Department = await getDepartment(id);
        await Department.destroy();
    }
}

async function getDepartment(id) {
    const Department = await db.Department.findByPk(id);
    if (!Department) throw 'Department not found';
    return Department;
}