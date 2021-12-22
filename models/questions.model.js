'use strict'
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const questionSchema = new Schema({
    question:String,
    annotations:Array,
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
questionSchema.index({ '$**': 'text' });
let question = mongoose.model('question', questionSchema);
