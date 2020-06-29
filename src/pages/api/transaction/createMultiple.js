import { createMultiple } from 'src/graphql/faunadb'

const CreateMultiple = async (req, res) => {
  if (!req.method === 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method not allowed')
  }

  const data = await JSON.parse(req.body)
  const result = await createMultiple(data)
  const formatted = result.map((item) => {
    return {
      _id: item.ref.id,
      _ts: item.ts,
      name: null,
      order: null,
      ...item.data,
      category: item.data.category ? item.data.category.id : null,
      date: item.data.date ? item.data.date.toJSON()['@date'] : null
    }
  })
  res.json(formatted)
}

export default CreateMultiple
