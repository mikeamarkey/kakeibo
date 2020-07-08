import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles
} from '@material-ui/core'
import moment from 'moment'

import { getAuthToken } from 'src/lib/auth'
import { Loading } from 'src/components'

const useStyles = makeStyles((theme) => ({
  content: {
    position: 'relative'
  }
}))

const InitializeDialog = ({ categories, month, refetch, setOpen }) => {
  const [form, setForm] = useState({ yearMonth: moment(month).subtract(1, 'month').format('YYYYMM') })
  const [loading, setLoading] = useState(false)
  const css = useStyles()

  async function handleCreate () {
    setLoading(true)
    await fetch('/api/transaction/initialize', {
      method: 'POST',
      body: JSON.stringify({
        token: getAuthToken(),
        from: form.yearMonth,
        to: month,
        createdAt: moment().unix()
      })
    })
    refetch()
    handleClose()
  }

  function handleClose () {
    setOpen(false)
  }

  const start = moment(month).subtract(1, 'year')
  const options = []
  for (let i = 0; i < 24; i++) {
    options.push(start.format('YYYYMM'))
    start.add(1, 'month')
  }

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

        <FormControl fullWidth>
          <InputLabel id='date'>Copy Values From</InputLabel>
          <Select
            labelId='date'
            value={form.yearMonth}
            onChange={(e) => setForm({ ...form, yearMonth: e.target.value })}
          >
            {options.map((value) => (
              <MenuItem key={value} value={value}>{moment(value).format('YYYY/MM')}</MenuItem>
            ))}
          </Select>
        </FormControl>

      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button
          color='primary'
          disabled={!form.yearMonth}
          onClick={() => handleCreate()}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InitializeDialog
