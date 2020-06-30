import { initialize } from 'src/graphql/faunadb'

const Initialize = async (req, res) => {
  if (!req.method === 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method not allowed')
  }

  const data = await JSON.parse(req.body)
  const result = await initialize(data)
  res.json(result)
}

export default Initialize
