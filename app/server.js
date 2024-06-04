
const express = require("express");
const routes = require('./router');
const mongoose = require('mongoose');
const redis = require('ioredis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('./db/db.redis');
const expressBunyanLogger = require('express-bunyan-logger');
const logger = require('./config/logger.conf').logger;
const CustomFileStream = require('./config/logger.conf').CustomFileStream;
const q = require("./db/db.users");
const b = require("./db/db.posts");
const { checkRoute } = require("./routes/checkOk");
const authRoute = require("./routes/authRoutes");
const postRoute = require("./routes/postsRoutes")
const { isActive } = require("./middleware/authMiddlewares");
const { rateLimiter } = require("./utils/rateLimiter");


(async () => {

    const app = express();

    let redisStore = new RedisStore({ client: redisClient })

    // postDbConnection();
    // userDbConnection();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // following line is saying that we are behind a proxy and trust whatever is coming from it in the header
    app.enable("trust proxy"); // this is required for rate limiter

    // rate limiter
    app.use(rateLimiter);
    
    //The session data is typically stored in the session store, such as Redis, at the end of the request lifecycle
    // general process: create session (cookie + userData ) -> store session in redis -> send cookie to client ( only cookie will be sent not whole session )-> client sends cookie in header -> server verifies cookie by searching cookie in redis by sid of cookie and then it adds session to request ( not response object ) (using session in request we can finds user releated info from session) and perform specific user related operations -> at the end of request session is stored in redis again
    app.use(session({
        store: redisStore, //this store the session in redis
        secret: "this is secret",
        name: "sid",
        cookie: {
            maxAge: 1000 * 60 * 30, // 30 minutes
            sameSite: true,
            secure: false, // set to true in production
        },
        rolling: true,
        resave: false,//resave: This option controls whether the session should be saved to the store even if the session was not modified during the request. Setting it to false means that the session will be saved only if it has been modified
        saveUninitialized: false,//This option determines whether a session should be saved to the store when it is new but not modified. Setting it to false means that a session will not be saved to the store unless it is modified.
    }))
    // app.use(BodyParser.json())
    // app.use(expressBunyanLogger({
    //     logger:logger,
    //     obfuscate:['body.password','body.email'],
    //     // stream: new CustomFileStream(),
    // }))
    
    // app.use(isActive);
    app.use('/api/check', isActive, checkRoute) // this also works
    app.use('/api/v1/auth', authRoute)
    app.use('/api/v1/posts',isActive, postRoute)



    //======================================================
    // 1) using router from express
    // app.use('/router', routes.router) 
    //====== Different ways to register routes =======
    // 2) using method 
    // routes.route(app);// this also works

    // 3) using class
    // this regiser the routes before the server starts
    // let helloRoute=new routes.route(app);
    // helloRoute.getRoute();
    //======================================================

    const port = process.env.PORT || 3000;

    app.listen(port, () => {

        // start server and then regiser the routes
        // let helloRoute=new routes.route(app);
        // helloRoute.getRoute();
        console.log(`server running on port ${port}`);
    })

})();

