import { useNavigate } from 'react-router-dom'
import GradeChart from '../inputs/GradeChart'
// import YellowButton from './YellowButton'
import CurrentForm from '../../services/CurrentForm'
import { Button } from 'flowbite-react'
import { FaFlagCheckered } from 'react-icons/fa'

const ReadyButton = ({ intPeansweredrcentage }) => {
  const Form = CurrentForm.getInstance()
  const navigate = useNavigate()

  const onFinalizeTourClicked = () => {
    Form.setEndTime()
    navigate('/form/finalize')
  }

  let grade = (
    <GradeChart percent={intPeansweredrcentage} zone='' />
  )

  if (intPeansweredrcentage === 100) {
    grade = (
      // <YellowButton
      //   myText={ 'Finalizar' }
      //   method={ onFinalizeTourClicked }
      // />
      <Button
      onClick={ onFinalizeTourClicked }
      className='w-full mt-4 py-0 px-5 text-3xl shadow-lg !bg-lime-600 !text-white !font-bold !rounded-full hover:!bg-yellow-500 '
    >
     <FaFlagCheckered className='mr-2' /> Finalizar
    </Button>
    )
  }

  const content = (
    <>
      <div className='scale-110 mr-8'>
        {grade}
      </div>
    </>
  )

  return content
}

export default ReadyButton
