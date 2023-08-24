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
  }
`

export const QUERY_GROUP_USERS = gql`
query getGroupUsers()
`

export const QUERY_SINGLE_GROUP = gql`
query getSingleGroup()
`

export const QUERY_GROUP_CATEGORIES = gql`
query getGroupCategories
`

export const QUERY_SINGLE_CATEGORY = gql`
query getSingleCategory
`

export const QUERY_CATEGORY_TASKS = gql`
query getCategoryTasks
`

export const QUERY_SINGLE_TASK = gql`
query getSingleTask
`