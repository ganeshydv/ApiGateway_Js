const redisClient=require('../db/db.redis');
client.on('error', function (error) {
    console.log(error);
});


module.exports.rateLimiter = async function (req, res, next) {
    console.log("rate limiter");
    try{
        const ip=req.ip;
        // increment the request count for the ip
        const requestCount=await redisClient.incrAsync(ip);
        if(requestCount===1){
            // set the expiry of the key to 60 seconds
            await redisClient.expireAsync(ip,60);
        }
        // if request count is greater than 5 then send rate limit exceeded
        if(requestCount>5){
            res.status(429).send({
                message: "rate limit exceeded"
            })
        }
    }catch(error){
        console.log(error);
        res.send({
            status: "fail",
            message: "error in rate limiter"
        })
    }
}