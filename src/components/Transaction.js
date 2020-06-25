import { Typography, makeStyles } from '@material-ui/core'
import { Category, FlexSpacer, Price, Row } from 'src/components'

const useStyles = makeStyles((theme) => ({
  row: {
    padding: theme.spacing(1)
  },
  note: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px 0`,
    color: theme.palette.text.secondary
  },
  right: {
    marginLeft: theme.spacing(2)
  }
}))

const Transaction = ({ transaction, ...props }) => {
  const css = useStyles()

  return (
    <Row {...props} className={css.row}>
      <div>
        {transaction.type === 'DAILY' ? (
          <Category
            className={css.category}
            size='small'
            label={transaction.category.name}
            color={transaction.category.color}
          />
        ) : (
          <Typography variant='body2'>
            {transaction.name}
          </Typography>
        )}

        {transaction.note && (
          <Typography
            className={css.note}
            variant='caption'
            component='div'
          >
            {transaction.note}
          </Typography>
        )}
      </div>

      <FlexSpacer />

      <Typography className={css.right} variant='body2' component='div'>
        <Price price={transaction.price} />
      </Typography>
    </Row>
  )
}

export default Transaction
