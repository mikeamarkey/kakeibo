import { useEffect, useState } from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ApolloProvider } from '@apollo/client'
import client from 'src/graphql/apollo'
import { getToken, AuthContext } from 'src/lib/auth'
import { Auth, Loading } from 'src/components'
import theme from 'src/styles/theme'
import 'src/styles/global.css'

function App ({ Component, pageProps }) {
  const [loading, setLoading] = useState(true)
  const token = getToken()

  useEffect(() => {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <>
      <Head>
        <title>Kakeibo</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>

      <AuthContext.Provider value={token}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {loading && (
            <Loading />
          )}

          {!loading && !token && (
            <Auth />
          )}

          {!loading && token && (
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          )}
        </ThemeProvider>
      </AuthContext.Provider>
    </>
  )
}

export default App
