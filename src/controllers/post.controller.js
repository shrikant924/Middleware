const Post = require('../models/post.model');

exports.createPost = async (req, res) => {
    try {
        const post = await Post.create({ ...req.body, author: req.userId });
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Post creation failed', error: err.message });
    }
};

exports.getAllPosts = async (req, res) => {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
};

exports.getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
};
