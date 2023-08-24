const { Schema, model } = require('mongoose');

const groupSchema = new Schema({
  groupName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 40,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Group = model('Group', groupSchema);

module.exports = Group;
