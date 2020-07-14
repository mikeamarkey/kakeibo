import { useState, useMemo } from 'react'
import {
  Button,
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
import { setRoute } from 'src/lib/routes'
import {
  CategorySelect,
  CopyMonthlyTransactionsDialog,
  DailyTransactions,
  FlexSpacer,
  MonthlyTransactions,
  Price,
  TransactionDialog
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

const Transactions = ({ categories, filter, month, tab, setTab, setFilter, transactions }) => {
  const [dialogContent, setDialogContent] = useState(null)
  const [openCopyDialog, setOpenCopyDialog] = useState(false)
  const css = useStyles()

  const daily = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'DAILY') {
      if (!filter.category.length || filter.category.includes(transaction.category._id)) {
        const date = acc.days[transaction.date]
          ? acc.days[transaction.date]
          : { total: 0, transactions: [] }

        date.total += transaction.price
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
          total: 0,
          count: 0,
          label: transaction.category.name,
          color: transaction.category.color,
          order: transaction.category.order
        }

      category.total += transaction.price
      category.count++
      acc.categories.ids[categoryId] = category
      acc.categories.total += transaction.price
      acc.categories.count++
    }

    acc.total += transaction.type === 'INCOME' ? transaction.price : -(transaction.price)
    return acc
  }, {
    total: 0,
    categories: { total: 0, count: 0, ids: {} },
    income: { total: 0, transactions: [] },
    expense: { total: 0, transactions: [] }
  }), [transactions])

  const canCopy = !monthly.income.total && !monthly.expense.total

  function getTotal () {
    if (tab === 0) {
      return daily.total
    } else {
      return monthly.total
    }
  }

  function handleTabChange (newTab) {
    setTab(newTab)
    const query = { tab: newTab === 1 ? 'monthly' : null }
    setRoute('index', query)
  }

  return (
    <>
      <Tabs
        value={tab}
        onChange={(e, newTab) => handleTabChange(newTab)}
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

        {tab === 1 && canCopy && (
          <Button onClick={() => setOpenCopyDialog(true)}>
            Copy Monthly
          </Button>
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

      {dialogContent && (
        <TransactionDialog
          categories={categories}
          dialogContent={dialogContent}
          setDialogContent={setDialogContent}
          month={month}
        />
      )}

      {tab === 1 && openCopyDialog && (
        <CopyMonthlyTransactionsDialog
          categories={categories}
          month={month}
          setOpen={setOpenCopyDialog}
        />
      )}
    </>
  )
}

export default Transactions
