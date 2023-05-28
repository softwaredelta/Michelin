import CurrentForm from '../services/CurrentForm'
const GreenBibendum = ({ section, area, index }) => {
  const Form = CurrentForm.getInstance()
  const disable = false
  const myFunction = () => {
    Form.setAnswer(section, area, index, 1)
    console.log(Form.questions)
    // GB.disabled = true;
  }

  const content = (
    <>
      <button id="GB" className='scale-50 rounded-full bg-white bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-40' disabled={disable} onClick={myFunction}><img src='/images/greenBibendum.png' /></button>
    </>
  )
  return content
}
export default GreenBibendum
