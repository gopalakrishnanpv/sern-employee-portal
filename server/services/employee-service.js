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
    return await db.Employee.findAll({
        include: [
            { model: db.Role, include: { model: db.Department } },
            { model: db.Asset },
            { model: db.Gender },
            { model: db.MaritalStatus },
            { model: db.BloodGroup }
        ]
    });
}

async function getById(id) {
    return await getEmployee(id);
}

async function create(params) {
    let role = await db.Role.findOne({ where: { Name: params.RoleName }, include: { model: db.Department } })
    if (!role) throw `Role '${params.RoleName}' not found`;
    let gender = await db.Gender.findOne({ where: { Name: params.Gender } })
    if (!gender) throw `Gender '${params.Gender}' not found`;
    let maritalStatus = await db.MaritalStatus.findOne({ where: { Name: params.MaritalStatus } })
    if (!maritalStatus) throw `MaritalStatus '${params.MaritalStatus}' not found`;
    let bloodGroup = await db.BloodGroup.findOne({ where: { Name: params.BloodGroup } })
    if (!bloodGroup) throw `BloodGroup '${params.BloodGroup}' not found`;

    if (await db.Employee.findOne({ where: { Name: params.Name, EmployeeId: params.EmployeeId } })) {
        throw 'Employee "' + params.Name + '" already exists with id "' + params.EmployeeId + '"."';
    }
    const employeeData = {
        ...params, RoleId: role.Id, DepartmentId: role.Department.Id, GenderId: gender.Id,
        MaritalStatusId: maritalStatus.Id, BloodGroupId: bloodGroup.Id
    }
    const Employee = new db.Employee(employeeData);
    await Employee.save();
}

async function bulkCreate(params) {
    for (let param of params) {
        let role = await db.Role.findOne({ where: { Name: param.RoleName }, include: { model: db.Department } })
        if (!role) throw `Role '${param.RoleName}' not found`;
        let gender = await db.Gender.findOne({ where: { Name: param.Gender } })
        if (!gender) throw `Gender '${param.Gender}' not found`;
        let maritalStatus = await db.MaritalStatus.findOne({ where: { Name: param.MaritalStatus } })
        if (!maritalStatus) throw `MaritalStatus '${param.MaritalStatus}' not found`;
        let bloodGroup = await db.BloodGroup.findOne({ where: { Name: param.BloodGroup } })
        if (!bloodGroup) throw `BloodGroup '${param.BloodGroup}' not found`;
        if (await db.Employee.findOne({ where: { Name: param.Name, EmployeeId: param.EmployeeId } })) {
            throw 'Employee "' + param.Name + '" already exists with id "' + param.EmployeeId + '"."';
        }
        const employeeData = {
            ...param, RoleId: role.Id, DepartmentId: role.Department.Id, GenderId: gender.Id,
            MaritalStatusId: maritalStatus.Id, BloodGroupId: bloodGroup.Id
        }
        const Employee = new db.Employee(employeeData);
        await Employee.save();
    };
}

async function update(id, params) {
    const Employee = await getEmployee(id);
    let role = await db.Role.findOne({ where: { Name: params.RoleName }, include: { model: db.Department } })
    if (!role) throw `Role '${params.RoleName}' not found`;
    let gender = await db.Gender.findOne({ where: { Name: params.Gender } })
    if (!gender) throw `Gender '${params.Gender}' not found`;
    let maritalStatus = await db.MaritalStatus.findOne({ where: { Name: params.MaritalStatus } })
    if (!maritalStatus) throw `MaritalStatus '${params.MaritalStatus}' not found`;
    let bloodGroup = await db.BloodGroup.findOne({ where: { Name: params.BloodGroup } })
    if (!bloodGroup) throw `BloodGroup '${params.BloodGroup}' not found`;

    const nameIdChanged = (params.Name && Employee.Name !== params.Name) &&
        params.EmployeeId && Employee.EmployeeId !== params.EmployeeId;
    if (nameIdChanged && await db.Employee.findOne({ where: { Name: params.Name, EmployeeId: params.EmployeeId } })) {
        throw 'Employee "' + params.Name + '" already exists with id "' + params.EmployeeId + '"."';
    }
    const employeeData = {
        ...params, RoleId: role.Id, DepartmentId: role.Department.Id, GenderId: gender.Id,
        MaritalStatusId: maritalStatus.Id, BloodGroupId: bloodGroup.Id
    }
    Object.assign(Employee, employeeData);
    await Employee.save();
}

async function _delete(ids) {
    for (let id of ids) {
        const Employee = await getEmployee(id);
        await Employee.destroy();
    }
}

async function getEmployee(id) {
    const Employee = await db.Employee.findByPk(id, {
        include: [
            { model: db.Role, include: { model: db.Department } },
            { model: db.Asset },
            { model: db.Gender },
            { model: db.MaritalStatus },
            { model: db.BloodGroup }
        ]
    });
    if (!Employee) throw 'Employee not found';
    return Employee;
}