import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://graphql.fauna.com/graphql',
    headers: {
      // FIXME: handle correctly
      authorization: 'Bearer fnADtUFCgqACDGkq9SysTIdCXL3xW9D1PH6HW11t',
      'X-Schema-Preview': 'partial-update-mutation'
    },
    fetch
  }),
  cache: new InMemoryCache()
})

export default client
