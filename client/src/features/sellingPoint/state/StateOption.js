import { useSelector } from "react-redux";
import { selectStateById } from "./stateApiSlice";

const StateOption = ({ zoneId }) => {
  const zone = useSelector((state) => selectStateById(state, zoneId));
  console.log(zone);
  return (
    <>
      <option value={zone.id}>{zone.name}</option>
    </>
  );
};

export default StateOption;