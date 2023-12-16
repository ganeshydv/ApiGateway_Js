// Desc: this file is used to define all the routes of the application but not used in this project

const checkRoute=require('./controller/checkRouteOk')
const postRoute=require('./controller/postController')
const router = require('express').Router();


// exports.route =  function(app){
//         app.get("/checkOk",checkRoute.checkOk);
//  }



module.exports.route = function(app){ // this also works
    app.get("/checkOk",checkRoute.checkOk);
}

// following routes are build using express router
router.get("/checkOk",checkRoute.checkOk); 
router.route("/2").get(checkRoute.checkOk); 


module.exports.router = router;
module.exports.postRoute = function(app){
    app.get("/getposts",postRoute.getAllPosts);
    app.post("/createpost",postRoute.createPost);
    app.get("/getpost/:id",postRoute.getPostById);
    app.patch("/updatepost/:id",postRoute.updatePost);
    app.delete("/deletepost/:id",postRoute.deletePost);
}

// module.exports.route = class route{ // this also works
//     constructor(app){
//         this.app=app;
//     }
    
//     getRoute(){
//         this.app.get("/checkOk",checkRoute.checkOk);
//     }
    
// }