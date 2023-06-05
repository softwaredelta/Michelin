import { useNavigate } from 'react-router-dom'
import YellowButton from '../buttons/YellowButton'

const ProgressBar = () => {
  const navigate = useNavigate()

  const content = (
    <>
      <div className='absolute top-24 w-full'>
        <div className='flex flex-row ml-3 gap-2'>
          <div className='flex flex-col w-36'>
            <YellowButton
              myText='Preparación'
              method={() => {
                navigate('/form/preparation')
              }}
            />
          </div>
          <div className='flex flex-col w-36'>
            <YellowButton
              myText='Exterior'
              method={() => navigate('/form/exterior')}
            />
          </div>
          <div className='flex flex-col w-36'>
            <YellowButton
              myText='Interior'
              method={() => navigate('/form/interior')}
            />
          </div>
          <div className='flex flex-col w-36'>
            <YellowButton
              myText='Cliente'
              method={() => navigate('/form/client')}
            />
          </div>
          <div className='flex flex-col w-36'>
            <YellowButton
              myText='Gerente'
              method={() => navigate('/form/manager')}
            />
          </div>
        </div>
      </div>
      {/* <div className='flex flex-col w-36'>
            <YellowButton myText='Otros' />
          </div>
      */}
    </>
  )
  return content
}

export default ProgressBar
