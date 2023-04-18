import { useSelector } from "react-redux";

const ModifiedOption = ({ categoryId }) => {
  const category = useSelector((state) => (state, categoryId));
  return (
    <>
      <option value={category.id}>{category.name}</option>
    </>
  );
};

export default ModifiedOption;
