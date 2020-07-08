import Router from 'next/router'
import { useState } from 'react'
import { Button, Paper, TextField, makeStyles } from '@material-ui/core'
import { Subheader } from 'src/components'
import { setToken } from 'src/lib/auth'

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

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const css = useStyles()

  function handleFormChange (event, prop) {
    setForm({ ...form, [prop]: event.target.value })
  }

  async function handleSubmit () {
    const result = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(form)
    })
    const body = await result.json()
    setToken(body.secret)
    Router.reload()
  }

  const disabled = Object.keys(form).some((key) => !form[key])

  return (
    <>
      <Subheader>Login</Subheader>
      <Paper>
        <form
          className={css.form}
          name='login-form'
        >
          <TextField
            label='Email'
            type='email'
            fullWidth
            required
            onChange={(e) => handleFormChange(e, 'email')}
          />

          <TextField
            label='Password'
            type='password'
            fullWidth
            required
            onChange={(e) => handleFormChange(e, 'password')}
          />

          <div className={css.submit}>
            <Button
              color='primary'
              disabled={disabled}
              size='large'
              type='button'
              onClick={() => handleSubmit()}
            >
              Login
            </Button>
          </div>
        </form>
      </Paper>
    </>
  )
}

export default LoginForm
