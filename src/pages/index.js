import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import moment from 'moment'

import { IndexAppBar, Footer, Layout, TransactionDialog, TransactionsList } from 'src/components'
import { GET_CATEGORIES, GET_TRANSACTIONS_BY_MONTH } from 'src/graphql/queries'

const Index = () => {
  const [month, setMonth] = useState(moment().format('YYYYMM'))
  const [dialogContent, setDialogContent] = useState(null)
  const [transactions, setTransactions] = useState([])
  const { data: dataT, loading: loadingT, refetch: refetchT } = useQuery(GET_TRANSACTIONS_BY_MONTH, {
    variables: { month }
  })
  const { data: dataC, loading: loadingC } = useQuery(GET_CATEGORIES)
  useEffect(() => {
    refetchT()
  }, [month])

  useEffect(() => {
    if (dataT && dataT.getTransactionsByMonth) {
      setTransactions(dataT.getTransactionsByMonth.data)
    }
  }, [dataT])

  return (
    <Layout headerElements={<IndexAppBar month={month} setMonth={setMonth} transactions={transactions} />}>
      {loadingT ? (
        <div>Loading...</div>
      ) : (
        <TransactionsList
          month={month}
          transactions={transactions}
          setDialogContent={setDialogContent}
        />
      )}

      {!loadingC && (
        <Footer
          month={month}
          categories={dataC.getCategories.data}
          setDialogContent={setDialogContent}
        />
      )}

      {dialogContent && (
        <TransactionDialog
          categories={dataC.getCategories.data}
          dialogContent={dialogContent}
          transactions={transactions}
          setTransactions={setTransactions}
          setDialogContent={setDialogContent}
        />
      )}
    </Layout>
  )
}

export default Index
