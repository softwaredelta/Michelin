import { useSelector } from 'react-redux'
import { selectCategoryById } from './sectionApiSlice'

const CategoryOption = ({ categoryId }) => {
  const category = useSelector((state) => selectCategoryById(state, categoryId))

  const content = (
    <>
      <option id='type' value={category.id}>{category.name}</option>
    </>
  )
  return content
}

export default CategoryOption
