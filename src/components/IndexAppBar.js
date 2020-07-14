import { Button, IconButton } from '@material-ui/core'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import moment from 'moment'

import { setRoute } from 'src/lib/routes'
import { FlexSpacer } from 'src/components'

const IndexAppBar = ({ month, setMonth, transactions }) => {
  const currentMonth = moment().format('YYYYMM')
  const previousMonth = moment(month).subtract(1, 'M').format('YYYYMM')
  const nextMonth = moment(month).add(1, 'M').format('YYYYMM')

  function onMonthChange (newMonth) {
    setMonth(newMonth)
    const query = { month: moment().format('YYYYMM') === newMonth ? null : newMonth }
    setRoute('index', query)
  }

  return (
    <>
      <FlexSpacer />

      <IconButton
        edge='start'
        color='inherit'
        aria-label='previous month'
        onClick={() => onMonthChange(previousMonth)}
      >
        <ArrowBack />
      </IconButton>

      <Button
        color='inherit'
        onClick={() => onMonthChange(currentMonth)}
        disabled={currentMonth === month}
      >
        Today
      </Button>

      <IconButton
        edge='end'
        color='inherit'
        aria-label='next month'
        onClick={() => onMonthChange(nextMonth)}
      >
        <ArrowForward />
      </IconButton>
    </>
  )
}

export default IndexAppBar
