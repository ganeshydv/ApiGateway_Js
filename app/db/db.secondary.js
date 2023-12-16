'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = (config) => {
        let options = { keepAlive: 300000 };
        if (process.env.NODE_ENV  == 'production') {
            options = {
                server: { poolSize: 100, socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { poolSize: 100, socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
            };
            console.log('Connecting to mongo with options', options);
        }

        options['useMongoClient'] = true;
        const conn = mongoose.createConnection(config.db_read, options);
        //first conn
        conn.on('connected', function () {
            console.log('[2]Mongoose connection open to ' + config.db_read.split('/').pop());
        });

        conn.once('open', () => {
            console.log('[2]Connected to mongodb!');
            resolve(conn);
        });

        conn.on('error', function (err) {
            console.error('[2]Mongoose default error: ' + err);
            reject(err);
        });

        conn.on('disconnected', function () {
            console.log('[2]Mongoose default connection disconnected');
        });

        process.on('SIGINT', function () {
            conn.close(function () {
                console.log('[2]Mongoose default connection disconnected through app termination');
            });
        });
       return conn; 
};