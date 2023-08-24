const { User, Group, Category, Task } = require('../models');
const { signToken, AuthenticationError } = require('../utils');

const resolvers = {
  Query: {
    currentUser: async (parent, { email }) => User.findOne({ email }),
    getSingleGroup: async (parent, { groupId }) => Group.findOne({ _id: groupId }),
    getUserGroups: async (parent, { userId }) => {
      const userGroups = await User.findOne({ _id: userId }).populate('groups');

      return userGroups.groups;
    },
    getSingleCategory: async (parent, { categoryId }) => Category.findOne({ _id: categoryId }),
    getGroupCategories: async (parent, { groupId }) => {
      const groupCategories = await Group.findOne({ _id: groupId }).populate('categories');

      return groupCategories.categories;
    },
    getSingleTask: async (parent, { taskId }) => Task.findOne({ _id: taskId }),
    getCategoryTasks: async (parent, { categoryId }) => {
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
    addGroup: async (parent, { groupName }, context) => {
      if (context.user) {
        const group = await Group.create({ groupName });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { groups: group._id } },
          { new: true }
        );

        return group;
      }
      throw AuthenticationError('You need to be logged in!');
    },
    addCategory: async (parent, { groupId, categoryName }, context) => {
      if (context.user) {
        const category = await Category.create({ categoryName });

        await Group.findOneAndUpdate(
          { _id: groupId },
          { $addToSet: { categories: category._id } },
          { new: true }
        );

        return category;
      }
      throw new AuthenticationError('You must be logged in to add a category.');
    },
    addTask: async (
      parent,
      { categoryId, taskName, taskDescription, dueDate },
      context
    ) => {
      if (context.user) {
        const task = await Task.create({ taskName, taskDescription, dueDate });

        await Category.findOneAndUpdate(
          { _id: categoryId },
          { $addToSet: { tasks: task._id } },
          { new: true }
        );

        return task;
      }
      throw new AuthenticationError('You must be logged in to add a task.');
    },
    addComment: async (parent, { taskId, commentText }, context) => {
      if (context.user) {
        return Task.findOneAndUpdate(
          { _id: taskId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.firstName },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You must be logged in to add a comment.');
    },
    updateGroup: async (parent, { groupId, groupName }, context) => {
      if (context.user) {
        const groupToUpdate = await Group.findById(groupId);
        if (!groupToUpdate) {
          throw new Error('Group not found.');
        }

        if (!groupToUpdate.users.includes(context.user._id.toString())) {
          throw new AuthenticationError(
            'You are not authorized to update this group.'
          );
        }

        groupToUpdate.groupName = groupName;
        await groupToUpdate.save();

        return groupToUpdate;
      }
      throw new AuthenticationError('You must be logged in to update a group.');
    },
    updateCategory: async (parent, { categoryId, categoryName }, context) => {
      if (context.user) {
        const categoryToUpdate = await Category.findById(categoryId);
        if (!categoryToUpdate) {
          throw new Error('Category not found');
        }

        categoryToUpdate.categoryName = categoryName;
        await categoryToUpdate.save();

        return categoryToUpdate;
      }
      throw new AuthenticationError(
        'You must be logged in to update a category.'
      );
    },
    updateTask: async (
      parent,
      { taskId, taskName, taskDescription, dueDate },
      context
    ) => {
      if (context.user) {
        const taskToUpdate = await Task.findById(taskId);
        if (!taskToUpdate) {
          throw new Error('Task not found');
        }

        if (taskName) taskToUpdate.taskName = taskName;
        if (taskDescription) taskToUpdate.taskDescription = taskDescription;
        if (dueDate) taskToUpdate.dueDate = dueDate;

        await taskToUpdate.save();

        return taskToUpdate;
      }
      throw new AuthenticationError('You must be logged in to update a task.');
    },
    removeGroup: async (parent, { groupId }, context) => {
      if (context.user) {
        const group = await Group.findOneAndDelete({
          _id: groupId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { groups: group._id } }
        );

        return group;
      }
      throw new AuthenticationError(
        'You are not authorized to delete this group'
      );
    },
    removeCategory: async (parent, { groupId, categoryId }, context) => {
      if (context.user) {
        const category = await Category.findOneAndDelete({ _id: categoryId });
        await Group.findOneAndUpdate(
          { _id: groupId },
          { $pull: { categories: category._id } }
        );

        return category;
      }
      throw new AuthenticationError(
        'You are not authorized to delete this category'
      );
    },
    removeTask: async (parent, { categoryId, taskId }, context) => {
      if (context.user) {
        const task = await Task.findOneAndDelete({ _id: taskId });
        await Category.findOneAndUpdate(
          { _id: categoryId },
          { $pull: { tasks: task._id } }
        );

        return task;
      }
      throw new AuthenticationError(
        'You are not authorized to delete this task'
      );
    },
    removeComment: async (parent, { taskId, commentId }, context) => {
      if (context.user) {
        return Task.findOneAndUpdate(
          { _id: taskId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.firstName,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError(
        'You are not authorized to delete this comment'
      );
    },
  },
};

module.exports = resolvers;
