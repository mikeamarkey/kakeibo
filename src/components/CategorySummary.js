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
        <Typography variant='body2'>
          <Price price={total} />

          <Typography
            className={css.note}
            variant='caption'
            component='div'
          >
            {count}
          </Typography>
        </Typography>
      </div>
    </Row>
  )
}

export default CategorySummary
