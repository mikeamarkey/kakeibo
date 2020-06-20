import { IconButton, makeStyles } from '@material-ui/core'
import { AddCircleOutline } from '@material-ui/icons'
import moment from 'moment'

import { CategorySummary, Price, SortableList, Subheader, Transaction } from 'src/components'

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
    { label: 'Income', ...monthly.income },
    { label: 'Expense', ...monthly.expense }
  ]

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
        <Price price={monthly.categories.total} />
      </Subheader>

      {Object.keys(monthly.categories.ids).map((categoryId) => {
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
