import { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  makeStyles
} from '@material-ui/core'
import produce from 'immer'

import { FlexSpacer } from 'src/components'
import { GET_TRANSACTIONS_BY_MONTH, CREATE_TRANSACTION, UPDATE_TRANSACTION, DELETE_TRANSACTION } from 'src/graphql/queries'

const useStyles = makeStyles((theme) => ({
  select: {
    width: '100%'
  }
}))

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
  const css = useStyles()
  const disabled = !form.category || !Number.isInteger(form.price) || !form.date.length

  function handleCreate () {
    createTransaction({
      variables: {
        data: { ...form, category: { connect: form.category } }
      }
    })
    handleClose()
  }

  function handleUpdate () {
    const { date, price, note, category } = form
    updateTransaction({
      variables: {
        id: form._id,
        data: { date, price, note, category: { connect: category } }
      }
    })
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
      <DialogContent>
        <FormControl className={css.select} required>
          <InputLabel id='category-label'>Category</InputLabel>
          <Select
            labelId='category-label'
            id='category'
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {categories.map(({ _id, name }) => (
              <MenuItem key={_id} value={_id}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>

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
