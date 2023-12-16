module.exports={
    MONGO_IP:process.env.MONGO_IP || "mongo",
    MONGO_PORT:process.env.MONGO_PORT || 27017,
    MONGO_USER:process.env.MONGO_USER,
    MONGO_PASSWORD:process.env.MONGO_PASSWORD,
    USER_DB_NAME:process.env.USER_DB_NAME,
    POSTS_DB_NAME:process.env.POSTS_DB_NAME,
    SESSION_ABSOLUTE_TIMEOUT:process.env.SESSION_ABSOLUTE_TIMEOUT || 1000*60,
} 
