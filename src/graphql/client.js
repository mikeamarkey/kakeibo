import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://graphql.fauna.com/graphql',
    headers: {
      // FIXME: handle correctly
      authorization: 'Bearer fnADtUFCgqACDGkq9SysTIdCXL3xW9D1PH6HW11t',
      'X-Schema-Preview': 'partial-update-mutation'
    },
    /* eslint-disable */
    fetch
    /* eslint-enable */
  }),
  cache: new InMemoryCache({
    freezeResults: true
  }),
  assumeImmutableResults: true,
  connectToDevTools: true
})

export default client
