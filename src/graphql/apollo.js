import Router from 'next/router'
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { onError } from '@apollo/link-error'
import { getAuthToken, removeAuthData } from 'src/lib/auth'

const httpLink = createHttpLink({
  uri: 'https://graphql.fauna.com/graphql',
  headers: {
    'X-Schema-Preview': 'partial-update-mutation'
  },
  fetch
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${getAuthToken()}`
    }
  }))

  return forward(operation)
})

const logoutLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors.length > 0 && graphQLErrors[0].message === 'Invalid database secret.') {
    console.log('removing auth data and signing out...')
    removeAuthData()
    Router.reload()
  }
})

const client = new ApolloClient({
  link: from([logoutLink, authMiddleware, httpLink]),
  cache: new InMemoryCache({
    freezeResults: true
  }),
  assumeImmutableResults: true,
  connectToDevTools: true
})

export default client
