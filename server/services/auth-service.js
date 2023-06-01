const os = require("os");

module.exports = {
    getLoggedInUser,
};

async function getLoggedInUser() {
    return os.userInfo();
}