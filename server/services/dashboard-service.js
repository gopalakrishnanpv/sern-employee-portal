const db = require('../models/index');
module.exports = {
    getAll,
};

async function getAll() {
    const departments = db.Department.findAll();
    const roles = db.Role.findAll();
    const employees = db.Employee.findAll({
        include: [
            { model: db.Role, include: { model: db.Department } },
            { model: db.Asset },
            { model: db.Gender },
            { model: db.MaritalStatus },
            { model: db.BloodGroup }
        ]
    });
    const assets = db.Asset.findAll();
    return Promise.all([departments, roles, employees, assets])
}