const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/:postId', auth, commentController.createComment);

module.exports = router;
