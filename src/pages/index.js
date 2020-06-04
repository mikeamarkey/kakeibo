import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core'
import moment from 'moment'

import { Footer, Header, TransactionDialog, TransactionsList } from 'src/components'
import { GET_CATEGORIES, GET_TRANSACTIONS_BY_MONTH } from 'src/graphql/queries'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr auto',
    height: '100%'
  },
  list: {
    overflowY: 'scroll'
  }
}))

const Index = ({ router }) => {
  const [month, setMonth] = useState(moment().format('YYYYMM'))
  const [dialogContent, setDialogContent] = useState(null)
  const { data: dataT, loading: loadingT, refetch: refetchT } = useQuery(GET_TRANSACTIONS_BY_MONTH, {
    variables: { month }
  })
  const { data: dataC, loading: loadingC } = useQuery(GET_CATEGORIES)
  const css = useStyles()

  return (
    <div className={css.root}>
      <Header
        month={month}
        setMonth={setMonth}
        refetchTransactions={refetchT}
      />

      {loadingT ? (
        <div>loading...</div>
      ) : (
        <TransactionsList
          className={css.list}
          transactions={dataT.getTransactionsByMonth.data}
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
          refetchTransactions={refetchT}
          setDialogContent={setDialogContent}
        />
      )}
    </div>
  )
}

export default Index
