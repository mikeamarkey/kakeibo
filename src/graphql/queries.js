import { gql } from '@apollo/client'

export const GET_TRANSACTIONS_BY_MONTH = gql`
  query getTransactionsByMonth($month: String!) {
    getTransactionsByMonth(month: $month, _size: 500) {
      data {
        _id
        _ts
        category {
          _id
          color
          name
          order
        }
        createdAt
        date
        month
        name
        note
        order
        price
        type
      }
    }
  }
`

export const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      data {
        _id
        _ts
        color
        name
        order
      }
    }
  }
`

export const CREATE_TRANSACTION = gql`
  mutation createTransaction($data: TransactionInput!) {
    createTransaction(data: $data) {
      _id
      _ts
      category {
        _id
        color
        name
        order
      }
      createdAt
      date
      month
      name
      note
      order
      price
      type
    }
  }
`

export const CREATE_TRANSACTIONS = gql`
  mutation createTransactions($input: [TransactionInput!]!) {
    createTransactions(input: $input) {
      _id
      _ts
      category {
        _id
        color
        name
        order
      }
      createdAt
      date
      month
      name
      note
      order
      price
      type
    }
  }
`

export const UPDATE_TRANSACTION = gql`
  mutation partialUpdateTransaction($id: ID!, $data: PartialUpdateTransactionInput!) {
    updateTransaction: partialUpdateTransaction(id: $id, data: $data) {
      _id
      _ts
      category {
        _id
        name
        color
        order
      }
      createdAt
      date
      month
      name
      note
      order
      price
      type
    }
  }
`

export const SORT_TRANSACTIONS = gql`
  mutation sortTransactions($input: [SortInput!]!) {
    sortTransactions(input: $input) {
      _id
      order
    }
  }
`

export const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      _id
    }
  }
`

export const CREATE_CATEGORY = gql`
  mutation createCategory($data: CategoryInput!) {
    createCategory(data: $data) {
      _id
      _ts
      color
      name
      order
    }
  }
`

export const UPDATE_CATEGORY = gql`
  mutation partialUpdateCategory($id: ID!, $data: PartialUpdateCategoryInput!) {
    updateCategory: partialUpdateCategory(id: $id, data: $data) {
      _id
      _ts
      color
      name
      order
    }
  }
`

export const SORT_CATEGORIES = gql`
  mutation sortCategories($input: [SortInput!]!) {
    sortCategories(input: $input) {
      _id
      order
    }
  }
`

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      _id
    }
  }
`
