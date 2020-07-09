import Router from 'next/router'
import { useState } from 'react'
import { Button, Paper, TextField, Typography, makeStyles } from '@material-ui/core'
import { Subheader } from 'src/components'
import { setAuthData } from 'src/lib/auth'

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(1),
    '& > .MuiTextField-root': {
      margin: `${theme.spacing(1)}px 0`
    }
  },
  submit: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing(1)}px 0`,
    textAlign: 'right'
  }
}))

const LoginForm = ({ setLoading }) => {
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const css = useStyles()

  function handleFormChange (event, prop) {
    setError('')
    setForm({ ...form, [prop]: event.target.value })
  }

  async function handleSubmit () {
    setLoading(true)
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(form)
    })
    if (response.status < 300) {
      const authData = await response.json()
      setAuthData(authData)
      Router.reload()
    } else {
      setLoading(false)
      if (response.status === 401) {
        setError('Check your email and password.')
      } else {
        setError('An unexpected error occurred.')
      }
    }
  }

  const disabled = error.length > 0 || Object.keys(form).some((key) => !form[key])

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
            <Typography color='error' variant='subtitle2'>
              {error}
            </Typography>

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
