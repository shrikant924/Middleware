const Comment = require('../models/comment.model');

exports.createComment = async (req, res) => {
    try {
        const comment = await Comment.create({
            content: req.body.content,
            author: req.userId,
            post: req.params.postId
        });
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Comment creation failed', error: err.message });
    }
};
