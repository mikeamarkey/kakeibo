import { signup, login } from 'src/graphql/faunadb'

const SignUp = async (req, res) => {
  if (!req.method === 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method not allowed')
  }

  const input = await JSON.parse(req.body)
  try {
    await signup(input)
    const loginResult = await login(input)
    const authData = { token: loginResult.secret, id: loginResult.instance.id }
    res.json(authData)
  } catch (e) {
    if (e.message === 'instance not unique') {
      res.status(409).end()
    } else {
      res.status(400).end()
    }
  }
}

export default SignUp
