import { useState } from 'react'
import { Button, Container, Paper, TextField, makeStyles } from '@material-ui/core'
import { Layout, Subheader } from 'src/components'

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(1),
    '& > .MuiTextField-root': {
      margin: `${theme.spacing(1)}px 0`
    }
  },
  submit: {
    padding: `${theme.spacing(1)}px 0`,
    textAlign: 'right'
  }
}))

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })
  const css = useStyles()

  function handleFormChange (event, prop) {
    setForm({ ...form, [prop]: event.target.value })
  }

  async function handleSubmit () {
    const { passwordConfirm, ...data } = form
    const result = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    console.log(result)
  }

  const disabled = form.password !== form.passwordConfirm ||
    Object.keys(form).some((key) => !form[key])

  return (
    <Layout>
      <Container maxWidth='sm' disableGutters>
        <Subheader>Signup</Subheader>
        <Paper>
          <form
            className={css.form}
            name='signup-form'
          >
            <TextField
              id='name'
              label='Name'
              fullWidth
              required
              onChange={(e) => handleFormChange(e, 'name')}
            />

            <TextField
              id='email'
              label='Email'
              type='email'
              fullWidth
              required
              onChange={(e) => handleFormChange(e, 'email')}
            />

            <TextField
              id='password'
              label='Password'
              type='password'
              fullWidth
              required
              onChange={(e) => handleFormChange(e, 'password')}
            />

            <TextField
              id='passwordConfirm'
              label='Confirm Password'
              type='password'
              fullWidth
              required
              onChange={(e) => handleFormChange(e, 'passwordConfirm')}
            />

            <div className={css.submit}>
              <Button
                color='primary'
                disabled={disabled}
                size='large'
                type='button'
                onClick={() => handleSubmit()}
              >
                Signup
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </Layout>
  )
}

export default Signup
