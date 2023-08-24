const { User, Group, Category, Task } = require('../models');
const { signToken, AuthenticationError } = require('../utils');

const resolvers = {
  Query: {
    currentUser: async (parent, { email }) => User.findOne({ email }),
    group: async (parent, { groupId }) => Group.findOne({ _id: groupId }),
    allGroups: async (parent, { userId }) => {
      const userGroups = await User.findOne({ _id: userId }).populate('groups');

      return userGroups.groups;
    },
    category: async (parent, { categoryId }) => Category.findOne({ _id: categoryId }),
    allCategories: async (parent, { groupId }) => {
      const groupCategories = await Group.findOne({ _id: groupId }).populate('categories');

      return groupCategories.categories;
    },
    task: async (parent, { taskId }) => Task.findOne({ _id: taskId }),
    allTasks: async (parent, { categoryId }) => {
      const categoryTasks = await Category.findOne({ _id: categoryId }).populate('tasks');

      return categoryTasks.tasks;
    },
  },

  Mutation: {
    register: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);
      return { token, currentUser: user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, currentUser: user };
    },
  },
};

module.exports = resolvers;
