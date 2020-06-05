import { Card, CardActionArea, CardContent, Typography, makeStyles } from '@material-ui/core'
import { Price } from 'src/components'

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
  small: {
    color: theme.palette.text.secondary
  }
}))

const Transaction = ({ transaction, onClick }) => {
  const css = useStyles()

  return (
    <Card
      className={css.transaction}
      onClick={() => onClick()}
    >
      <CardActionArea>
        <CardContent className={css.content}>
          <div>
            <Typography variant='body2'>{transaction.category.name}</Typography>

            {transaction.note.length > 0 && (
              <Typography className={css.small} variant='caption'>{transaction.note}</Typography>
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
