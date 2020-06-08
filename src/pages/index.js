import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { CircularProgress } from '@material-ui/core'
import moment from 'moment'

import {
  ContentContainer,
  IndexAppBar,
  Footer,
  Layout,
  TransactionDialog,
  TransactionsList
} from 'src/components'
import { GET_CATEGORIES, GET_TRANSACTIONS_BY_MONTH } from 'src/graphql/queries'

const Index = () => {
  const [month, setMonth] = useState(moment().format('YYYYMM'))
  const [dialogContent, setDialogContent] = useState(null)
  const { data: dataT, loading: loadingT } = useQuery(GET_TRANSACTIONS_BY_MONTH, {
    variables: { month }
  })
  const { data: dataC, loading: loadingC } = useQuery(GET_CATEGORIES)
  const transactions = dataT ? dataT.getTransactionsByMonth.data : []

  return (
    <Layout headerElements={<IndexAppBar month={month} setMonth={setMonth} transactions={transactions} />}>
      <ContentContainer>
        {loadingT ? (
          <CircularProgress />
        ) : (
          <TransactionsList
            month={month}
            transactions={transactions}
            setDialogContent={setDialogContent}
          />
        )}
      </ContentContainer>

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
          setDialogContent={setDialogContent}
          month={month}
        />
      )}
    </Layout>
  )
}

export default Index
