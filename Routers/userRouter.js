const express = require('express');
const router = express.Router();

const {
    getUser,
    alluser,
    updateFollowing,
    updateFollowers,
    getNotifications
} = require('../Controllers/userController');


router.get('/', alluser);
router.get('/:id',getUser);
router.get('/:id/notification', getNotifications);
router.put('/:id/updateFollowing', updateFollowing);
router.put('/:id/updateFollowers', updateFollowers);



module.exports = router;