import { useSelector } from 'react-redux'
import { selectStateById } from '../../../services/stateApiSlice'

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
