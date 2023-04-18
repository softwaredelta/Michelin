import { useSelector } from "react-redux";
import { selectCategoryById } from "../features/category/categoryApiSlice";

const ModifiedOption = ({ categoryId }) => {
  const category = useSelector((state) => selectCategoryById(state, categoryId));
  return (
    <>
      <option value={category.id}>{category.name}</option>
    </>
  );
};

export default ModifiedOption;
