// typeDefs.js
const typeDefs = `#graphql
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    groups: [Group]!
    tasks: [Task]!
  }

   type Category {
    _id: ID
    categoryName: String
    tasks: [Task]!
  }

  type Group {
    _id: ID
    groupName: String
    categories: [Category]!
    users: [User]!
  }
  
  type Task {
    _id: ID
    taskName: String
    taskDescription: String
    dueDate: String
    priority: String
    users: [User]
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    currentUser: User
  }

  type Query {
    getSingleUser(email: String!): User
    getUserGroups(userId: ID!): [Group]!
    getSingleGroup(groupId: ID!): Group
    getGroupCategories(groupId: ID!): [Category]!
    getSingleCategory(categoryId: ID!): Category
    #getCategoryTasks(categoryId: ID!): [Task]!
    getSingleTask(taskId: ID!): Task
  }


  type Mutation {
    register(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addGroup(groupName: String!, userId: ID!): Group
    addUserToGroup(groupId: ID!, email: String!): Group
    addCategory(groupId: ID!, categoryName: String!): Category
    addTask(categoryId: ID!, taskName: String, taskDescription: String, dueDate: String, priority: String): Task
    addComment(taskId: ID!, commentText: String!): Task
    #updateGroup(groupId: ID!, groupName: String!): Group
    updateCategory(categoryId: ID!, categoryName: String!): Category
    updateTask(taskId: ID!, taskName: String!, taskDescription: String, dueDate: String, priority: String! assignedUserId: ID): Task
    removeGroup(groupId: ID!): Group
    removeUserFromGroup(userId: ID!, groupId: ID!): Group
    removeCategory(groupId: ID!, categoryId: ID!): Category
    removeTask(categoryId: ID!, taskId: ID!): Task
    removeComment(taskId: ID!, commentId: ID!): Task
  }
`;

module.exports = typeDefs;
