import { login } from 'src/graphql/faunadb'

const Login = async (req, res) => {
  if (!req.method === 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method not allowed')
  }

  const input = await JSON.parse(req.body)
  const result = await login(input)
  const authData = { token: result.secret, id: result.instance.id }
  res.json(authData)
}

export default Login
