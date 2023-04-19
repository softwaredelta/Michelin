import { useSelector } from 'react-redux'
import { selectCategoryById } from './categoryApiSlice'

const CategoryOption = ({ categoryId }) => {
  const category = useSelector((state) => selectCategoryById(state, categoryId))
  return (
    <>
      <option value={category.id}>{category.name}</option>
    </>
  )
}

export default CategoryOption
