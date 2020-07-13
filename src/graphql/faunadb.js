import faunadb, { Client } from 'faunadb'
const q = faunadb.query

const client = new Client({
  secret: process.env.FAUNADB_SECRET
})

async function signup (input) {
  const { email, name, password } = input
  if (!email || !name || !password) {
    return Promise.reject(new Error('Please provide a name, email and password'))
  }

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

  const result = await client.query(
    q.Login(
      q.Match(q.Index('getUserByEmail'), email),
      { password }
    )
  )
  return result
}

export { login, signup }
