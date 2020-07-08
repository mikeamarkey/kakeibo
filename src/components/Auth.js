import { Container } from '@material-ui/core'
import { Layout, LoginForm, SignupForm } from 'src/components'

const Auth = () => {
  return (
    <Layout>
      <Container maxWidth='sm' disableGutters>
        <>
          <LoginForm />
          <SignupForm />
        </>
      </Container>
    </Layout>
  )
}

export default Auth
