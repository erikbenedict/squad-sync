const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    maxlength: 40,
    trim: true,
  },
  tasks: [
    {
        type:Schema.Types.ObjectId,
        ref: 'Task'
    }
  ]
})

const Category = model('Category', categorySchema);

module.exports = Category;