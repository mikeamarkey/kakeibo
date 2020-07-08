import { useMemo } from 'react'
import { useApolloClient } from '@apollo/client'
import { SortableElement, SortableContainer } from 'react-sortable-hoc'
import produce from 'immer'
import { getAuthToken } from 'src/lib/auth'
import { replaceInArray } from 'src/lib/utils'

const SortableList = ({ itemElement, items, query, variables, url }) => {
  const client = useApolloClient()

  const Item = useMemo(() => SortableElement(({ item }) => (
    itemElement(item)
  )), [])

  const List = useMemo(() => SortableContainer(({ items }) => (
    <div>
      {items.map((item, index) => {
        return (
          <Item key={item._id} index={index} item={item} />
        )
      })}
    </div>
  )), [])

  return (
    <List
      items={items}
      useDragHandle
      lockAxis='y'
      onSortEnd={({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
          const newItems = replaceInArray(oldIndex, newIndex, items)
          const queryName = query.definitions[0].name.value

          const newIds = newItems.reduce((acc, item, idx) => {
            acc[item._id] = idx + 1
            return acc
          }, {})

          const cache = client.readQuery({ query, variables })
          const data = produce(cache, (draft) => {
            const newData = draft[queryName].data.map((item) => {
              if (!newIds[item._id]) {
                return item
              }
              return { ...item, order: newIds[item._id] }
            })
            draft[queryName].data = newData
          })
          client.writeQuery({ query, data, variables })

          const pos = newIndex > oldIndex ? [oldIndex, newIndex + 1] : [newIndex, oldIndex + 1]
          const updateItems = newItems.slice(...pos).map((i) => [i._id, i.order])

          return fetch(url, {
            method: 'POST',
            body: JSON.stringify({ token: getAuthToken(), items: updateItems })
          })
        }
      }}
    />
  )
}

export default SortableList
