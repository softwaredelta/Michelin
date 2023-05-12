import { useSelector } from 'react-redux'
import { selectStateById } from '../../sellingPoint/state/stateApiSlice'

const StatesOption = ({ zoneId }) => {
  const zone = useSelector((state) => selectStateById(state, zoneId))

  const content = (
    <>
      <option value={zone.id}>
        {zone.name}
      </option>

    </>
  )
  return content
}

export default StatesOption
