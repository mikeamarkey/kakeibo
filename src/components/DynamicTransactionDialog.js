import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core'
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons'
import moment from 'moment'
import produce from 'immer'

import { getAuthToken, getAuthId } from 'src/lib/auth'
import { CategorySelect, Loading } from 'src/components'
import { GET_TRANSACTIONS_BY_MONTH } from 'src/graphql/queries'

const useStyles = makeStyles((theme) => ({
  content: {
    position: 'relative'
  },
  row: {
    display: 'flex',
    '& > *': {
      flex: '1 1 auto'
    },
    '& > :first-child': {
      marginRight: theme.spacing(1)
    },
    '& > :last-child': {
      marginLeft: theme.spacing(1)
    }
  },
  transaction: {
    display: 'flex',
    alignItems: 'center',
    margin: `${theme.spacing(1)}px 0`,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.level2
  },
  create: {
    textAlign: 'center'
  }
}))

const DynamicTransactionDialog = ({ categories, month, dialogContent, setDialogContent }) => {
  const [form, setForm] = useState(dialogContent)
  const [loading, setLoading] = useState(false)
  const client = useApolloClient()
  const css = useStyles()

  function handleDateChange (date) {
    const month = moment(date).format('YYYYMM')
    setForm({ ...form, date, month })
  }

  async function handleCreate () {
    setLoading(true)
    const { transactions, total, ...shared } = form
    const data = transactions.map((transaction) => {
      return { ...transaction, ...shared, authId: getAuthId() }
    })

    const result = await fetch('/api/transaction/createMultiple', {
      method: 'POST',
      body: JSON.stringify({ token: getAuthToken(), items: data })
    })
    const created = await result.json()

    try {
      const variables = { month: form.month }
      const cache = client.readQuery({ query: GET_TRANSACTIONS_BY_MONTH, variables })
      const data = produce(cache, (draft) => {
        [...created].forEach((transaction) => {
          const category = categories.find((c) => c._id === transaction.category)
          draft.getTransactionsByMonth.data.push({
            __typename: 'Transaction',
            ...transaction,
            category: { ...category }
          })
        })
      })
      client.writeQuery({ query: GET_TRANSACTIONS_BY_MONTH, variables, data })
    } catch (e) {
      console.log('Skipping writing to nonexistent cache.')
    }
    handleClose()
  }

  function handleClose () {
    setDialogContent(null)
  }

  const remaining = form.transactions.reduce((acc, item) => {
    return acc - (item.price ? item.price : 0)
  }, form.total ? form.total : 0)

  const disabled = remaining !== 0 || !form.total || !form.date || form.transactions.some((item) => {
    return !item.category || !item.price
  })

  return (
    <Dialog
      open
      onClose={() => handleClose()}
      aria-labelledby='form-dialog-title'
      transitionDuration={100}
      maxWidth='xs'
    >
      <DialogTitle>Create Transactions</DialogTitle>
      <DialogContent className={css.content}>
        {loading && (
          <Loading dim />
        )}

        <div className={css.row}>
          <TextField
            autoFocus
            id='total'
            type='number'
            label='Total'
            margin='dense'
            required
            InputLabelProps={{
              shrink: true
            }}
            value={form.total}
            onChange={(e) => {
              let value = ''
              if (e.target.value.length) {
                value = parseInt(e.target.value, 10)
              }
              setForm({ ...form, total: value })
            }}
          />

          <TextField
            id='remaining'
            type='number'
            label='Remaining'
            margin='dense'
            error={remaining !== 0}
            required
            InputLabelProps={{
              shrink: true,
              readOnly: true
            }}
            value={remaining}
          />
        </div>

        <TextField
          id='date'
          type='date'
          label='Date'
          margin='dense'
          fullWidth
          required
          InputLabelProps={{
            shrink: true
          }}
          value={form.date}
          onChange={(e) => handleDateChange(e.target.value)}
        />

        {form.transactions.map((transaction, index) => (
          <div key={index} className={css.transaction}>
            <div>
              <Typography variant='subtitle2'>
              Transaction {index + 1}
              </Typography>

              <CategorySelect
                categories={categories}
                label='Category'
                size='small'
                emptyName='Select Category'
                formControlProps={{ required: true, fullWidth: true }}
                selectProps={{
                  id: 'category',
                  onChange: (e) => {
                    const newTransactions = form.transactions.map((item, itemIndex) => {
                      if (itemIndex === index) {
                        return { ...item, category: e.target.value }
                      } else {
                        return item
                      }
                    })
                    setForm({ ...form, transactions: newTransactions })
                  },
                  value: transaction.category
                }}
              />

              <TextField
                id='price'
                type='number'
                label='Price'
                placeholder='1000'
                margin='dense'
                fullWidth
                required
                InputProps={{
                  startAdornment: <InputAdornment position='start'>¥</InputAdornment>
                }}
                InputLabelProps={{
                  shrink: true
                }}
                value={transaction.price}
                onChange={(e) => {
                  let value = ''
                  if (e.target.value.length) {
                    value = parseInt(e.target.value, 10)
                  }
                  const newTransactions = form.transactions.map((item, itemIndex) => {
                    if (itemIndex === index) {
                      return { ...item, price: value }
                    } else {
                      return item
                    }
                  })
                  setForm({ ...form, transactions: newTransactions })
                }}
              />

              <TextField
                id='note'
                type='text'
                label='Note'
                margin='dense'
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                value={transaction.note}
                onChange={(e) => {
                  const newTransactions = form.transactions.map((item, itemIndex) => {
                    if (itemIndex === index) {
                      return { ...item, note: e.target.value }
                    } else {
                      return item
                    }
                  })
                  setForm({ ...form, transactions: newTransactions })
                }}
              />
            </div>

            {index !== 0 && (
              <IconButton
                color='inherit'
                onClick={() => {
                  setForm({
                    ...form,
                    transactions: form.transactions.filter((_, idx) => idx !== index)
                  })
                }}
              >
                <RemoveCircleOutline />
              </IconButton>
            )}
          </div>
        ))}

        <div className={css.create}>
          <IconButton
            color='inherit'
            onClick={() => {
              setForm({
                ...form,
                transactions: [
                  ...form.transactions, { category: '', note: '', price: '' }
                ]
              })
            }}
          >
            <AddCircleOutline />
          </IconButton>
        </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button
          color='primary'
          disabled={disabled}
          onClick={() => handleCreate()}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DynamicTransactionDialog
