
const AreaOption = ({ areaId, areaTitle }) => {
  const content = (
    <>
      <option value={areaId}>{areaTitle}</option>
    </>
  )
  return content
}

export default AreaOption
