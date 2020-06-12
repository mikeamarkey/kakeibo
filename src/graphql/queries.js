import { gql } from '@apollo/client'

export const GET_TRANSACTIONS_BY_MONTH = gql`
  query getTransactionsByMonth($month: String!) {
    getTransactionsByMonth(month: $month) {
      data {
        _id
        _ts
        category {
          _id
          name
          color
        }
        createdAt
        date
        month
        note
        price
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
        name
        color
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
        name
        color
      }
      createdAt
      date
      month
      note
      price
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
      }
      createdAt
      date
      month
      note
      price
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
      name
      color
    }
  }
`

export const UPDATE_CATEGORY = gql`
  mutation partialUpdateCategory($id: ID!, $data: PartialUpdateCategoryInput!) {
    updateCategory: partialUpdateCategory(id: $id, data: $data) {
      _id
      _ts
      name
      color
    }
  }
`

export const DELETE_CATEGORY = gql`
  mutation deleteCategorfy($id: ID!) {
    deleteCategory(id: $id) {
      _id
    }
  }
`
