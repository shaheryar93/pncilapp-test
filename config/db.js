const mongoose = require('mongoose');  // mongoose package




const config = require('./config.js');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.localDBConnectionString, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }, function (err) {
    if (err) {
        console.log(err);
    }
});

mongoose.connection.on('error', function (err) {
    console.log(`error while connecting ${process.env.dbName}`, err);
});

mongoose.connection.on('connected', function (err, ref) {
    console.log('Connected to mongo server', err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});