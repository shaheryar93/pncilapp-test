
'use strict'
const express = require('express') ;
const topicController = require('../controllers/topic.controller');
const router = express.Router();

router.post('/add', topicController.addTopic);
router.get('/search',topicController.getTopics);
module.exports = router;
