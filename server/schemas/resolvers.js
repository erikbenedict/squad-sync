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
  },
};

module.exports = resolvers;
