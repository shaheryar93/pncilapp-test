'use strict';
const base = '/api';
const testController = require('../controllers/test.controller');


let router = function (app) {
    app.route(base + '/test').get(testController.test);
    app.use(base + '/topic',require('./topic.routes'));
    app.use(base + '/question',require('./question.routes'));
  
};

exports.router = router;
