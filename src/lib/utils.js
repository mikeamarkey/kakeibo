import produce from 'immer'

function replaceInArray (oldIndex, newIndex, items) {
  const newArr = produce(items, (draft) => {
    draft.splice(newIndex, 0, draft.splice(oldIndex, 1)[0])
    draft.forEach((item, idx) => {
      item.order = idx + 1
    })
  })
  return newArr
}

export { replaceInArray }
