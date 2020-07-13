import { useMemo } from 'react'
import { SortableElement, SortableContainer } from 'react-sortable-hoc'
import { replaceInArray } from 'src/lib/utils'

const SortableList = ({ itemElement, items, handleSort }) => {
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
          const pos = newIndex > oldIndex ? [oldIndex, newIndex + 1] : [newIndex, oldIndex + 1]
          const updateItems = newItems.slice(...pos)
          return handleSort(updateItems)
        }
      }}
    />
  )
}

export default SortableList
