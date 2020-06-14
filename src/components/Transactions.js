import { useState } from 'react'
import {
  Container,
  IconButton,
  Paper,
  Typography,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons'
import moment from 'moment'
import {
  CategorySelect,
  DailyTransactions,
  FlexSpacer,
  MonthlyTransactions,
  Price
} from 'src/components'

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: theme.spacing(8),
    padding: theme.spacing(0.5),
    '& > *': {
      margin: theme.spacing(0.5)
    }
  },
  total: {
    flexShrink: 0
  }
}))

const Transactions = ({ categories, month, transactions, setDialogContent }) => {
  const [tab, setTab] = useState(0)
  const [filter, setFilter] = useState({ category: [] })
  const css = useStyles()

  const daily = transactions.reduce((acc, transaction) => {
    if (transaction.type !== 'DAILY') {
      return acc
    }

    if (filter.category.length && !filter.category.includes(transaction.category._id)) {
      return acc
    }

    if (!acc.days[transaction.date]) {
      acc.days[transaction.date] = {
        total: transaction.price,
        transactions: [transaction]
      }
    } else {
      acc.days[transaction.date].total += transaction.price
      acc.days[transaction.date].transactions.push(transaction)
    }
    acc.total += transaction.price
    return acc
  }, { total: 0, days: {} })

  const income = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'INCOME') {
      acc.total += transaction.price
      acc.transactions.push(transaction)
    }
    return acc
  }, { total: 0, transactions: [] })

  const expense = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'EXPENSE') {
      acc.total += transaction.price
      acc.transactions.push(transaction)
    }
    return acc
  }, { total: 0, transactions: [] })

  const categoryGroups = transactions.reduce((acc, transaction) => {
    if (transaction.type !== 'DAILY') {
      return acc
    }

    if (!acc.categories[transaction.category._id]) {
      acc.categories[transaction.category._id] = {
        type: 'DAILY',
        price: transaction.price,
        category: {
          name: transaction.category.name,
          color: transaction.category.color
        }
      }
    } else {
      acc.categories[transaction.category._id].price += transaction.price
    }
    acc.total += transaction.price
    return acc
  }, { total: 0, categories: {} })

  const getTotal = () => {
    if (tab === 0) {
      if (!filter.category.length) {
        return categoryGroups.total
      } else {
        return Object.keys(categoryGroups.categories).reduce((acc, categoryId) => {
          if (filter.category.includes(categoryId)) {
            acc += categoryGroups.categories[categoryId].price
          }
          return acc
        }, 0)
      }
    } else {
      return income.total - (categoryGroups.total + expense.total)
    }
  }

  return (
    <>
      <Tabs
        value={tab}
        onChange={(e, newTab) => setTab(newTab)}
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'
      >
        <Tab label='Daily' />
        <Tab label='Monthly' />
      </Tabs>

      <Paper className={css.header}>
        {tab === 0 && (
          <>
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
          </>
        )}

        <FlexSpacer />

        <Typography className={css.total} variant='h6'>
          {moment(month).format('YYYY/MM')} (<Price price={getTotal()} withColor={tab === 1} />)
        </Typography>
      </Paper>

      <Container maxWidth='sm' disableGutters>
        <div hidden={tab !== 0}>
          <DailyTransactions
            categories={categories}
            month={month}
            daily={daily}
            setDialogContent={setDialogContent}
            filter={filter}
          />
        </div>

        <div hidden={tab !== 1}>
          <MonthlyTransactions
            month={month}
            income={income}
            expense={expense}
            categoryGroups={categoryGroups}
            setDialogContent={setDialogContent}
            setTab={setTab}
            setFilter={setFilter}
          />
        </div>
      </Container>
    </>
  )
}

export default Transactions
