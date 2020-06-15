import { Card, CardActionArea, CardContent, Typography, makeStyles } from '@material-ui/core'
import { Category, Price } from 'src/components'

const useStyles = makeStyles((theme) => ({
  transaction: {
    margin: `${theme.spacing(0.5)}px 0`,
    borderRadius: 0
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
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

const Transaction = ({ transaction, onClick }) => {
  const css = useStyles()

  return (
    <Card
      className={css.transaction}
      onClick={onClick && onClick}
    >
      <CardActionArea>
        <CardContent className={css.content}>
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

          <Typography variant='body2'>
            <Price price={transaction.price} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Transaction
