
const mongoose = require('mongoose');
const { POSTS_DB_NAME, MONGO_IP, MONGO_PASSWORD, MONGO_USER, MONGO_PORT } = require('../config/config');

const conn = mongoose.createConnection(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${POSTS_DB_NAME}?authSource=admin`, {
    // mongoose.connect(`mongodb://0.0.0.0:27017`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => {
    console.log(`connected to ${POSTS_DB_NAME} successfully`);
})


module.exports.postDbConnection = conn;


//======== following approaches are not working =========
/*
class PostDB {
    constructor() {
        this._connection = this.connectPostDb();
    }
    connection() {
        return this._connection;
    }
    async connectPostDb() {

        const conn = mongoose.createConnection(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${POSTS_DB_NAME}?authSource=admin`, {
            // mongoose.connect(`mongodb://0.0.0.0:27017`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        conn.on('error', console.error.bind(console, 'connection error:'));
        conn.once('open', () => {
            console.log(`connected to ${POSTS_DB_NAME} successfully`);
        })

        return conn;
    }

    getPostSchema() {
        return new mongoose.Schema({
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
    }
}

module.exports.postDbConnection = new PostDB();
*/

/*

--- another way to do it uisng function----
async function connectPostDb() {

    const conn = mongoose.createConnection(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${POSTS_DB_NAME}?authSource=admin`, {
        // mongoose.connect(`mongodb://0.0.0.0:27017`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    conn.on('error', console.error.bind(console, 'connection error:'));
    conn.once('open', () => {
        console.log(`connected to ${POSTS_DB_NAME} successfully`);
    })

    return conn;
}

function  getPostSchema(){
    return new mongoose.Schema({
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
}

module.exports.postDbConnection = connectPostDb();
module.exports.postSchema = getPostSchema();

*/

