import faunadb, { Client } from 'faunadb'
const q = faunadb.query

function logout (key) {
  const client = new Client({
    secret: key
  })

  return client.query(
    q.Logout(false)
  )
}

async function signup (input) {
  const { email, name, password } = input
  if (!email || !name || !password) {
    return Promise.reject(new Error('Please provide a name, email and password'))
  }

  const client = new Client({
    secret: process.env.FAUNADB_SECRET
  })

  const result = await client.query(
    q.Create(q.Collection('User'), {
      credentials: { password: input.password },
      data: {
        name: input.name,
        email: input.email
      }
    })
  )
  return result
}

async function login (input) {
  const { email, password } = input
  if (!email || !password) {
    return Promise.reject(new Error('Please provide an email and a password'))
  }

  const client = new Client({
    secret: process.env.FAUNADB_SECRET
  })

  const result = await client.query(
    q.Login(
      q.Match(q.Index('getUserByEmail'), email),
      { password }
    )
  )
  return result
}

export { login, logout, signup }
