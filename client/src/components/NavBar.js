import { Dropdown, Navbar } from 'flowbite-react'
import { DropdownItem } from 'flowbite-react/lib/esm/components/Dropdown/DropdownItem'
import { NavbarBrand } from 'flowbite-react/lib/esm/components/Navbar/NavbarBrand'
import { NavbarCollapse } from 'flowbite-react/lib/esm/components/Navbar/NavbarCollapse'
import { NavbarLink } from 'flowbite-react/lib/esm/components/Navbar/NavbarLink'

const NavBar = () => {
  const content = (
    <>
      <div className='mb-5'>
        <Navbar className='border-b-2 fixed top-0 z-30 w-full dark:!bg-blues-400' fluid rounded={false}>
          <NavbarBrand className='px-4' href='/'>
            <img
              style={({ width: '100px' }, { height: '60px' })}
              src='https://logos-download.com/wp-content/uploads/2016/03/Michelin_brand_Logo_2017.png'
              alt='Michelin Logo'
            />
          </NavbarBrand>
          <NavbarCollapse className='px-2'>
            <NavbarLink className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50'>Recorrido</NavbarLink>
            <NavbarLink href='/history' className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50'>Historial</NavbarLink>
            <NavbarLink href='/question' className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50'>Cuestionarios</NavbarLink>
            <NavbarLink className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50'>
              <div className='flex md:order-2 text-lg'>
                <Dropdown
                  arrowIcon
                  inline
                  className='!text-lg'
                  label='Administración'
                >
                  <DropdownItem href='/sellingPoint' className='font-semibold !text-blues-100 dark:!text-white hover:!text-gray-500 dark:hover:!text-trademark-50'> <a href='/sellingPoint'>Puntos de Venta</a></DropdownItem>
                  <DropdownItem className='font-semibold !text-blues-100 dark:!text-white hover:!text-gray-500 dark:hover:!text-trademark-50'>Equipos</DropdownItem>
                  <DropdownItem className='font-semibold !text-blues-100 dark:!text-white hover:!text-gray-500 dark:hover:!text-trademark-50'> <a href='/user'> Usuarios </a></DropdownItem>
                </Dropdown>
              </div>
            </NavbarLink>
            <NavbarLink className='text-lg font-semibold dark:!text-white !text-blues-200 hover:!text-gray-500 dark:hover:!text-trademark-50'>Cuenta</NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </div>
    </>
  )
  return content
}

export default NavBar
