import { IconButton, makeStyles } from '@material-ui/core'
import { AddCircleOutline } from '@material-ui/icons'
import moment from 'moment'
import { Price, Subheader, Transaction } from 'src/components'

const useStyles = makeStyles((theme) => ({
  create: {
    textAlign: 'center'
  }
}))

const MonthlyTransactions = ({
  month,
  monthly,
  setDialogContent,
  setFilter,
  setTab
}) => {
  const css = useStyles()
  const groups = [
    { label: 'Income', data: monthly.income },
    { label: 'Expense', data: monthly.expense }
  ]

  return (
    <>
      {groups.map((group) => {
        return (
          <div key={group.label}>
            <Subheader>
              <span>{group.label}</span>
              <Price price={group.data.total} />
            </Subheader>

            {group.data.transactions.map((transaction) => (
              <Transaction
                key={transaction._id}
                transaction={transaction}
                onClick={() => {
                  setDialogContent({ ...transaction })
                }}
              />
            ))}

            <div className={css.create}>
              <IconButton
                color='primary'
                onClick={() => setDialogContent({
                  createdAt: moment().unix(),
                  month: month,
                  name: '',
                  note: '',
                  price: '',
                  type: group.type
                })}
              >
                <AddCircleOutline />
              </IconButton>
            </div>
          </div>
        )
      })}

      <Subheader>
        <span>Daily</span>
        <Price price={monthly.categories.total} />
      </Subheader>

      {Object.keys(monthly.categories.ids).map((categoryId) => {
        const group = monthly.categories.ids[categoryId]
        return (
          <Transaction
            key={categoryId}
            transaction={group}
            onClick={() => {
              setFilter({ category: [categoryId] })
              setTab(0)
            }}
          />
        )
      })}
    </>
  )
}

export default MonthlyTransactions
