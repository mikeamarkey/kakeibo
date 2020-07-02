import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://graphql.fauna.com/graphql',
    headers: {
      // FIXME: handle correctly
      authorization: 'Bearer fnEDvuVceCACDAO1QTBPoAIMdLjr2LSyVC-v1V3ZQDxhqitxTSs',
      'X-Schema-Preview': 'partial-update-mutation'
    },
    fetch
  }),
  cache: new InMemoryCache({
    freezeResults: true
  }),
  assumeImmutableResults: true,
  connectToDevTools: true
})

export default client
