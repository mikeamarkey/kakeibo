import { useQuery } from '@apollo/client'
import { GET_CATEGORIES } from 'src/graphql/queries'

const Categories = () => {
  const { loading, data } = useQuery(GET_CATEGORIES)

  return (
    <div>
      <p>Categories</p>

      {!loading && (
        <div>
          {data.getCategories.data.map((item) => (
            <p key={item._id}>{item.name}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default Categories
