import { useState } from 'react'
import { useQuery } from '@apollo/client'
import moment from 'moment'

import {
  IndexAppBar,
  Layout,
  Loading,
  Transactions
} from 'src/components'
import { GET_CATEGORIES, GET_TRANSACTIONS_BY_MONTH } from 'src/graphql/queries'

const Index = () => {
  const [month, setMonth] = useState(moment().format('YYYYMM'))
  const { data: dataT, loading: loadingT } = useQuery(GET_TRANSACTIONS_BY_MONTH, {
    variables: { month }
  })
  const { data: dataC } = useQuery(GET_CATEGORIES)

  const categories = dataC
    ? dataC.getCategories.data.slice().sort((a, b) => a.order - b.order)
    : []
  const transactions = dataT
    ? dataT.getTransactionsByMonth.data.slice().sort((a, b) => a.order - b.order)
    : []

  return (
    <Layout headerElements={<IndexAppBar month={month} setMonth={setMonth} />}>
      {loadingT ? (
        <Loading />
      ) : (
        <Transactions
          categories={categories}
          month={month}
          transactions={transactions}
        />
      )}
    </Layout>
  )
}

export default Index
