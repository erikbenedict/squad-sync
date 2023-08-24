const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const taskSchema = new Schema({
    taskName: {
        type: String,
        required: true,
        maxlength: 40,
        trim: true,
    },
    taskDescription: {
        type: String,
        trim: true,
    },
    dueDate: {
        type: Date,
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    comments: [
        {
            commentAuthor: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                maxlength: 250,
                trim: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            },
        },
    ],
});

const Task = model('TaskItem', taskSchema);

module.exports = Task;