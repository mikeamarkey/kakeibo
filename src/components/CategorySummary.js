import { Typography, makeStyles } from '@material-ui/core'
import { Category, FlexSpacer, Price, Row } from 'src/components'

const useStyles = makeStyles((theme) => ({
  row: {
    padding: theme.spacing(1)
  },
  category: {
    alignSelf: 'center'
  },
  right: {
    textAlign: 'right'
  },
  count: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px 0`,
    color: theme.palette.text.secondary
  }
}))

const CategorySummary = ({ label, color, count, total, ...props }) => {
  const css = useStyles()

  return (
    <Row {...props} className={css.row}>
      <Category
        className={css.category}
        label={label}
        color={color}
      />

      <FlexSpacer />

      <div className={css.right}>
        <Typography variant='body2' component='div'>
          <Price price={total} />
        </Typography>

        <Typography className={css.count} variant='caption' component='div'>
          {count}
        </Typography>
      </div>
    </Row>
  )
}

export default CategorySummary
