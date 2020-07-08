import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { onError } from '@apollo/link-error'
import { getToken, removeToken } from 'src/lib/auth'

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
      authorization: `Bearer ${getToken()}`
    }
  }))

  return forward(operation)
})

const logoutLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors.length > 0 && graphQLErrors[0].message === 'Invalid database secret.') {
    console.log('removing token and signing out...')
    removeToken()
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
