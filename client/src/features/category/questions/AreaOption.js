import { useSelector } from 'react-redux'
import { selectAreaById } from '../categoryApiSlice'

const AreaOption = ({ areaId }) => {
  const area = useSelector((state) => selectAreaById(state, areaId))
  return (
    <>
      <option value={area.id_area}>{area.area_title}</option>
    </>
  )
}

export default AreaOption
