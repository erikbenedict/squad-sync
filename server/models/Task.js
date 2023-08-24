const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 40,
        trim: true,
    },
    description: {
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
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            comment: {
                type: String,
                maxlength: 250,
                trim: true,
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
        },
    ],
});

const Task = model('TaskItem', taskSchema);

module.exports = Task;