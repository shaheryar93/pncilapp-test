'use strict'
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const topicSchema = new Schema({
    topicName:String,
    isDeleted: {
        type: Boolean,
        default: false
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topic',
    },
    options:[],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
topicSchema.index({ '$**': 'text' });
let topic = mongoose.model('topic', topicSchema);
