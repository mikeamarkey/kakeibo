import { logout } from 'src/graphql/faunadb'

const Logout = async (req, res) => {
  if (!req.method === 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method not allowed')
  }

  const key = await JSON.parse(req.body)
  const result = await logout(key)
  res.json(result)
}

export default Logout
