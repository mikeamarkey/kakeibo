import { sort } from 'src/graphql/faunadb'

const Sort = async (req, res) => {
  if (!req.method === 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method not allowed')
  }

  const data = await JSON.parse(req.body)
  const result = await sort(data, 'Transaction')
  res.json(result)
}

export default Sort
