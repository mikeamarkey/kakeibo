import { useState } from 'react'
import { withRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client'
import { Container } from '@material-ui/core'
import moment from 'moment'

import { Fab, Header, TransactionsList } from 'src/components'
import { GET_TRANSACTIONS_BY_MONTH } from 'src/graphql/queries'

const Index = ({ router }) => {
  const [month, setMonth] = useState(moment().format('YYYYMM'))
  const { loading, error, data, refetch } = useQuery(GET_TRANSACTIONS_BY_MONTH, {
    variables: { month }
  })

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <Container disableGutters={true} maxWidth='sm'>
      <Header month={month} setMonth={setMonth} refetchTransactions={refetch} />

      {!loading && (
        <TransactionsList transactions={data.getTransactionsByMonth.data} />
      )}

      <Fab month={month} refetchTransactions={refetch} />
    </Container>
  )
}

export default withRouter(Index)
