import { gql } from '@apollo/client'

export const GET_TRANSACTIONS = gql`
  query getTransactions {
    getTransactions {
      data {
        _id
        _ts
        date
        id
        month
        note
        price
      }
    }
  }
`

export const GET_TRANSACTIONS_BY_MONTH = gql`
  query getTransactionsByMonth($month: String!) {
    getTransactionsByMonth(month: $month) {
      data {
        _id
        _ts
        date
        id
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
        id
        name
      }
    }
  }
`

export const CREATE_TRANSACTION = gql`
  mutation createTransaction($data: TransactionInput!) {
    createTransaction(data: $data) {
      _id
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
