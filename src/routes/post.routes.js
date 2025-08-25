const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const auth = require('../middlewares/auth.middleware');
const moviesList = require('../controllers/movie.controller')
const usmController = require('../controllers/usm.controller');

// router.post('/', auth, postController.createPost);
// router.get('/', postController.getAllPosts);
// router.get('/:id', postController.getPostById);

router.post('/registerUser', usmController.usmRegister);
router.post('/getlogin', usmController.login);
router.get('/getAllMovies', moviesList.getAllMovies);
module.exports = router;
