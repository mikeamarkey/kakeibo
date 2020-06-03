import { Paper, Typography, makeStyles } from '@material-ui/core'
import moment from 'moment'
import { Price } from 'src/components'

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  note: {
    color: theme.palette.text.secondary
  }
}))

const sortTransactions = (a, b) => {
  if (moment(a.date).isBefore(moment(b.date))) {
    return -1
  } else {
    return 1
  }
}

const TransactionsList = ({ transactions }) => {
  const css = useStyles()

  return (
    <div>
      {transactions.slice().sort(sortTransactions).map((transaction) => (
        <Paper key={transaction.id} variant='outlined' className={css.card}>
          <div className={css.top}>
            <Typography>{moment(transaction.date).format('M/D')}</Typography>
            <Typography>
              <Price price={transaction.price} />
            </Typography>
          </div>
          {transaction.note.length > 0 && (
            <Typography className={css.note} variant='caption'>{transaction.note}</Typography>
          )}
        </Paper>
      ))}
    </div>
  )
}

export default TransactionsList
