import moment from 'moment'
import { Footer, Price, Subheader, Transaction } from 'src/components'

const sortTransactions = (a, b) => b.createdAt - a.createdAt
const sortTransactionGroups = (a, b) => moment(b).diff(a)

const DailyTransactions = ({ categories, month, daily, setDialogContent }) => {
  return (
    <>
      {Object.keys(daily.days).sort(sortTransactionGroups).map((date) => (
        <div key={date}>
          <Subheader>
            <span>{moment(date).format('M/D')}</span>
            <Price price={daily.days[date].total} />
          </Subheader>

          {daily.days[date].transactions.sort(sortTransactions).map((transaction) => (
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

      <Footer
        month={month}
        categories={categories}
        setDialogContent={setDialogContent}
      />
    </>
  )
}

export default DailyTransactions
