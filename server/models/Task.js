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
    type: String,
  },
  priority: {
    type: String,
    required: true,
    trim: true,
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
      commentText: {
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

const Task = model('Task', taskSchema);

module.exports = Task;
