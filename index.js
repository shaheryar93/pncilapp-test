const express = require('express') ; //exprees package
var bodyParser = require('body-parser'); //exprees package
const mongoose = require('mongoose'); 
const path = require('path'); //mongoose package
const cors = require('cors');
const app = express();
const route = require('./routes/mainRoutes').router;
const config = require('./config/config');
const topicModel =require('./models/topic.model');
const envFile =  process.env.ENV ? `.${process.env.ENV}` : '' ;
require('dotenv').config({ path: path.join(__dirname, `/.env${envFile}`) });
const questionModel =require('./models/questions.model');
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
console.log( process.env.port)
const useLocalDB = false;
const dbString = useLocalDB ? process.env.localDBConnectionString : process.env.localDBConnectionString;
// console.log(dbString);
mongoose.connect(dbString);
mongoose.connection.on('error', function (err) {
    console.log(`error while connecting ${process.env.dbName}`, err);
});

mongoose.connection.on('connected', function (err, ref) {
    console.log(`connected to db ${process.env.dbName}`);
    app.listen(process.env.PORT || process.env.port, () => {
        console.log(
            `connected to server and listening on port ${process.env.PORT || process.env.PORT
            }`
        );
        
    });
});

mongoose.connection.once('open', function () {
    app.emit('ready');
});




app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, Authorization, X-Requested-With, Content-Type, Accept, environment'
    );
    next();
});

app.on('ready', function () {
    route(app);
});