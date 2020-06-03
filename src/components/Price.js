const Price = ({ price }) => {
  const formatted = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(price)
  return (
    <span>{formatted}</span>
  )
}

export default Price
