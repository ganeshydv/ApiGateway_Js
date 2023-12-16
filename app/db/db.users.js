const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { MONGO_PASSWORD, MONGO_USER, MONGO_PORT, MONGO_IP, USER_DB_NAME } = require("../config/config");


const conn = mongoose.createConnection(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${USER_DB_NAME}?authSource=admin`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    // const userDb=mongoose.connection; // this is for default connection

    conn.on('error', console.error.bind(console, 'connection error:'));
    conn.once('open', () => {
        console.log(`connected to ${USER_DB_NAME} successfully`);
    })


module.exports.userDbConnection = conn;


//======== following approaches are not working =========

// -------- another way to do it uisng function---------------

/*
const userDbConnection =async()=> {
    let conn =null;
    try {
         conn = await mongoose.createConnection(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${USER_DB_NAME}?authSource=admin`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`connected to ${USER_DB_NAME} successfully`);
        // console.log(conn);

    } catch (error) {
        console.log(error);
    }

    // const userDb=mongoose.connection; // this is for default connection

    // conn.on('error', console.error.bind(console, 'connection error:'));
    // conn.once('open', () => {
    //     console.log(`connected to ${USER_DB_NAME} successfully`);
    // })
    // return conn;
}
module.exports.userDbConnection= userDbConnection();
*/


// --------------- another way to do it using class - this is working  ----------------

/*
 class UserDB {
    constructor() {
        this._connection = null;
    }
    async connectUserDb() {
        try {
            const conn = await mongoose.createConnection(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${USER_DB_NAME}?authSource=admin`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }).asPromise();
            console.log(`connected to ${USER_DB_NAME} successfully`);
            this._connection = conn;
            return conn;
        } catch (error) {
            console.log(error);
        }

        // const userDb=mongoose.connection; // this is for default connection

        // conn.on('error', console.error.bind(console, 'connection error:'));
        // conn.once('open', () => {
        //     console.log(`connected to ${USER_DB_NAME} successfully`);

        // })
        // return conn;
    }

    userSchema() {
        let userSchema = new mongoose.Schema({
            name: {
                type: String,
                required: [true, "User must have a name"],
            },
            email: {
                type: String,
                required: [true, "User must have a email"],
            },
            password: {
                type: String,
                required: [true, "User must have a password"],
            },
            role: {
                type: String,
                enum: ["user", "admin"],
                default: "user",
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        });
        userSchema.pre('save', async function (next) {
            if (this.isModified('password')) {
                this.password = await bcrypt.hash(this.password, 8);
                return next();
            }
        })

        userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
            return await bcrypt.compare(candidatePassword, userPassword);
        }

        return userSchema;
    }

     getUserModel() {
        console.log("creating user model........");
        let model= this._connection.model("User",  this.userSchema());
        return model;
    }
}
// // to create singleton object of this class we have to export object of this class instead of class
module.exports.userDbConnection = new UserDB();
*/