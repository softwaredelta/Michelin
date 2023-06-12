import { Dropdown, Navbar } from 'flowbite-react'
import { DropdownItem } from 'flowbite-react/lib/esm/components/Dropdown/DropdownItem'
import { NavbarBrand } from 'flowbite-react/lib/esm/components/Navbar/NavbarBrand'
import { NavbarCollapse } from 'flowbite-react/lib/esm/components/Navbar/NavbarCollapse'
import { NavbarLink } from 'flowbite-react/lib/esm/components/Navbar/NavbarLink'

const NavBar = () => {
  const role = localStorage.getItem('role') // eslint-disable-line
  const onLogoutClicked = () => {
    localStorage.clear() // eslint-disable-line
  }

  let admin = (
    <NavbarLink className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50'>
      <div className='flex md:order-2 text-lg'>
        <Dropdown
          arrowIcon
          inline
          className='!text-lg'
          label='Administración'
        >
          <DropdownItem className='font-semibold !text-blues-100 dark:!text-white hover:!text-gray-500 dark:hover:!text-trademark-50'> <a href='/user'> Usuarios </a></DropdownItem>
        </Dropdown>
      </div>
    </NavbarLink>
  )
  let manager
  let metric
  if (role != 3){ //eslint-disable-line
    admin = null
    metric = (
      <NavbarLink
        href='/metric/tbm'
        className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50'
      >
        Métricas
      </NavbarLink>
    )
  }

  if (role == 2 || role == 3){ //eslint-disable-line
    manager = (
      <NavbarLink href='/question' className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50'>Cuestionarios</NavbarLink>
    )
    metric = (
      <NavbarLink
        href='/metric'
        className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50'
      >
        Métricas
      </NavbarLink>
    )
  }

  const content = (
    <>
      <div className='mb-5'>
        <Navbar
          className='border-b fixed top-0 z-30 w-full dark:!bg-stone-950 dark:!border-stone-800'
          fluid
          rounded={false}
        >
          <NavbarBrand className='px-4' href='/home'>
            <img
              style={({ width: '100px' }, { height: '60px' })}
              src='/images/Michelin-Logo.png'
              alt='Michelin Logo'
            />
          </NavbarBrand>
          <NavbarCollapse className='px-2'>

            <NavbarLink
              href='/history'
              className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50'
            >
              Historial
            </NavbarLink>
            {metric}
            <NavbarLink
              href='/sellingPoint'
              className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50'
            >
              Puntos de Venta
            </NavbarLink>
            {manager}
            {admin}
            <NavbarLink
              href='/login'
              className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50'
              onClick={onLogoutClicked}
            >
              Cerrar Sesión
            </NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </div>
    </>
  )
  return content
}

export default NavBar
