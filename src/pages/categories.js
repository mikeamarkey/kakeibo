import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Container } from '@material-ui/core'

import { CategoryDialog, CategoryList, Layout, Loading } from 'src/components'
import { GET_CATEGORIES } from 'src/graphql/queries'

const Categories = () => {
  const [dialogContent, setDialogContent] = useState(null)
  const { loading, data } = useQuery(GET_CATEGORIES)
  const categories = data
    ? data.getCategories.data.slice().sort((a, b) => a.order - b.order)
    : []

  return (
    <Layout title='Categories'>
      {loading ? (
        <Loading />
      ) : (
        <Container maxWidth='sm' disableGutters>
          <CategoryList categories={categories} setDialogContent={setDialogContent} />
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
