// mutations.js
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
  mutation addGroup($groupName: String!, $userId: ID!) {
    addGroup(groupName: $groupName, userId: $userId) {
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

export const ADD_USER_TO_GROUP = gql`
  mutation addUserToGroup($groupId: ID!, $email: String!) {
    addUserToGroup(groupId: $groupId, email: $email) {
      _id
      groupName
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
        users {
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
    $taskName: String
    $taskDescription: String
    $dueDate: String
    $priority: String
  ) {
    addTask(
      categoryId: $categoryId
      taskName: $taskName
      taskDescription: $taskDescription
      dueDate: $dueDate
      priority: $priority
    ) {
      _id
      taskName
      taskDescription
      dueDate
      priority
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

// export const UPDATE_GROUP = gql`
//   mutation updatedGroup($groupId: ID!, $groupName: String!) {
//     updateGroup(groupId: $groupId, groupName: $groupName) {
//       _id
//       groupName
//       categories {
//         _id
//         categoryName
//       }
//       users {
//         _id
//         firstName
//         lastName
//       }
//     }
//   }
// `;

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
    $priority: String!
    $assignedUserId: ID!
  ) {
    updateTask(
      taskId: $taskId
      taskName: $taskName
      taskDescription: $taskDescription
      dueDate: $dueDate
      priority: $priority
      assignedUserId: $assignedUserId
    ) {
      _id
      taskName
      taskDescription
      dueDate
      priority
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

export const UPDATE_TASK_DESCRIPTION = gql`
  mutation updateTaskDescription(
    $taskId: ID!
    $taskDescription: String!
  ) {
    updateTaskDescription(taskId: $taskId, taskDescription: $taskDescription) {
      _id
      taskDescription
    }
  }
`;

export const REMOVE_GROUP = gql`
  mutation removeGroup($groupId: ID!) {
    removeGroup(groupId: $groupId) {
      _id
    }
  }
`;

export const REMOVE_USER_FROM_GROUP = gql`
  mutation removeUserFromGroup($userId: ID!, $groupId: ID!) {
    removeUserFromGroup(userId: $userId, groupId: $groupId) {
      _id
      groupName
      users {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const REMOVE_CATEGORY = gql`
  mutation removeCategory($groupId: ID!, $categoryId: ID!) {
    removeCategory(groupId: $groupId, categoryId: $categoryId) {
      _id
    }
  }
`;

export const REMOVE_TASK = gql`
  mutation removeTask($categoryId: ID!, $taskId: ID!) {
    removeTask(categoryId: $categoryId, taskId: $taskId) {
      _id
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($commentId: ID!) {
    removeComment(commentId: $commentId) {
      _id
    }
  }
`;
