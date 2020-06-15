import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Container } from '@material-ui/core'

import { Category, CategoryDialog, Layout, Loading } from 'src/components'
import { GET_CATEGORIES } from 'src/graphql/queries'
import { getUnusedColor } from 'src/styles/color'

const Categories = () => {
  const [dialogContent, setDialogContent] = useState(null)
  const { loading, data } = useQuery(GET_CATEGORIES)

  const categories = data ? data.getCategories.data : []

  return (
    <Layout title='Categories'>
      {loading ? (
        <Loading />
      ) : (
        <Container size='sm'>
          <Category
            label='Add New Category'
            onClick={() => {
              setDialogContent({
                name: '',
                color: getUnusedColor(categories.map(category => category.color))
              })
            }}
          />

          {categories.map((category) => (
            <Category
              key={category._id}
              label={category.name}
              color={category.color}
              onClick={() => {
                setDialogContent({ ...category })
              }}
            />
          ))}
        </Container>
      )}

      {dialogContent && (
        <CategoryDialog
          dialogContent={dialogContent}
          setDialogContent={setDialogContent}
        />
      )}
    </Layout>
  )
}

export default Categories
