import { signup } from 'src/graphql/faunadb'

const SignUp = async (req, res) => {
  if (!req.method === 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method not allowed')
  }

  const input = await JSON.parse(req.body)
  const result = await signup(input)
  res.json(result)
}

export default SignUp
