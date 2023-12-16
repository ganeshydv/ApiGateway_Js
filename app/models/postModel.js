const mongoose = require("mongoose");
const { postDbConnection } = require("../db/db.posts");


const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Post must have a userId"],
    },
    title: {
        type: String,
        required: [true, "Post must have a title"],
    },
    body: {
        type: String,
        required: [true, "Post must have a body"],
    },
})

const postsModel = postDbConnection.model("Post", postSchema);
module.exports.Posts = postsModel;


// ---------- following is not working ---------

// async function createPostModels() {
//     let conn = await postDbConnection.connection();
//     return await conn.model("Post", postDbConnection.getPostSchema());
// }
// let x = createPostModels()
// module.exports.Posts = x;

//---------------- another way to do it ----------------

// let Posts;
// postDbConnection.then((conn) => {
// let postSchema = new mongoose.Schema({
//         userId: {
//             type: String,
//             required: [true, "Post must have a userId"],
//         },
//         title: {
//             type: String,
//             required: [true, "Post must have a title"],
//         },
//         body: {
//             type: String,
//             required: [true, "Post must have a body"],
//         },
//     })
// }
//      Posts = conn.model("Post", postSchema);
// })


// module.exports.Posts = Posts;