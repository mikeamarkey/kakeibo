import { useMemo } from 'react'
import { useApolloClient } from '@apollo/client'
import produce from 'immer'
import { Paper, makeStyles } from '@material-ui/core'
import { DragHandle } from '@material-ui/icons'
import { SortableElement, SortableContainer, SortableHandle } from 'react-sortable-hoc'

import { Category } from 'src/components'
import { GET_CATEGORIES } from 'src/graphql/queries'
import { replaceInArray } from 'src/lib/utils'
import { getUnusedColor } from 'src/styles/color'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: `${theme.spacing(0.5)}px 0`,
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center'
  },
  add: {
    textAlign: 'center'
  },
  drag: {
    padding: theme.spacing(1),
    '& > svg': {
      verticalAlign: 'middle'
    }
  }
}))

const CategoryList = ({ categories, setDialogContent }) => {
  const client = useApolloClient()
  const css = useStyles()

  const DragElement = useMemo(() => SortableHandle(({ className }) => (
    <div className={css.drag}>
      <DragHandle />
    </div>
  )), [])

  const SortableList = useMemo(() => SortableContainer(({ items }) => (
    <div>
      {items.map((category, index) => {
        return (
          <SortableItem key={category._id} index={index} category={category} />
        )
      })}
    </div>
  )), [])

  const SortableItem = useMemo(() => SortableElement(({ category }) => (
    <Paper key={category._id} className={css.paper}>
      <DragElement />

      <Category
        key={category._id}
        label={category.name}
        color={category.color}
        onClick={() => {
          setDialogContent({ ...category })
        }}
      />
    </Paper>
  )), [])

  const doSort = (items, oldIndex, newIndex) => {
    const newItems = replaceInArray(oldIndex, newIndex, items)

    const newIds = newItems.reduce((acc, item, idx) => {
      acc[item._id] = idx + 1
      return acc
    }, {})

    const cache = client.readQuery({ query: GET_CATEGORIES })
    const data = produce(cache, (draft) => {
      const newData = draft.getCategories.data.map((item) => {
        if (!newIds[item._id]) {
          return item
        }
        return { ...item, order: newIds[item._id] }
      })
      draft.getCategories.data = newData
    })
    client.writeQuery({ query: GET_CATEGORIES, data })

    const pos = newIndex > oldIndex ? [oldIndex, newIndex + 1] : [newIndex, oldIndex + 1]
    const updateItems = newItems.slice(...pos).map((i) => [i._id, i.order])

    /* eslint-disable */
    fetch('/api/category/sort', {
    /* eslint-enable */
      method: 'POST',
      body: JSON.stringify(updateItems)
    }).then((res) => {
      console.log('success')
    }).catch(() => {
      console.log('failed')
    })
  }

  return (
    <>
      <Paper className={css.add}>
        <Category
          label='Add New Category'
          onClick={() => {
            setDialogContent({
              name: '',
              color: getUnusedColor(categories.map(category => category.color))
            })
          }}
        />
      </Paper>

      <SortableList
        items={categories}
        useDragHandle
        lockAxis='y'
        onSortEnd={({ oldIndex, newIndex }) => {
          if (oldIndex !== newIndex) {
            doSort(categories, oldIndex, newIndex)
          }
        }}
      />
    </>
  )
}

export default CategoryList
