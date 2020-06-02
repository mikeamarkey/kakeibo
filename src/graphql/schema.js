const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
require('dotenv').config()

const updateSchema = async () => {
  const url = 'https://graphql.fauna.com/import'
  const options = {
    method: 'POST',
    body: fs.createReadStream(path.join(__dirname, './schema.gql')),
    headers: {
      Authorization: `Bearer ${process.env.FAUNADB_SECRET}`
    }
  }

  const res = await fetch(url, options)
  if (res.status === 200) {
    console.log(await res.text())
    console.log('Updated successfully!')
  } else {
    console.log(await res.text())
  }
}

updateSchema()
