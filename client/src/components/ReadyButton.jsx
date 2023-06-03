import { useNavigate } from 'react-router-dom'
import GradeChart from './GradeChart'

const ReadyButton = ({ intPeansweredrcentage }) => {
  const navigate = useNavigate()
  let disable = true
  if (intPeansweredrcentage === 100) {
    disable = false
  }

  const content = (
    <>
      <div className='scale-110'>
        <button onClick={() => navigate('/form/finalize')} disabled={disable}>
          <GradeChart percent={intPeansweredrcentage} zone='' />
        </button>
      </div>
    </>
  )

  return content
}

export default ReadyButton
