import { useMemo } from 'react'
import { useApolloClient } from '@apollo/client'
import produce from 'immer'
import { IconButton, makeStyles } from '@material-ui/core'
import { AddCircleOutline } from '@material-ui/icons'
import { SortableElement, SortableContainer } from 'react-sortable-hoc'
import moment from 'moment'

import { CategorySummary, Price, Subheader, Transaction } from 'src/components'
import { GET_TRANSACTIONS_BY_MONTH } from 'src/graphql/queries'
import { replaceInArray } from 'src/lib/utils'

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
  const client = useApolloClient()
  const css = useStyles()
  const groups = [
    { label: 'Income', ...monthly.income },
    { label: 'Expense', ...monthly.expense }
  ]

  const doSort = (items, oldIndex, newIndex) => {
    const newItems = replaceInArray(oldIndex, newIndex, items)

    const newIds = newItems.reduce((acc, item, idx) => {
      acc[item._id] = idx + 1
      return acc
    }, {})

    const variables = { month }
    const cache = client.readQuery({ query: GET_TRANSACTIONS_BY_MONTH, variables })
    const data = produce(cache, (draft) => {
      const newData = draft.getTransactionsByMonth.data.map((item) => {
        if (!newIds[item._id]) {
          return item
        }
        return { ...item, order: newIds[item._id] }
      })
      draft.getTransactionsByMonth.data = newData
    })
    client.writeQuery({ query: GET_TRANSACTIONS_BY_MONTH, variables, data })

    const pos = newIndex > oldIndex ? [oldIndex, newIndex + 1] : [newIndex, oldIndex + 1]
    const updateItems = newItems.slice(...pos).map((i) => [i._id, i.order])

    /* eslint-disable */
    fetch('/api/transaction/sort', {
    /* eslint-enable */
      method: 'POST',
      body: JSON.stringify(updateItems)
    }).then((res) => {
      console.log('success')
    }).catch(() => {
      console.log('failed')
    })
  }

  const SortableList = useMemo(() => SortableContainer(({ items }) => (
    <div>
      {items.map((transaction, index) => {
        return (
          <SortableItem key={transaction._id} index={index} transaction={transaction} />
        )
      })}
    </div>
  )), [])

  const SortableItem = useMemo(() => SortableElement(({ transaction }) => (
    <Transaction
      key={transaction._id}
      withSort
      transaction={transaction}
      onClick={() => {
        setDialogContent({ ...transaction })
      }}
    />
  )), [])

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
              useDragHandle
              lockAxis='y'
              onSortEnd={({ oldIndex, newIndex }) => {
                if (oldIndex !== newIndex) {
                  doSort(group.transactions, oldIndex, newIndex)
                }
              }}
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
