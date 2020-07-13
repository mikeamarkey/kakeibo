import { IconButton, makeStyles } from '@material-ui/core'
import { AddCircleOutline } from '@material-ui/icons'
import { useMutation } from '@apollo/client'
import moment from 'moment'

import { CategorySummary, Price, SortableList, Subheader, Transaction } from 'src/components'
import { SORT_TRANSACTIONS } from 'src/graphql/queries'

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
  const [sortTransactions] = useMutation(SORT_TRANSACTIONS)
  const css = useStyles()
  const groups = [
    { label: 'Income', ...monthly.income, type: 'INCOME' },
    { label: 'Expense', ...monthly.expense, type: 'EXPENSE' }
  ]

  function handleSort (updateItems) {
    sortTransactions({
      variables: {
        input: updateItems.map(({ _id, order }) => {
          return { id: _id, order }
        })
      },
      optimisticResponse: {
        sortTransactions: updateItems
      }
    })
  }

  return (
    <>
      {groups.map((group) => {
        return (
          <div key={group.label}>
            <Subheader>
              <span>{group.label}</span>
              <Price price={group.total} />
            </Subheader>

            <SortableList
              items={group.transactions}
              itemElement={(item) => (
                <Transaction
                  key={item._id}
                  withSort
                  transaction={item}
                  onClick={() => {
                    setDialogContent({ ...item })
                  }}
                />
              )}
              handleSort={handleSort}
            />

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
        <div>
          <Price price={monthly.categories.total} /> ({monthly.categories.count})
        </div>
      </Subheader>

      {Object.keys(monthly.categories.ids)
        .sort((a, b) => monthly.categories.ids[a].order - monthly.categories.ids[b].order)
        .map((categoryId) => {
          const group = monthly.categories.ids[categoryId]
          return (
            <CategorySummary
              key={categoryId}
              color={group.color}
              label={group.label}
              total={group.total}
              count={group.count}
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
