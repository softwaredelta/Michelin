import { Navbar } from 'flowbite-react'
import { NavbarBrand } from 'flowbite-react/lib/esm/components/Navbar/NavbarBrand'
import { NavbarCollapse } from 'flowbite-react/lib/esm/components/Navbar/NavbarCollapse'
import { NavbarLink } from 'flowbite-react/lib/esm/components/Navbar/NavbarLink'
import { HiHome } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import CurrentForm from '../services/CurrentForm'

const ProgressBar = () => {
  const Form = CurrentForm.getInstance()
  const navigate = useNavigate()

  const content = (
    <>
      <div className='mb-5'>
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
            <NavbarLink className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50 cursor-pointer' onClick={() => Form.postForm('Ejemplo', 'Ejemplo')}>Finalizar</NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </div>
    </>
  )
  return content
}

export default ProgressBar
