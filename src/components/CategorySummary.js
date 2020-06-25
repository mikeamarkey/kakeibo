import { Typography, makeStyles } from '@material-ui/core'
import { Category, FlexSpacer, Price, Row } from 'src/components'

const useStyles = makeStyles((theme) => ({
  row: {
    padding: theme.spacing(1),
    alignItems: 'center'
  }
}))

const CategorySummary = ({ label, color, count, total, ...props }) => {
  const css = useStyles()

  return (
    <Row {...props} className={css.row}>
      <Category
        label={label}
        color={color}
        size='small'
      />

      <FlexSpacer />

      <Typography variant='body2' component='div'>
        <Price price={total} /> ({count})
      </Typography>
    </Row>
  )
}

export default CategorySummary
