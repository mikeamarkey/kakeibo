import { Box } from '@material-ui/core'

const Price = ({ price, withColor = false }) => {
  const formatted = new Intl.NumberFormat('ja-JP').format(price)
  return (
    <Box
      component='span'
      color={!withColor ? null : (price >= 0 ? 'success.main' : 'error.main')}
    >
      ¥{formatted}
    </Box>
  )
}

export default Price
