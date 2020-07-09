import { useState } from 'react'
import { Container } from '@material-ui/core'
import { Layout, Loading, LoginForm, SignupForm } from 'src/components'

const Auth = () => {
  const [loading, setLoading] = useState(false)
  return (
    <Layout>
      <Container maxWidth='sm' disableGutters>
        <>
          <LoginForm setLoading={setLoading} />
          <SignupForm setLoading={setLoading} />
          {loading && (
            <Loading dim />
          )}
        </>
      </Container>
    </Layout>
  )
}

export default Auth
