import { Paper, Typography, makeStyles } from '@material-ui/core'
import moment from 'moment'
import { Price, Transaction } from 'src/components'

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'auto',
    paddingBottom: theme.spacing(10)
  },
  group: {
    margin: `${theme.spacing(2)}px auto`,
    maxWidth: theme.breakpoints.values.sm
  },
  subheader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(0.5),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  subheaderText: {
    fontWeight: theme.typography.fontWeightBold
  }
}))

const sortTransactions = (a, b) => b._ts - a._ts
const sortTransactionGroups = (a, b) => moment(b).diff(a)

const TransactionsList = ({ month, transactions, setDialogContent }) => {
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
        <div key={date} className={css.group}>
          <Paper className={css.subheader} square>
            <Typography className={css.subheaderText} variant='subtitle1'>
              {moment(date).format('M/D')}
            </Typography>

            <Typography className={css.subheaderText} variant='subtitle1'>
              <Price price={transactionGroups.groups[date].total} />
            </Typography>
          </Paper>

          {transactionGroups.groups[date].transactions.sort(sortTransactions).map((transaction) => (
            <Transaction
              key={transaction._id}
              transaction={transaction}
              onClick={() => {
                setDialogContent({ ...transaction, category: transaction.category._id })
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default TransactionsList
