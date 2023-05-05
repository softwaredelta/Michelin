import { useSelector } from 'react-redux'
import { selectCategoryById } from './sectionApiSlice'

const CategoryOption = ({ categoryId }) => {
  const category = useSelector((state) => selectCategoryById(state, categoryId))
  return (
    <>
      <option id='type' value={category.id}>{category.name}</option>
    </>
  )
}

export default CategoryOption
