import { Children } from 'react'
import { Paper, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  subheader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: `${theme.spacing(1)}px 0 ${theme.spacing(0.5)}px`,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  subheaderText: {
    fontWeight: theme.typography.fontWeightBold
  }
}))

const Subheader = ({ children }) => {
  const css = useStyles()

  return (
    <Paper className={css.subheader} square>
      {Children.map(children, (child, idx) => (
        <Typography key={idx} className={css.subheaderText} variant='subtitle1'>
          {child}
        </Typography>
      ))}
    </Paper>
  )
}

export default Subheader
