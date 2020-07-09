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

const SignupForm = ({ setLoading }) => {
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })
  const css = useStyles()

  function handleFormChange (event, prop) {
    if (error.length > 0) {
      setError('')
    }
    setForm({ ...form, [prop]: event.target.value })
  }

  async function handleSubmit () {
    setLoading(true)
    const { passwordConfirm, ...data } = form
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    if (response.status < 300) {
      const authData = await response.json()
      setAuthData(authData)
      Router.reload()
    } else {
      setLoading(false)
      if (response.status === 409) {
        setError('This email is already in use.')
      } else {
        setError('An unexpected error occurred.')
      }
    }
  }

  const disabled = error.length > 0 ||
    form.password !== form.passwordConfirm ||
    Object.keys(form).some((key) => !form[key])

  return (
    <>
      <Subheader>Signup</Subheader>
      <Paper>
        <form
          className={css.form}
          name='signup-form'
        >
          <TextField
            label='Name'
            fullWidth
            required
            onChange={(e) => handleFormChange(e, 'name')}
          />

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

          <TextField
            label='Confirm Password'
            type='password'
            fullWidth
            required
            onChange={(e) => handleFormChange(e, 'passwordConfirm')}
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
              Signup
            </Button>
          </div>
        </form>
      </Paper>
    </>
  )
}

export default SignupForm
