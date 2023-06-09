import CurrentForm from '../../services/CurrentForm'

const GreenBibendum = ({
  section,
  area,
  index,
  disable,
  className,
  childtoParent
}) => {
  const Form = CurrentForm.getInstance()

  const onButtonClicked = () => {
    Form.setAnswer(section, area, index, 1)
    childtoParent(1)
  }

  const content = (
    <>
      <button className={className} disabled={disable} onClick={onButtonClicked}>
        <img src='/images/greenBibendum.png' alt='Sí' />
      </button>
    </>
  )
  return content
}
export default GreenBibendum
