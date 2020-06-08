import { useQuery } from '@apollo/client'

import { ContentContainer, Layout, Subheader } from 'src/components'
import { GET_CATEGORIES } from 'src/graphql/queries'

const Categories = () => {
  const { loading, data } = useQuery(GET_CATEGORIES)

  return (
    <Layout>
      <ContentContainer>
        <Subheader>Categories</Subheader>

        {!loading && (
          <div>
            {data.getCategories.data.map((item) => (
              <p key={item._id}>{item.name}</p>
            ))}
          </div>
        )}
      </ContentContainer>
    </Layout>
  )
}

export default Categories
