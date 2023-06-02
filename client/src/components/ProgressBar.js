import { useNavigate } from 'react-router-dom'
import YellowButton from './YellowButton'

const ProgressBar = () => {
  const navigate = useNavigate()

  const content = (
    <>
      <div className='absolute top-24 w-full'>
        <div className='flex flex-row justify-center gap-5'>
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
          <div className='flex flex-col  w-36'>
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
          <div className='flex flex-col  w-36'>
            <YellowButton myText='Otros' />
          </div>
        </div>
      </div>
      {/* <div className='mb-5'>
        <Navbar className='border-b-2 fixed top-0 z-30 w-full justify-center' fluid rounded={false}>
          <NavbarBrand className='px-4' onClick={() => navigate('/form')}>
            <HiHome
              className='fill-blues-200 dark:fill-white dark:hover:fill-trademark-50 hover:fill-gray-500 cursor-pointer' size={60}
            />
          </NavbarBrand>
          <NavbarCollapse className='px-2 justify-center'>
            <NavbarLink className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50 cursor-pointer' onClick={() => navigate('/form/preparation')}>Preparación</NavbarLink>
            <NavbarLink className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50 cursor-pointer' onClick={() => navigate('/form/exterior')}>Exterior</NavbarLink>
            <NavbarLink className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50 cursor-pointer' onClick={() => navigate('/form/interior')}>Interior</NavbarLink>
            <NavbarLink className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50 cursor-pointer' onClick={() => navigate('/form/client')}>Cliente</NavbarLink>
            <NavbarLink className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50 cursor-pointer' onClick={() => navigate('/form/manager')}>Gerente</NavbarLink>
            </NavbarCollapse>
        </Navbar>
      </div> */}
    </>
  )
  return content
}

export default ProgressBar
