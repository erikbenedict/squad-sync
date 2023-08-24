const { User, Group, Category, Task } = require('../models');
const { signToken, AuthenticationError } = require('../utils');

const resolvers = {
  Query: {
    currentUser: async (parent, { email }) => User.findOne({ email }),
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
  },
};

module.exports = resolvers;
