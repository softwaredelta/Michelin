import CurrentForm from '../../../services/CurrentForm'
import { useNavigate } from 'react-router-dom'
import { Button } from 'flowbite-react'
import ProgressBar from '../../../components/ProgressBar'

const Preview = () => {
  const navigate = useNavigate()

  const Form = CurrentForm.getInstance()
  Form.loadFormInfo()

  const content = (
    <>
      <ProgressBar />
      <Button className='!bg-zinc-500 dark:!bg-blues-200 dark:hover:!bg-gray-500' onClick={() => navigate('/prueba/preparacion')}>Editar Cuestionario </Button>
    </>
  )
  return content
}

export default Preview
