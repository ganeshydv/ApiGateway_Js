const { getAllPosts, createPost, getPostById, updatePost, deletePost } = require('../controller/postController');

const router = require('express').Router();

router
    .route('/')
    .get(getAllPosts)
    .post(createPost)

router
    .route('/:id')
    .get(getPostById)
    .patch(updatePost)
    .delete(deletePost);

module.exports = router;