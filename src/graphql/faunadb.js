import faunadb from 'faunadb'
const q = faunadb.query

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

function sort (data, collection) {
  if (!Array.isArray(data) || data.length <= 0 || data.some((set) => {
    return !Array.isArray(set) ||
      set.length !== 2 ||
      !set[0].match(/^\d+$/) ||
      !Number.isInteger(set[1])
  })) {
    return Promise.reject(new Error('Sort data should be an array of arrays of Ref ids and order ints'))
  }

  return client.query(
    q.Map(
      data,
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
  const transactions = data.map((t) => {
    return {
      ...t,
      date: q.ToDate(t.date),
      category: q.Ref(q.Collection('Category'), t.category)
    }
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

export { sort, createMultiple }
