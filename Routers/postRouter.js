const express = require('express');
const router = express.Router();

const {
    addPost,
    allpost,
    addComment,
    updateLikes,
    getPost,
    getComments,
    getStorie,
    createStory
} = require('../Controllers/userController')


router.get('/:id', getPost)
router.get('/', allpost);
router.get('/:id/comments', getComments);
router.post('/comment', addComment);
router.post('/:id/new', addPost);
router.put('/:id/liked', updateLikes);
router.get('/:id/getStories',getStorie);
router.post('/:id/createStory', createStory);

module.exports = router;