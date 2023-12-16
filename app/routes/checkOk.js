const  router=require('express').Router();
const checkRoute=require('../controller/checkRouteOk');
const { isAuthendicated } = require('../middleware/authMiddlewares');

module.exports.checkRoute = router;

router.get("/ok",isAuthendicated,checkRoute.checkOk); // this also works
router.route("/2").get(checkRoute.checkOk); // this also works