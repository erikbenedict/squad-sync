const typeDefs = `#graphql
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    groups: [Group]!
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
    users: [User]!
    comments: [Comment]!
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
    currentUser(email: String!): User
    getUserGroups(userId: ID!): [Group]!
    getGroupUsers(groupId: ID!): [User]!
    getSingleGroup(groupId: ID!): Group
    getGroupCategories(groupId: ID!): [Category]!
    getSingleCategory(categoryId: ID!): Category
    getCategoryTasks(categoryId: ID!): [Task]!
    getSingleTask(taskId: ID!): Task
  }

  type Mutation {
    register(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addGroup(groupName: String!): Group
    updateGroup(groupId: ID!, groupName: String!): Group
    removeGroup(groupId: ID!): Group
    addCategory(groupId: ID!, categoryName: String!): Category
    updateCategory(categoryId: ID!, categoryName: String!): Category
    removeCategory(groupId: ID!, categoryId: ID!): Category
    addTask(categoryId: ID!, taskName: String!, taskDescription: String, dueDate: String!, assignedUserId: ID!): Task
    updateTask(taskId: ID!, taskName: String!, taskDescription: String, dueDate: String!, assignedUserId: ID!): Task
    removeTask(categoryId: ID!, taskId: ID!): Task
    addComment(taskId: ID!, commentText: String!): Task
    removeComment(taskId: ID!, commentId: ID!): Task
  }
`;

module.exports = typeDefs;
