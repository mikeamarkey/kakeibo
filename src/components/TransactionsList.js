import { Paper, Typography, makeStyles } from '@material-ui/core'
import moment from 'moment'
import { Price } from 'src/components'

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'auto'
  },
  subheader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
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

const sortTransactionGroups = (a, b) => {
  if (moment(a).isBefore(moment(b))) {
    return 1
  } else {
    return -1
  }
}

const sortTransactions = (a, b) => b._ts - a._ts

const TransactionsList = ({ transactions, setDialogContent }) => {
  const css = useStyles()
  const transactionGroups = transactions.reduce((acc, item) => {
    if (!acc.groups[item.date]) {
      acc.groups[item.date] = {
        total: item.price,
        transactions: [item]
      }
    } else {
      acc.groups[item.date].total += item.price
      acc.groups[item.date].transactions.push(item)
    }
    acc.total += item.price
    return acc
  }, { total: 0, groups: {} })

  return (
    <div className={css.root}>
      {Object.keys(transactionGroups.groups).sort(sortTransactionGroups).map((date) => (
        <div key={date}>
          <div className={css.subheader}>
            <Typography variant='subtitle1'>
              {moment(date).format('M/D')}
            </Typography>

            <Typography variant='subtitle1'>
              <Price price={transactionGroups.groups[date].total} />
            </Typography>
          </div>

          {transactionGroups.groups[date].transactions.sort(sortTransactions).map((transaction) => (
            <Paper
              key={transaction.id}
              variant='outlined'
              className={css.card}
              onClick={() => {
                setDialogContent({ ...transaction, category: transaction.category._id })
              }}
            >
              <div className={css.content}>
                <div>
                  <Typography variant='body2'>{transaction.category.name}</Typography>
                  {transaction.note.length > 0 && (
                    <Typography className={css.small} variant='caption'>{transaction.note}</Typography>
                  )}
                </div>

                <Typography variant='body2'>
                  <Price price={transaction.price} />
                </Typography>
              </div>
            </Paper>
          ))}
        </div>
      ))}
    </div>
  )
}

export default TransactionsList
