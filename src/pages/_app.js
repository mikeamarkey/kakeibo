import { useEffect, useState } from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ApolloProvider } from '@apollo/client'
import client from 'src/graphql/apollo'
import { getAuthData, AuthContext } from 'src/lib/auth'
import { Auth, Loading } from 'src/components'
import theme from 'src/styles/theme'
import 'src/styles/global.css'

function App ({ Component, pageProps }) {
  const [loading, setLoading] = useState(true)
  const authData = getAuthData()

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
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
        />
      </Head>

      <AuthContext.Provider value={authData}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {loading && (
            <Loading />
          )}

          {!loading && !authData && (
            <Auth />
          )}

          {!loading && authData && (
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
