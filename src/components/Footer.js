import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
  Button,
  Chip,
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
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { GET_CATEGORIES, CREATE_TRANSACTION } from 'src/graphql/queries'

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    padding: theme.spacing(1),
    background: theme.palette.primary.main,
    overflowX: 'auto'
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  select: {
    width: '100%'
  }
}))

const Footer = ({ month, refetchTransactions }) => {
  const [form, setForm] = useState(defaultForm())
  const [open, setOpen] = useState(false)
  const { data } = useQuery(GET_CATEGORIES)
  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    onCompleted: () => refetchTransactions()
  })
  const css = useStyles()

  function defaultForm () {
    return {
      date: moment().isSame(moment(month), 'month') ? moment().format('YYYY-MM-DD') : moment(month).format('YYYY-MM-DD'),
      id: uuidv4(),
      month: month,
      note: '',
      price: '',
      category: ''
    }
  }

  function handleClose (data) {
    if (data) {
      const { category, ...formData } = data
      createTransaction({
        variables: { data: { ...formData, category: { connect: category } } }
      })
    }
    setOpen(false)
    setForm(defaultForm())
  }

  if (!data) {
    return null
  }
  const categories = data.getCategories.data

  return (
    <>
      <div className={css.footer}>
        {categories.map((category) => (
          <Chip
            key={category._id}
            label={category.name}
            className={css.chip}
            onClick={() => {
              const form = defaultForm()
              setForm({ ...form, category: category._id })
              setOpen(true)
            }}
          />
        ))}
      </div>

      <Dialog
        open={open}
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
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
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
    </>
  )
}

export default Footer
