const { createJWT, updateSession, destroySession } = require("../middleware/authMiddlewares");
// const { userDbConnection } = require("../db/mongoUserDb");
const { User } = require('../models/userModel');

module.exports.loginController = async function (req, res, next) {

    let user = null;
    try {
 
        user = await User.findOne({ email: req.body.email })
        //    console.log(user);
        if (user && await user.correctPassword(req.body.password, user.password)) {
            console.log("logging in user........");
            try {
                let token = createJWT(user._id, user.email);
                updateSession(req, user.id);
                req.session.token=token;
                res.send({
                    status: "success",
                    message: "user found",
                    token: token
                })
            } catch (error) {
                res.send({
                    status: "fail",
                    // message: "error while creating token"
                })
            }
            // create token and send
        } else {
            res.send({
                status: "fail",
                message: "email or password is incorrect"
            })
        }
    } catch (error) {
        console.log(error);
        res.send({
            status: "fail",
            // message: "error in finding user",
            message: "email or password is incorrect",
        })
    }

}


module.exports.registerUserController = async function (req, res, next) {

    console.log("registering user........");
    let user = null;
    try {
        //    user= await User.findOne({email:req.body.email})
        const found = await User.exists({ email: req.body.email });
        console.log(found);
        if (!found) {
            try {
                //    user =await new User({
                //        name:req.body.name,
                //        email:req.body.email,
                //        password:req.body.password
                //    }).save();
                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                req.session.userId=user.id;
                updateSession(req, user.id);
                let token = createJWT(user._id, user.email);
                req.session.token=token;
                console.log(req.session);
                res.send({
                    status: "success",
                    message: "user created",
                    // token: token
                })
            } catch (error) {
                res.send({
                    status: "fail",
                    message: "error in creating user"
                })
            }
            // create token and send
        } else {
            res.send({
                status: "fail",
                message: "user already present"
            })
        }
    } catch (error) {
        console.log(error);
        res.send({
            status: "fail",
            message: "error in finding user"
        })
    }

}

module.exports.logoutController = function (req, res, next) {
    if (req.session.userId) {
        // logOut(req);
        destroySession(req);
        res.send({
            status: "success",
            message: "logged out successfully"
        })
        return;
    }
}

module.exports.SsoController = function (req, res, next) {

    // login using google 

}