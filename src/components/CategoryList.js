import { useMutation } from '@apollo/client'
import { makeStyles } from '@material-ui/core'
import { Category, Row, SortableList } from 'src/components'
import { SORT_CATEGORIES } from 'src/graphql/queries'
import { getUnusedColor } from 'src/styles/color'

const useStyles = makeStyles((theme) => ({
  addRow: {
    justifyContent: 'center'
  }
}))

const CategoryList = ({ categories, setDialogContent }) => {
  const [sortCategories] = useMutation(SORT_CATEGORIES)
  const css = useStyles()

  function handleSort (updateItems) {
    sortCategories({
      variables: {
        input: updateItems.map(({ _id, order }) => {
          return { id: _id, order }
        })
      },
      optimisticResponse: {
        sortCategories: updateItems
      }
    })
  }

  return (
    <>
      <Row className={css.addRow}>
        <Category
          label='Add New Category'
          onClick={() => {
            setDialogContent({
              name: '',
              color: getUnusedColor(categories.map(category => category.color))
            })
          }}
        />
      </Row>

      <SortableList
        items={categories}
        itemElement={(category) => (
          <Row key={category._id} withSort>
            <Category
              key={category._id}
              label={category.name}
              color={category.color}
              onClick={() => {
                setDialogContent({ ...category })
              }}
            />
          </Row>
        )}
        handleSort={handleSort}
      />
    </>
  )
}

export default CategoryList
