for connecting with mongodb there are different ways
but need to give DB name in url itself 
- can connect to two different dbs but need the 
SAME mongoose instance
- 1] mongoose.connect() // use when need to connect with only one db
- 2] mongoose.createConnection() // use when needs to connect with multiple dbs

EX:
============ EX 1 ==========================================


--- DB 1 connection--------------
//  this is default db 
mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`, {
    // mongoose.connect(`mongodb://0.0.0.0:27017`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connected to db successfully");
}).catch((err) => {
    console.log(err);
})

--- DB 2 connection ----------------
const conn=mongoose.createConnection(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${USER_DB_NAME}?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//const userDb=mongoose.connection; // this uses primary i.e. default connection 

conn.on('error',console.error.bind(console,'connection error:'));
conn.once('open',()=>{
    console.log(`connected to ${USER_DB_NAME} successfully`);
})

============= EX 2 ============================================
const mongoose = require('mongoose');

// Create a single Mongoose instance
const db1 = mongoose.createConnection('mongodb://localhost/db1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db2 = mongoose.createConnection('mongodb://localhost/db2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a model for the first database
const Model1 = db1.model('Model1', schema1);

// Define a model for the second database
const Model2 = db2.model('Model2', schema2);

// Use the models to interact with their respective databases
Model1.create({ field1: 'value1' }, (err, doc) => {
  // Database 1 operation
});

Model2.create({ field2: 'value2' }, (err, doc) => {
  // Database 2 operation
});

===========================================================
approach to connect with dbs:

dbs: 1)for read 2)for write
- create 2 different files
- create models in 1 files
- create file where all connections are made and \
  models are exported to use