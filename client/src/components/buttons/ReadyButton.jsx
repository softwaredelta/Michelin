import { useNavigate } from 'react-router-dom'
import GradeChart from '../inputs/GradeChart'
import YellowButton from './YellowButton'
import CurrentForm from '../../services/CurrentForm'

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
      <YellowButton
        myText='Finalizar'
        method={onFinalizeTourClicked}
      />
    )
  }

  const content = (
    <>
      <div className='scale-110'>
        {grade}
      </div>
    </>
  )

  return content
}

export default ReadyButton
