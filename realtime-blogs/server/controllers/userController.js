
const { getCurrentUserService, getAllUserService, updateProfilePictureService } = require('../services/userService');

const getCurrentUserController = async (req, res) => {
    const results = await getCurrentUserService(req, res);
    return results;
}

const getAllUserController = async (req, res) => {
    const results = await getAllUserService(req, res);
    return results;
}

const updateProfilePictureController = async (req, res) => {
    const results = await updateProfilePictureService(req, res);
    return results;
}


module.exports = {
    getCurrentUserController
    , getAllUserController
    , updateProfilePictureController
}
