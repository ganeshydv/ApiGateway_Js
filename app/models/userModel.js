const mongoose = require('mongoose');
const { userDbConnection } = require('../db/db.users');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({

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
// console.log(userDbConnection);
const User = userDbConnection.model("User", userSchema);
module.exports.User = User;


// ---------- following approach is not working -----------------
/*
function getUserSchema() {
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
*/


// =============== following approach is working if class is used ==================
/*
async function getUserModel() {
    await userDbConnection.connectUserDb();
    return  userDbConnection.getUserModel();
}

need to await USer in Controller or anywhere else where it is used
do :
 console.log(await User);
 user =await (await User).findOne({ email: req.body.email })
    console.log(user.password);
 if (user &&  user.correctPassword(req.body.password, (user).password)) {

module.exports.User = getUserModel();

*/
