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
  }

  type Mutation {
    register(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
