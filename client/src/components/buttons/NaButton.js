import CurrentForm from '../../services/CurrentForm'

const NaButton = ({
  section,
  area,
  index,
  disable,
  className,
  childtoParent
}) => {
  const Form = CurrentForm.getInstance()

  const onButtonClicked = () => {
    Form.setAnswer(section, area, index, 3)
    childtoParent(3)
  }

  const content = (
    <>
      <button className={className} disabled={disable} onClick={onButtonClicked}>
        <img src='/images/naButton.png' alt='No aplica' />
      </button>
    </>
  )
  return content
}
export default NaButton
