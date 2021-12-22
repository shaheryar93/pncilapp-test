const express = require('express') ; //exprees package
var bodyParser = require('body-parser'); //exprees package
const mongoose = require('mongoose');  //mongoose package
const cors = require('cors');
const app = express();
const route = require('./routes/mainRoutes').router;
const config = require('./config/config');
const topicModel =require('./models/topic.model');
const questionModel =require('./models/questions.model');
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

const useLocalDB = false;
const dbString = useLocalDB ? config.localDB : config.liveDB;
console.log(dbString);
mongoose.connect(dbString);
mongoose.connection.on('error', function (err) {
    console.log(`error while connecting ${config.dbName}`, err);
});

mongoose.connection.on('connected', function (err, ref) {
    console.log(`connected to db ${config.dbName}`);
    app.listen(process.env.PORT || config.port, () => {
        console.log(
            `connected to server and listening on port ${process.env.PORT || config.port
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