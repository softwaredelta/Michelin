import CurrentForm from '../services/CurrentForm'

const AreaTitle = ({ number, title, questions, answered }) => {
  const Form = CurrentForm.getInstance()

  const content = (
    <>
      <div class='flex flex-row justify-start pr-8'>
        <div class='col m-auto justify-start'>
          <h1 className='text-blues-200 text-3xl text-start ml-10'>{number}</h1>
        </div>
        <div class='col m-auto justify-start w-5/6'>
          <h1 className='text-blues-200 text-3xl text-start ml-10'> {title} </h1>
        </div>
        <div class='col m-auto justify-start'>
          <h1 className='text-blues-200 text-3xl text-start ml-10'> {answered}/{questions} </h1>
        </div>

      </div>
    </>
  )
  return content
}
export default AreaTitle
