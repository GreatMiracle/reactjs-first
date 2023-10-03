
const { getCurrentUserService } = require('../services/userService');

const getCurrentUserController = async (req, res) => {
    const results = await getCurrentUserService(req, res);
    return results;
}


module.exports = {
    getCurrentUserController
}
