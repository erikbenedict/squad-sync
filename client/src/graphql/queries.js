import { gql } from '@apollo/client';

export const QUERY_SINGLE_USER = gql`
  query getSingleUser($email: String!) {
    getSingleUser(email: $email) {
      _id
      email
      firstName
      lastName
    }
  }
`;

export const QUERY_USER_GROUPS = gql`
  query getUserGroups($userId: ID!) {
    getUserGroups(userId: $userId) {
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

export const QUERY_SINGLE_GROUP = gql`
  query getSingleGroup($groupId: ID!) {
    getSingleGroup(groupId: $groupId) {
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

export const QUERY_GROUP_CATEGORIES = gql`
  query getGroupCategories($groupId: ID!) {
    getGroupCategories(groupId: $groupId) {
      _id
      categoryName
      tasks {
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
  }
`;

export const QUERY_SINGLE_CATEGORY = gql`
  query getSingleCategory($categoryId: ID!) {
    getSingleCategory(categoryId: $categoryId) {
      _id
      categoryName
      tasks {
        taskName
        taskDescription
        dueDate
        priority
        users {
          _id
          firstName
          lastName
        }
      }
    }
  }
`;

// export const QUERY_CATEGORY_TASKS = gql`
//   query getCategoryTasks($categoryId: ID!) {
//     categoryTasks(categoryId: $categoryId) {
//       _id
//       categoryName
//       tasks {
//         _id
//         taskName
//         taskDescription
//         dueDate
//       }
//     }
//   }
// `;

export const QUERY_SINGLE_TASK = gql`
  query getSingleTask($taskId: ID!) {
    getSingleTask(taskId: $taskId) {
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
