const Price = ({ price }) => {
  const formatted = new Intl.NumberFormat('ja-JP').format(price)
  return (
    <span>¥{formatted}</span>
  )
}

export default Price
