
// 
const { Posts } = require("../models/postModel")

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Posts.find();
        res.status(200).json({
            status: "success",
            results: posts.length,
            data: {
                posts,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                post,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
}

exports.createPost = async (req, res) => {
    try {
        const newPost = await Posts.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                post: newPost,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
}

exports.updatePost = async (req, res) => {
    try {
        const newPost = await Posts.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json({
            status: "success",
            data: {
                post: newPost,
                new: true,
                runValdiators: true,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
}

exports.deletePost = async (req, res) => {
    try {
        await Posts.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
        });
    }
}
