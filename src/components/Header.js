import { AppBar, IconButton, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { ArrowBack, ArrowForward, Menu } from '@material-ui/icons'
import moment from 'moment'

import { Price } from 'src/components'

const useStyles = makeStyles((theme) => ({
  center: {
    flexGrow: 1,
    textAlign: 'center'
  },
  month: {
    fontWeight: theme.typography.fontWeightBold
  }
}))

const Header = ({ month, setMonth, transactions, refetchTransactions }) => {
  const css = useStyles()
  const previousMonth = moment(month).subtract(1, 'M').format('YYYYMM')
  const nextMonth = moment(month).add(1, 'M').format('YYYYMM')
  const total = transactions.reduce((acc, item) => acc + item.price, 0)

  function onMonthChange (newMonth) {
    setMonth(newMonth)
    refetchTransactions()
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open menu'
        >
          <Menu />
        </IconButton>

        <Typography variant='h6'>Kakeibo</Typography>

        <Typography variant='h6' className={css.center}>
          {moment(month).format('YYYY/MM')} (<Price price={total} />)
        </Typography>

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
      </Toolbar>
    </AppBar>
  )
}

export default Header
