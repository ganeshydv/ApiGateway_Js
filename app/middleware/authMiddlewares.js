
const jwt = require("jsonwebtoken");
const { SESSION_ABSOLUTE_TIMEOUT } = require("../config/config");

module.exports.isAuthorized = async (req, res, next) => {

    this.token = req.headers.authorization;
    if (!this.token) {
        return res.status(401).json({
            status: "fail",
            message: "You are not logged in",
        });
    }

    try {
        const decoded = jwt.verify(this.token, process.env.JWT_SECRET);
        req.user = decoded.sub;
    } catch (err) {
        return res.status(401).json({
            status: "fail",
            message: "You are not logged in",
        });
    }
    next();
};

module.exports.isAuthendicated = (req, res, next) => {
    console.log(req.headers.authorization);
    console.log("verfiy token");
    console.log(req.session);
    try {
        jwt.verify(req.session.token, process.env.JWT_SECRET);
    } catch (error) {
        console.log("token invalid");
        res.status(500).send({
            status: "failed jwt authendication",
            message: "error in verifying token " + error
        })
        return;
    }
    console.log("token valid");
    next();
}
module.exports.createJWT = (id, email) => {
    const now = Math.floor(Date.now());
    // console.log(id,email);
    const expirationDate = now + 20;
    let payload = {
        iat: Date.now(),
        sub: {
            type: "access",
            email: email,
            uid: id
        },
        exp: expirationDate
    }
    let token = null;
    token = jwt.sign(payload, process.env.JWT_SECRET)
    // console.log(token);
    return token
}

module.exports.isLoggedIn = (req, res, next) => {
  
    if (req.session?.userId) {
        res.send({
            status: 400,
            message: "already logged in"
        })
        return;
    }
    next();
}

module.exports.updateSession = function(req, userId) {
    req.session.userId = userId;
    req.session.createdAt = Date.now();
}
module.exports.destroySession =(req)=>{
    req.session.destroy();
}
module.exports.isLogOut = (req, res, next) => {
    // console.log(req.session);
    if (!req.session.userId) {
        res.status(403).send({
            status: "fail",
            message: "please log in first"
        })
        return;
    }
    next();
}

module.exports.isActive = async (req, res, next) => {
    if(!req.session?.userId){
        console.log("checking session");
        return res.status(403).json({
            status: "fail",
            message: "please log in first",
        }
        );
    }
    if(req.session?.userId){
        console.log("checking session");
        const now = Date.now();
        const createdAt = req.session.createdAt;
        if(now>createdAt+SESSION_ABSOLUTE_TIMEOUT){
            this.destroySession(req);    
            return res.status(403).json({
                    status: "fail",
                    message: "Session expired",
            }
            );
        }
    }
    next();
}
