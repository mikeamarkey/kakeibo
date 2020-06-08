import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core'

import {
  Category,
  CategoryDialog,
  ContentContainer,
  Layout,
  Loading,
  Subheader
} from 'src/components'
import { GET_CATEGORIES } from 'src/graphql/queries'

const useStyles = makeStyles((theme) => ({
  list: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

const Categories = () => {
  const [dialogContent, setDialogContent] = useState(null)
  const { loading, data } = useQuery(GET_CATEGORIES)
  const css = useStyles()

  const categories = data ? data.getCategories.data : []

  return (
    <Layout>
      <ContentContainer>
        <Subheader>Categories</Subheader>

        {loading ? (
          <Loading />
        ) : (
          <div className={css.list}>
            <Category
              label='Add New Category'
              onClick={() => {
                setDialogContent({
                  name: ''
                })
              }}
            />

            {categories.map((category) => (
              <Category
                key={category._id}
                label={category.name}
                onClick={() => {
                  setDialogContent({ ...category })
                }}
              />
            ))}
          </div>
        )}
      </ContentContainer>

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
