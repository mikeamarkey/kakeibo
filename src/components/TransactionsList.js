import moment from 'moment'
import { Price, Subheader, Transaction } from 'src/components'

const sortTransactions = (a, b) => b._ts - a._ts
const sortTransactionGroups = (a, b) => moment(b).diff(a)

const TransactionsList = ({ month, transactions, setDialogContent }) => {
  const transactionGroups = transactions.reduce((acc, item) => {
    if (!acc.groups[item.date]) {
      acc.groups[item.date] = {
        total: item.price,
        transactions: [item]
      }
    } else {
      acc.groups[item.date].total += item.price
      acc.groups[item.date].transactions.push(item)
    }
    acc.total += item.price
    return acc
  }, { total: 0, groups: {} })

  return (
    <>
      {Object.keys(transactionGroups.groups).sort(sortTransactionGroups).map((date) => (
        <div key={date}>
          <Subheader>
            <span>{moment(date).format('M/D')}</span>
            <Price price={transactionGroups.groups[date].total} />
          </Subheader>

          {transactionGroups.groups[date].transactions.sort(sortTransactions).map((transaction) => (
            <Transaction
              key={transaction._id}
              transaction={transaction}
              onClick={() => {
                setDialogContent({ ...transaction, category: transaction.category._id })
              }}
            />
          ))}
        </div>
      ))}
    </>
  )
}

export default TransactionsList
