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

const SignupForm = () => {
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
    const body = await result.json()
    setToken(body.secret)
    Router.reload()
  }

  const disabled = form.password !== form.passwordConfirm ||
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
