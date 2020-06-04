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

import { CREATE_TRANSACTION } from 'src/graphql/queries'

const useStyles = makeStyles((theme) => ({
  select: {
    width: '100%'
  }
}))

const TransactionDialog = ({
  categories,
  dialogContent,
  refetchTransactions,
  setDialogContent
}) => {
  const [form, setForm] = useState(dialogContent)
  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    onCompleted: () => refetchTransactions()
  })
  const css = useStyles()

  function handleClose (data) {
    if (data) {
      const { category, ...formData } = data
      createTransaction({
        variables: { data: { ...formData, category: { connect: category } } }
      })
    }
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
        <Button color='primary' onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button
          color='primary'
          disabled={!form.category || !Number.isInteger(form.price) || !form.date.length}
          onClick={() => handleClose(form)}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TransactionDialog
