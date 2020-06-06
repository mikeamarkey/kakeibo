import { useQuery } from '@apollo/client'

import { Layout } from 'src/components'
import { GET_CATEGORIES } from 'src/graphql/queries'

const Categories = () => {
  const { loading, data } = useQuery(GET_CATEGORIES)

  return (
    <Layout>
      <p>Categories</p>

      {!loading && (
        <div>
          {data.getCategories.data.map((item) => (
            <p key={item._id}>{item.name}</p>
          ))}
        </div>
      )}
    </Layout>
  )
}

export default Categories
