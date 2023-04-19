import { useSelector } from 'react-redux'
import { selectCategoryById } from './categoryApiSlice'

const CategoryOption = ({ categoryId }) => {
  const category = useSelector((state) => selectCategoryById(state, categoryId))
  return (
    <>
      <option id="type">{category.name}</option>
    </>
  )
}

export default CategoryOption
