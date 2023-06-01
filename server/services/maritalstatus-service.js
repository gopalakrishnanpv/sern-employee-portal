const db = require('../models/index');
module.exports = {
    getAll,
};

async function getAll() {
    return await db.MaritalStatus.findAll()
}