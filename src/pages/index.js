import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import moment from 'moment'

import {
  IndexAppBar,
  Layout,
  Loading,
  Transactions
} from 'src/components'
import { GET_CATEGORIES, GET_TRANSACTIONS_BY_MONTH } from 'src/graphql/queries'
import { getRouteState, setRoute } from 'src/lib/routes'

const Index = () => {
  const initialState = getRouteState()
  const [filter, setFilter] = useState({ category: [] })
  const [month, setMonth] = useState(initialState.month)
  const [tab, setTab] = useState(initialState.tab)

  useEffect(() => {
    const query = { month: moment().format('YYYYMM') === month ? null : month }
    setRoute('index', query)
  }, [month])

  useEffect(() => {
    const query = { tab: tab === 1 ? 'monthly' : null }
    setRoute('index', query)
  }, [tab])

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
    <Layout
      title={moment(month).format('YYYY/MM')}
      headerElements={<IndexAppBar month={month} setMonth={setMonth} />}
    >
      {loadingT ? (
        <Loading />
      ) : (
        <Transactions
          categories={categories}
          filter={filter}
          month={month}
          tab={tab}
          setFilter={setFilter}
          setTab={setTab}
          transactions={transactions}
        />
      )}
    </Layout>
  )
}

export default Index
