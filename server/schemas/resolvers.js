// resolvers.js
const { User, Group, Category, Task } = require('../models');
const { signToken, AuthenticationError } = require('../utils');

const resolvers = {
  Query: {
    getSingleUser: async (parent, { email }) => User.findOne({ email }),

    getUserGroups: async (parent, { userId }) => {
      const userGroups = await User.findOne({ _id: userId }).populate('groups');

      return userGroups.groups;
    },

    getSingleGroup: async (parent, { groupId }) => {
      const group = await Group.findOne({ _id: groupId }).populate('users');
      return group;
    },

    getSingleCategory: async (parent, { categoryId }) =>
      Category.findOne({ _id: categoryId }),

    getGroupCategories: async (parent, { groupId }) => {
      const groupCategories = await Group.findOne({ _id: groupId }).populate({
        path: 'categories',
        populate: {
          path: 'tasks',
        },
      });

      return groupCategories.categories;
    },

    getSingleTask: async (parent, { taskId }) => Task.findOne({ _id: taskId }),

    // getCategoryTasks: async (parent, { categoryId }) => {
    //   const categoryTasks = await Category.findOne({
    //     _id: categoryId,
    //   }).populate('tasks');

    //   return categoryTasks.tasks;
    // },
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

    addGroup: async (parent, { groupName, userId }) => {
      const group = await Group.create({ groupName });
      await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { groups: group._id } },
        { new: true }
      );
      await Group.findOneAndUpdate(
        { groupName },
        { $addToSet: { users: userId } },
        { new: true }
      );
      return group;
    },

    addUserToGroup: async (parent, { groupId, email }) => {
      const userToAdd = await User.findOneAndUpdate(
        { email },
        { $addToSet: { groups: groupId } },
        { new: true }
      );
      const groupToUpdate = await Group.findByIdAndUpdate(
        groupId,
        { $addToSet: { users: userToAdd._id } },
        { new: true }
      );

      const updatedGroup = await groupToUpdate.populate('users');

      return updatedGroup;
    },

    addCategory: async (parent, { groupId, categoryName }) => {
      const category = await Category.create({ categoryName });

      await Group.findOneAndUpdate(
        { _id: groupId },
        { $addToSet: { categories: category._id } },
        { new: true }
      );

      return category;
    },

    // addTask: async (
    //   parent,
    //   {
    //     categoryId,
    //     taskName,
    //     taskDescription,
    //     dueDate,
    //     priority,
    //     assignedUserId,
    //   }
    // ) => {
    //   const taskData = {
    //     taskName,
    //     taskDescription,
    //     dueDate,
    //     priority,
    //     users: [],
    //   };

    //   let user;

    //   if (assignedUserId) {
    //     user = await User.findById(assignedUserId);
    //     taskData.users.push(user._id);
    //   }

    //   const task = await Task.create(taskData);

    //   await Category.findOneAndUpdate(
    //     { _id: categoryId },
    //     { $addToSet: { tasks: task._id } },
    //     { new: true }
    //   );

    //   if (assignedUserId) {
    //     user.tasks.push(task._id);
    //     await user.save();
    //   }

    //   return task;
    // },

    addTask: async (
      parent,
      { categoryId, taskName, taskDescription, dueDate, priority }
    ) => {
      const task = await Task.create({
        taskName,
        taskDescription,
        dueDate,
        priority,
      });

      await Category.findOneAndUpdate(
        { _id: categoryId },
        { $addToSet: { tasks: task._id } },
        { new: true }
      );

      return task;
    },

    addComment: async (parent, { taskId, commentText }, currentUser) =>
      Task.findOneAndUpdate(
        { _id: taskId },
        {
          $addToSet: {
            comments: { commentText, commentAuthor: currentUser.firstName },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      ),

    // updateGroup: async (parent, { groupId, groupName }) => {
    //   const groupToUpdate = await Group.findById(groupId);
    //   if (!groupToUpdate) {
    //     throw new Error('Group not found.');
    //   }

    //   groupToUpdate.groupName = groupName;
    //   await groupToUpdate.save();

    //   return groupToUpdate;
    // },

    //   throw new AuthenticationError('You must be logged in to update a group.');
    // },
    updateCategory: async (parent, { categoryId, categoryName }) => {
      const categoryToUpdate = await Category.findById(categoryId);
      if (!categoryToUpdate) {
        throw new Error('Category not found');
      }

      categoryToUpdate.categoryName = categoryName;
      await categoryToUpdate.save();

      return categoryToUpdate;
    },

    updateTask: async (
      parent,
      { taskId, taskName, taskDescription, dueDate, priority, assignedUserId }
    ) => {
      const taskToUpdate = await Task.findById(taskId);
      if (!taskToUpdate) {
        throw new Error('Task not found');
      }

      if (taskName) taskToUpdate.taskName = taskName;
      if (taskDescription) taskToUpdate.taskDescription = taskDescription;
      if (dueDate) taskToUpdate.dueDate = dueDate;
      if (priority) taskToUpdate.priority = priority;
      if (assignedUserId) {
        const assignedUser = await User.findById(assignedUserId);
        if (!assignedUser) {
          throw new Error('Assigned user not found.');
        }
        taskToUpdate.users = [assignedUser._id];
      }

      await taskToUpdate.save();

      return taskToUpdate;
    },

    updateTaskDescription: async (parent, { taskId, taskDescription }) => {
      const taskToUpdate = await Task.findById(taskId);

      if (!taskToUpdate) {
        throw new Error('Task not found');
      }

      taskToUpdate.taskDescription = taskDescription;

      await taskToUpdate.save();

      return taskToUpdate;
    },

    removeGroup: async (parent, { groupId }) => {
      try {
        const groupToDelete = await Group.findById(groupId);

        if (!groupToDelete) {
          throw new Error('Group not found.');
        }

        const usersInGroup = await User.find({
          _id: { $in: groupToDelete.users },
        });

        const updateUserPromises = usersInGroup.map(async (user) => {
          user.groups.pull(groupId);
          return user.save();
        });

        await Promise.all(updateUserPromises);

        const categoriesToDelete = groupToDelete.categories;
        await Category.deleteMany({ _id: { $in: categoriesToDelete } });

        const tasksToDelete = categoriesToDelete.tasks;
        await Task.deleteMany({ _id: { $in: tasksToDelete } });

        await Group.findByIdAndDelete(groupId);

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    removeUserFromGroup: async (parent, { userId, groupId }) => {
      const userToRemove = await User.findById(userId);
      const groupToUpdate = await Group.findById(groupId);

      if (!userToRemove || !groupToUpdate) {
        throw new Error('User or group not found.');
      }

      groupToUpdate.users = groupToUpdate.users.filter(
        (id) => id.toString() !== userId
      );
      await groupToUpdate.save();

      return groupToUpdate;
    },

    removeCategory: async (parent, { groupId, categoryId }) => {
      const category = await Category.findOneAndDelete({ _id: categoryId });

      const tasksToDelete = category.tasks || [];

      await Task.deleteMany({ _id: { $in: tasksToDelete } });

      await Group.findOneAndUpdate(
        { _id: groupId },
        { $pull: { categories: category._id } }
      );

      return category;
    },

    removeTask: async (parent, { categoryId, taskId }) => {
      const task = await Task.findOneAndDelete({ _id: taskId });
      await Category.findOneAndUpdate(
        { _id: categoryId },
        { $pull: { tasks: task._id } }
      );

      return task;
    },

    removeComment: async (parent, { taskId, commentId }) =>
      Task.findOneAndUpdate(
        { _id: taskId },
        {
          $pull: {
            comments: {
              _id: commentId,
            },
          },
        },
        { new: true }
      ),
  },
};

module.exports = resolvers;
