import { Paper, Typography, makeStyles } from '@material-ui/core'
import moment from 'moment'
import { Price } from 'src/components'

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start'
  },
  left: {
    textAlign: 'left'
  },
  right: {
    textAlign: 'right'
  },
  small: {
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
          <div className={css.content}>
            <div>
              {transaction.category && (
                <Typography>{transaction.category.name}</Typography>
              )}
              {transaction.note.length > 0 && (
                <Typography className={css.small} variant='caption'>{transaction.note}</Typography>
              )}
            </div>

            <div className={css.right}>
              <Typography>
                <Price price={transaction.price}></Price>
              </Typography>
              <Typography className={css.small}>{moment(transaction.date).format('M/D')}</Typography>
            </div>
          </div>
        </Paper>
      ))}
    </div>
  )
}

export default TransactionsList
