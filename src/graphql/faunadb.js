import faunadb, { Client } from 'faunadb'
const q = faunadb.query

function sort (data, collection) {
  const { token, items } = data
  if (!Array.isArray(items) || items.length <= 0 || items.some((set) => {
    return !Array.isArray(set) ||
      set.length !== 2 ||
      !set[0].match(/^\d+$/) ||
      !Number.isInteger(set[1])
  })) {
    return Promise.reject(new Error('Sort data should be an array of arrays of Ref ids and order ints'))
  }

  const client = new Client({
    secret: token
  })

  return client.query(
    q.Map(
      items,
      q.Lambda(
        ['id', 'order'],
        q.Update(
          q.Ref(q.Collection(collection), q.Var('id')), {
            data: {
              order: q.Var('order')
            }
          }
        )
      )
    )
  )
}

function createMultiple (data) {
  const { token, items } = data
  const transactions = items.map((t) => {
    return {
      ...t,
      date: q.ToDate(t.date),
      category: q.Ref(q.Collection('Category'), t.category),
      user: q.Ref(q.Collection('User'), t.authId)
    }
  })

  const client = new Client({
    secret: token
  })

  return client.query(
    q.Map(
      transactions,
      q.Lambda(
        'data',
        q.Create(
          q.Collection('Transaction'), {
            data: q.Var('data')
          }
        )
      )
    )
  )
}

async function initialize (data) {
  const { token, from, to, createdAt } = data

  const client = new Client({
    secret: token
  })

  const result = await client.query(
    q.Map(
      q.Paginate(
        q.Intersection(
          q.Match(q.Index('getTransactionsByMonth'), from),
          q.Union(
            q.Match(q.Index('getTransactionsByType'), 'EXPENSE'),
            q.Match(q.Index('getTransactionsByType'), 'INCOME')
          )
        )
      ),
      q.Lambda('x', q.Get(q.Var('x')))
    )
  )

  let timestamp = createdAt
  const createItems = result.data.map((item) => {
    return { ...item.data, month: to, createdAt: timestamp++ }
  })

  return client.query(
    q.Map(
      createItems,
      q.Lambda(
        'data',
        q.Create(
          q.Collection('Transaction'), {
            data: q.Var('data')
          }
        )
      )
    )
  )
}

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

export { createMultiple, initialize, login, logout, sort, signup }
