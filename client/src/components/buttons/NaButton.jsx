import CurrentForm from '../../services/CurrentForm'

const NaButton = ({
  section,
  area,
  index,
  buttonNa,
  disable,
  className,
  childtoParent
}) => {
  const Form = CurrentForm.getInstance()
  const myFunction = () => {
    Form.setAnswer(section, area, index, 3)
    childtoParent(3)
  }

  const content = (
    <>
      <button className={className} disabled={disable} onClick={myFunction}>
        <img src='/images/naButton.png' alt='No aplica' />
      </button>
    </>
  )
  return content
}
export default NaButton
