import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      currentUser {
        email
        firstName
        lastName
        _id
      }
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      currentUser {
        firstName
        lastName
      }
      token
    }
  }
`;

export const ADD_GROUP = gql`
  mutation addGroup($groupName: String!) {
    addGroup(groupName: $groupName) {
      _id
      groupName
      categories {
        _id
        categoryName
      }
      users {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory($groupId: ID!, $categoryName: String!) {
    addCategory(groupId: $groupId, categoryName: $categoryName) {
      _id
      categoryName
      tasks {
        _id
        taskName
        dueDate
        user {
          _id
          firstName
          lastName
        }
      }
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask(
    $categoryId: ID!
    $taskName: String!
    $taskDescription: String
    $dueDate: Date
    $assignedUserId: ID!
  ) {
    addTask(
      categoryId: $categoryId
      taskName: $taskName
      taskDescription: $taskDescription
      dueDate: $dueDate
      assignedUserId: $assignedUserId
    ) {
      _id
      taskName
      taskDescription
      dueDate
      users {
        _id
        firstName
        lastName
      }
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($taskId: ID!, $commentText: String!) {
    addComment(taskId: $taskId, commentText: $commentText) {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation updatedGroup($groupId: ID!, $groupName: String!) {
    updateGroup(groupId: $groupId, groupName: $groupName) {
      _id
      groupName
      categories {
        _id
        categoryName
      }
      users {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($categoryId: ID!, $categoryName: String!) {
    updateCategory(categoryId: $categoryId, categoryName: $categoryName) {
      _id
      categoryName
      tasks {
        _id
        taskName
        dueDate
        user {
          _id
          firstName
          lastName
        }
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask(
    $taskId: ID!
    $taskName: String!
    $taskDescription: String
    $dueDate: Date
    $assignedUserId: ID!
  ) {
    updateTask(
      taskId: $taskId
      taskName: $taskName
      taskDescription: $taskDescription
      dueDate: $dueDate
      assignedUserId: $assignedUserId
    ) {
      _id
      taskName
      taskDescription
      dueDate
      users {
        _id
        firstName
        lastName
      }
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;
