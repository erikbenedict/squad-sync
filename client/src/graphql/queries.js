import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const QUERY_CURRENT_USER = gql`
  query getCurrentUser($email: String!) {
    currentUser(email: $email) {
      _id
      email
      firstName
      lastName
    }
  }
`;

export const QUERY_USER_GROUPS = gql`
  query getUserGroups($userId: ID!) {
    userGroups(userId: $userId) {
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

// export const QUERY_GROUP_USERS = gql`
//   query getGroupUsers($groupId: ID!) {
//     groupUsers(groupId: $groupId) {
//       _id
//       firstName
//       lastName
//       email
//     }
//   }
// `;

export const QUERY_SINGLE_GROUP = gql`
  query getSingleGroup($groupId: ID!) {
    singleGroup(groupId: $groupId) {
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

// export const QUERY_GROUP_CATEGORIES = gql`
//   query getGroupCategories($groupId: ID!) {
//     groupCategories(groupId: $groupId) {
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

export const QUERY_SINGLE_CATEGORY = gql`
  query getSingleCategory($categoryId: ID!) {
    singleCategory(categoryId: $categoryId) {
      _id
      categoryName
      tasks {
        taskName
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
    singleTask(taskId: $taskId) {
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