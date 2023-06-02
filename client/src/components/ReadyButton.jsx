import { useNavigate } from 'react-router-dom'

const ReadyButton = ({ answered }) => {
  answered = (1006 * answered) / 100
  const navigate = useNavigate()
  // 1006 es total
  const content = (
    <>
      <div class='w-full bg-gray-200 rounded-full dark:bg-gray-700 h-8'>
        <div class='bg-blue-600 text-l font-medium text-blue-100 text-center p-0.5 leading-none rounded-full cursor-pointer  h-8' style={{ width: answered }} onClick={() => navigate('/form/finalize')}><p>Listo</p></div>
      </div>
    </>
  )

  return content
}

export default ReadyButton
