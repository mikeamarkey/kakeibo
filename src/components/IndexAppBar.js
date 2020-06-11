import { IconButton, Typography } from '@material-ui/core'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import moment from 'moment'

import { FlexSpacer, Price } from 'src/components'

const IndexAppBar = ({ month, setMonth, transactions }) => {
  const previousMonth = moment(month).subtract(1, 'M').format('YYYYMM')
  const nextMonth = moment(month).add(1, 'M').format('YYYYMM')
  const total = transactions.reduce((acc, item) => acc + item.price, 0)

  function onMonthChange (newMonth) {
    setMonth(newMonth)
  }

  return (
    <>
      <FlexSpacer />

      <Typography variant='h6'>
        {moment(month).format('YYYY/MM')} (<Price price={total} />)
      </Typography>

      <FlexSpacer />

      <IconButton
        edge='start'
        color='inherit'
        aria-label='previous month'
        onClick={() => onMonthChange(previousMonth)}
      >
        <ArrowBack />
      </IconButton>

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
