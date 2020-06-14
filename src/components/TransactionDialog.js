import { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField
} from '@material-ui/core'
import produce from 'immer'

import { CategorySelect, FlexSpacer } from 'src/components'
import { GET_TRANSACTIONS_BY_MONTH, CREATE_TRANSACTION, UPDATE_TRANSACTION, DELETE_TRANSACTION } from 'src/graphql/queries'

const TransactionDialog = ({ categories, month, dialogContent, setDialogContent }) => {
  const [form, setForm] = useState(dialogContent)
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION)
  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    update (store, { data: { createTransaction } }) {
      const variables = { month }
      const cache = store.readQuery({ query: GET_TRANSACTIONS_BY_MONTH, variables })
      const data = produce(cache, (draft) => {
        draft.getTransactionsByMonth.data.push(createTransaction)
      })
      store.writeQuery({ query: GET_TRANSACTIONS_BY_MONTH, variables, data })
    }
  })
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    update (store, { data: { deleteTransaction } }) {
      const variables = { month }
      const cache = store.readQuery({ query: GET_TRANSACTIONS_BY_MONTH, variables })
      const data = produce(cache, (draft) => {
        draft.getTransactionsByMonth.data = draft.getTransactionsByMonth.data.filter((item) => {
          return item._id !== deleteTransaction._id
        })
      })
      store.writeQuery({ query: GET_TRANSACTIONS_BY_MONTH, variables, data })
    }
  })
  const disabled = form.type === 'DAILY'
    ? !form.category || !Number.isInteger(form.price) || !form.date.length
    : !form.name || !Number.isInteger(form.price)
  const dialogTitle = ((type) => {
    switch (type) {
      case 'DAILY':
        return 'Daily Transaction'
      case 'INCOME':
        return 'Income'
      case 'EXPENSE':
        return 'Expense'
    }
  })(form.type)

  function handleCreate () {
    const variables = form.type === 'DAILY'
      ? { data: { ...form, category: { connect: form.category } } }
      : { data: { ...form } }
    createTransaction({ variables })
    handleClose()
  }

  function handleUpdate () {
    const { date, name, price, note, category } = form
    const data = form.type === 'DAILY'
      ? { date, price, note, category: { connect: category } }
      : { name, price, note }
    updateTransaction({ variables: { id: form._id, data } })
    handleClose()
  }

  function handleDelete () {
    deleteTransaction({ variables: { id: form._id } })
    handleClose()
  }

  function handleClose () {
    setDialogContent(null)
  }

  return (
    <Dialog
      open
      onClose={() => handleClose()}
      aria-labelledby='form-dialog-title'
      transitionDuration={100}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        {form.type === 'DAILY' ? (
          <>
            <CategorySelect
              categories={categories}
              label='Category'
              formControlProps={{ required: true, fullWidth: true }}
              selectProps={{
                id: 'category',
                onChange: (e) => setForm({ ...form, category: e.target.value }),
                value: form.category
              }}
            />

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
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </>
        ) : (
          <TextField
            id='name'
            type='text'
            label='Name'
            margin='dense'
            fullWidth
            required
            InputLabelProps={{
              shrink: true
            }}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}

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
          value={form.price ? form.price : ''}
          onChange={(e) => {
            let value = ''
            if (e.target.value.length) {
              value = parseInt(e.target.value, 10)
            }
            setForm({ ...form, price: value })
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
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        {form._id && (
          <>
            <Button color='secondary' onClick={() => handleDelete()}>Delete</Button>
            <FlexSpacer />
          </>
        )}
        <Button onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button
          color='primary'
          disabled={disabled}
          onClick={form._id
            ? () => handleUpdate()
            : () => handleCreate()}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TransactionDialog
