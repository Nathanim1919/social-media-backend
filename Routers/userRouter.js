const express = require('express');
const router = express.Router();

const {
    getUser,
    alluser,
    updateFollowing,
    updateFollowers,
    getNotifications,
    sendMessage,
    getConversation
} = require('../Controllers/userController');


router.get('/', alluser);
router.get('/:id',getUser);
router.post('/:id/startchat/sent', sendMessage);
router.get('/:id/startchat/conversation', getConversation);
router.get('/:id/notification', getNotifications);
router.put('/:id/updateFollowing', updateFollowing);
router.put('/:id/updateFollowers', updateFollowers);

module.exports = router;