
'use strict'
const express = require('express') ;
const questionController = require('../controllers/question.controller');
const router = express.Router();

router.post('/add', questionController.addQuestion);
module.exports = router;
