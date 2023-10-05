const { createNewChatService, getAllChatsService, getDetailChatService } = require("../services/chatService");

const createNewChatController = async (req, res) => {
    const results = await createNewChatService(req, res);
    return results;
}

const getAllChatsController = async (req, res) => {

    const results = await getAllChatsService(req, res);
    return results;
}

const getDetailChatController = async (req, res) => {
    console.log("=-=-=-=-=sf=afasfasf-----------");
    const results = await getDetailChatService(req, res);
    return results;
}


module.exports = {
    createNewChatController
    , getAllChatsController
    , getDetailChatController
}
