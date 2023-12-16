class customDB {
    constructor() {
        this.models = {};
        this.readConnection = null;
        // {model:collectionName} // this needed as collection names are not same as Model
        this.model_list = {
          'User':'users'
        };
    }
    async createConnection(app, config) {
        try {
            require('./db.primary')(config.dbConfig); //load default database connection
            this.readConnection = await require('./db.secondary')(config.dbConfig); // Create new connection
            Object.keys(this.model_list).map(collect => {
                this.models[collect] = this.readConnection.model(collect, this.model_list[collect]);
            });
        } catch (err) {
            console.log('connection error =>', err);
        }
    }
    getConnection() {
      return this.readConnection;
    }
    getModels() {
        return this.models;
    }
}


module.exports = new customDB();