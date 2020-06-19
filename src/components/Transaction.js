import { Typography, makeStyles } from '@material-ui/core'
import { Category, FlexSpacer, Price, Row } from 'src/components'

const useStyles = makeStyles((theme) => ({
  row: {
    padding: theme.spacing(1)
  },
  category: {
    margin: 0,
    pointerEvents: 'none'
  },
  note: {
    margin: '4px 2px 0',
    color: theme.palette.text.secondary
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

      <div>
        <Typography variant='body2'>
          <Price price={transaction.price} />
        </Typography>
      </div>
    </Row>
  )
}

export default Transaction
