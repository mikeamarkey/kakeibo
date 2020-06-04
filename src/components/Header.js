import { AppBar, IconButton, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  center: {
    flexGrow: 1,
    textAlign: 'center'
  },
  month: {
    fontWeight: theme.typography.fontWeightBold
  }
}))

const Header = ({ month, setMonth, refetchTransactions }) => {
  const css = useStyles()
  const previousMonth = moment(month).subtract(1, 'M').format('YYYYMM')
  const nextMonth = moment(month).add(1, 'M').format('YYYYMM')

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
          aria-label='previous month'
          onClick={() => onMonthChange(previousMonth)}
        >
          <ArrowBack />
        </IconButton>

        <div className={css.center}>
          <Typography variant='h6'>
            Kakeibo
          </Typography>
          <Typography className={css.month} variant='caption'>
            {moment(month).format('YYYY/MM')}
          </Typography>
        </div>

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
