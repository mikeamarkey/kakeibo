import { useEffect } from 'react'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ApolloProvider } from '@apollo/client'
import client from 'src/graphql/client'

function App ({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Kakeibo</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <CssBaseline />
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default App
