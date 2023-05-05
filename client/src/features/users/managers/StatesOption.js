import { useSelector } from 'react-redux'
import { selectStateById } from '../../sellingPoint/state/stateApiSlice'

const StatesOption = ({ zoneId }) => {
  const zone = useSelector((state) => selectStateById(state, zoneId))

  return (
    <>
      <option value={zone.id}>
        {zone.name}
      </option>

    </>
  )
}

export default StatesOption
