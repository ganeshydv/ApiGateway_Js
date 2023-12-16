'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = (config) => {
    if (process.env.NODE_ENV === 'development')
        mongoose.set('debug', true);

    let options = { keepAlive: 300000 };
    if (process.env.NODE_ENV === 'production') {
        options = {
            server: { poolSize: 100, socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
            replset: { poolSize: 100, socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
        };
        console.log('Connecting to mongo with options', options);
    }

    options['useMongoClient'] = true;
    mongoose.connect(config.db, options, (err) => {
        if (err) console.log('[1]MongoDB connect Error:', err);
    });
    //first conn
    mongoose.connection.on('connected', function () {
        console.log('[1]Mongoose connection open to ' + config.db.split('/').pop());
    });

    mongoose.connection.once('open', () => {
        console.log('[1]Connected to mongodb!');
    });

    mongoose.connection.on('error', function (err) {
        console.error('[1]Mongoose default error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('[1]Mongoose default connection disconnected');
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('[1]Mongoose default connection disconnected through app termination');
        });
    });
};