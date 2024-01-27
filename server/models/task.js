const mongoose = require('mongoose');

const user = require('../models/user');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: user,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    priorityLevel: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;