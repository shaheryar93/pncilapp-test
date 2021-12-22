
'use strict'
const express = require('express') ;
const topicController = require('../Controllers/topic.controller');
const router = express.Router();

router.post('/add', topicController.addTopic);
router.get('/get',topicController.getTopics);
module.exports = router;
