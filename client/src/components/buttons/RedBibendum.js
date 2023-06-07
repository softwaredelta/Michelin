import CurrentForm from '../../services/CurrentForm'
const RedBibendum = ({
  section,
  area,
  index,
  photo,
  disable,
  className,
  childtoParent
}) => {
  const Form = CurrentForm.getInstance()

  const onButtonClicked = () => {
    Form.setAnswer(section, area, index, 2)
    childtoParent(2)
  }

  const content = (
    <>
      <button className={className} onClick={onButtonClicked} disabled={disable}>
        <img src='/images/redBibendum.png' alt='No' />
      </button>
      {photo}
    </>
  )
  return content
}
export default RedBibendum
