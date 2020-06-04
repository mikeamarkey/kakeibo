import { useState } from 'react'
import { withRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core'
import moment from 'moment'

import { Footer, Header, TransactionsList } from 'src/components'
import { GET_TRANSACTIONS_BY_MONTH } from 'src/graphql/queries'

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
  const { loading, error, data, refetch } = useQuery(GET_TRANSACTIONS_BY_MONTH, {
    variables: { month }
  })
  const css = useStyles()

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div className={css.root}>
      <Header month={month} setMonth={setMonth} refetchTransactions={refetch} />
      {loading ? (
        <div>loading...</div>
      ) : (
        <TransactionsList className={css.list} transactions={data.getTransactionsByMonth.data} />
      )}
      <Footer month={month} refetchTransactions={refetch} />
    </div>
  )
}

export default withRouter(Index)
