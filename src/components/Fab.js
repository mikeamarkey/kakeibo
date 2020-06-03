import { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab as MuiFab,
  InputAdornment,
  TextField,
  makeStyles
} from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { CREATE_TRANSACTION,  } from 'src/graphql/queries'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    margin: theme.spacing(2),
    right: process.env.NODE_ENV === 'development' ? theme.spacing(6) : 0,
    bottom: 0
  }
}))

const Fab = ({ month, refetchTransactions }) => {
  const [form, setForm] = useState(defaultForm())
  const [open, setOpen] = useState(false)
  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    onCompleted: () => refetchTransactions()
  })
  const css = useStyles()

  function defaultForm() {
    return {
      date: moment().isSame(moment(month), 'month') ? moment().format('YYYY-MM-DD') : moment(month).format('YYYY-MM-DD'),
      id: uuidv4(),
      month: month,
      note: '',
      price: ''
    }
  }

  function handleClose (data) {
    if (data) {
      createTransaction({
        variables: { data }
      })
    }
    setOpen(false)
    setForm(defaultForm())
  }

  return (
    <>
      <MuiFab
        className={css.fab}
        color='primary'
        aria-label='add'
        onClick={() => setOpen(true)}>
        <AddIcon />
      </MuiFab>

      <Dialog
        open={open}
        onClose={() => handleClose()}
        onEnter={() => setForm(defaultForm())}
        aria-labelledby="form-dialog-title"
        transitionDuration={100}
      >
        <DialogContent>
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
            onChange={(e) => setForm({...form, date: e.target.value})}
          />

          <TextField
            id="price"
            type="number"
            label="Price"
            placeholder='1000'
            margin='dense'
            autoFocus
            fullWidth
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">¥</InputAdornment>
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
              setForm({ ...form, price: value})
            }}
          />
          <TextField
            id="note"
            type="text"
            label="Note"
            margin="dense"
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
            disabled={!Number.isInteger(form.price) || !form.date.length}
            onClick={() => handleClose(form)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Fab
