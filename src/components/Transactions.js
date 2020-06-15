import { useState, useMemo } from 'react'
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
    if (transaction.type === 'DAILY') {
      if (!filter.category.length || filter.category.includes(transaction.category._id)) {
        const date = acc.days[transaction.date]
          ? acc.days[transaction.date]
          : { total: 0, transactions: [] }

        date.price += transaction.price
        date.transactions.push(transaction)
        acc.days[transaction.date] = date
        acc.total += transaction.price
      }
    }
    return acc
  }, { total: 0, days: {} })

  const monthly = useMemo(() => transactions.reduce((acc, transaction) => {
    if (transaction.type === 'EXPENSE') {
      acc.expense.total += transaction.price
      acc.expense.transactions.push(transaction)
    } else if (transaction.type === 'INCOME') {
      acc.income.total += transaction.price
      acc.income.transactions.push(transaction)
    } else if (transaction.type === 'DAILY') {
      const categoryId = transaction.category._id
      const category = acc.categories.ids[categoryId]
        ? acc.categories.ids[categoryId]
        : {
          type: 'DAILY',
          price: 0,
          category: {
            name: transaction.category.name,
            color: transaction.category.color
          }
        }

      category.price += transaction.price
      acc.categories.ids[categoryId] = category
      acc.categories.total += transaction.price
    }

    acc.total += transaction.type === 'INCOME' ? transaction.price : -(transaction.price)
    return acc
  }, {
    total: 0,
    categories: { total: 0, ids: {} },
    income: { total: 0, transactions: [] },
    expense: { total: 0, transactions: [] }
  }), [categories, month, transactions])

  const getTotal = () => {
    if (tab === 0) {
      return daily.total
    } else {
      return monthly.total
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
            monthly={monthly}
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
