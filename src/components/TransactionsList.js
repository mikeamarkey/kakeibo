import { useState } from 'react'
import { IconButton, Paper, Typography, makeStyles } from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons'
import moment from 'moment'
import { CategorySelect, FlexSpacer, Price, Subheader, Transaction } from 'src/components'

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0.5),
    '& > *': {
      margin: theme.spacing(0.5)
    }
  },
  total: {
    flexShrink: 0
  }
}))

const sortTransactions = (a, b) => b._ts - a._ts
const sortTransactionGroups = (a, b) => moment(b).diff(a)

const TransactionsList = ({ categories, month, transactions, setDialogContent }) => {
  const css = useStyles()
  const [filter, setFilter] = useState({ category: [] })
  const transactionGroups = transactions.reduce((acc, item) => {
    if (filter.category.length && !filter.category.includes(item.category._id)) {
      return acc
    }

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
    <>
      <Paper className={css.header}>
        <CategorySelect
          categories={categories}
          emptyName='All'
          label='Category Filter'
          size='small'
          selectProps={{
            displayEmpty: true,
            id: 'categoryFilter',
            multiple: true,
            onChange: (e) => setFilter({ ...filter, category: e.target.value }),
            value: filter.category
          }}
        />

        {filter.category.length > 0 && (
          <IconButton
            edge='start'
            color='inherit'
            aria-label='clear filter'
            onClick={() => setFilter({ category: [] })}
          >
            <HighlightOff />
          </IconButton>
        )}

        <FlexSpacer />

        <Typography className={css.total} variant='h6'>
          {moment(month).format('YYYY/MM')} (<Price price={transactionGroups.total} />)
        </Typography>
      </Paper>
      {Object.keys(transactionGroups.groups).sort(sortTransactionGroups).map((date) => (
        <div key={date}>
          <Subheader>
            <span>{moment(date).format('M/D')}</span>
            <Price price={transactionGroups.groups[date].total} />
          </Subheader>

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
    </>
  )
}

export default TransactionsList
