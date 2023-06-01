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
    return await db.Role.findAll({
        include: [
            { model: db.Department },
            { model: db.Employee }]
    });
}

async function getById(id) {
    return await getRole(id);
}

async function create(params) {
    let department = await db.Department.findOne({ where: { Name: params.DepartmentName } })
    if (!department) throw `Department '${params.DepartmentName}' not found`;
    if (await db.Role.findOne({ where: { Name: params.Name, Department: { Id: department.Id } } })) {
        throw 'Role "' + params.Name + '" already exists in department "' + param.DepartmentName + '"."';
    }
    const roleData = { Name: params.Name, DepartmentId: department.Id }
    const Role = new db.Role(roleData);
    await Role.save();
}

async function bulkCreate(params) {
    for (let param of params) {
        let department = await db.Department.findOne({ where: { Name: param.DepartmentName } })
        if (!department) throw `Department '${param.DepartmentName}' not found`;
        if (await db.Role.findOne({ where: { Name: param.Name, DepartmentId: department.Id } })) {
            throw 'Role "' + param.Name + '" already exists in department "' + param.DepartmentName + '"."';
        }
        const roleData = { Name: param.Name, DepartmentId: department.Id }
        const Role = new db.Role(roleData);
        await Role.save();
    };
}

async function update(id, params) {
    const Role = await getRole(id);
    let department = await db.Department.findOne({ where: { Name: params.DepartmentName } })
    if (!department) throw `Department '${params.DepartmentName}' not found`;
    const nameChanged = params.Name && Role.Name !== params.Name;
    if (nameChanged && await db.Role.findOne({ where: { Name: params.Name, DepartmentId: department.Id } })) {
        throw 'Role "' + params.Name + '" already exists in department "' + params.DepartmentName + '"."';
    }
    const roleData = { Name: params.Name, DepartmentId: department.Id }
    Object.assign(Role, roleData);
    await Role.save();
}

async function _delete(ids) {
    for (let id of ids) {
        const Role = await getRole(id);
        await Role.destroy();
    }
}

async function getRole(id) {
    const Role = await db.Role.findByPk(id, { include: { model: db.Department } });
    if (!Role) throw 'Role not found';
    return Role;
}