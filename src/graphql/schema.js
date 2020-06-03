const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
require('dotenv').config()

const updateSchema = async () => {
  const [,,override] = process.argv
  const url = `https://graphql.fauna.com/import${override === 'override' ? '?mode=override' : ''}`
  const options = {
    method: 'POST',
    body: fs.createReadStream(path.join(__dirname, './schema.gql')),
    headers: {
      Authorization: `Bearer ${process.env.FAUNADB_SECRET}`
    }
  }

  const res = await fetch(url, options)
  if (override) {
    console.log('Using override mode')
  }
  console.log(`Starting update...`)
  if (res.status === 200) {
    console.log(await res.text())
    console.log('Updated successfully!')
  } else {
    console.log(await res.text())
  }
}

updateSchema()
