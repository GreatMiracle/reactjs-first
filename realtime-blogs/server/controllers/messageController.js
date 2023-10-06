const { createNewMessageService, getAllMessageService } = require("../services/messageService");

const createNewMessageController = async (req, res) => {
    const results = await createNewMessageService(req, res);
    return results;
}
const getAllMessageController = async (req, res) => {
    const results = await getAllMessageService(req, res);
    return results;
}

module.exports = {
    createNewMessageController
    , getAllMessageController
}
