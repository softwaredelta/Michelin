
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody'
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter'
import { Tooltip, Label, Select, Modal } from 'flowbite-react'
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader'

const UserAdd = ({ show, onClose }) => {
  const content = (
    <>
      <Modal show={show} onClose={onClose} dismissible>
        <ModalHeader className='!bg-blues-200'>
          <div className='flex ml-14'>
            <div className='flex items-center flex-col mx-4 text-2xl font-semibold text-white'>
              Nuevo Usuario
            </div>
          </div>
        </ModalHeader>
        <form>
          <ModalBody>
            <div className='flex justify-center'>
              <div className='flex flex-col w-3/4'>
                <div className=' flex flex-row'>
                  <div className='col mr-9'>
                    <div className='flex flex-row items-center'>
                      <Tooltip
                        content='-'
                        trigger='hover'
                        className='dark:!bg-white dark:!text-black'
                      >
                        <Label
                          htmlFor='-'
                          value='Nombre'
                          className='text-lg font-semibold mr-2 my-1'
                        />
                      </Tooltip>
                    </div>
                    <input
                      id='-'
                      name='-'
                      required
                      autoComplete='off'
                      className='border-2 rounded-md my-2 resize-none'
                      maxLength='255'
                    />
                  </div>
                  <div className='col'>
                    <div className='flex flex-row items-center'>
                      <Tooltip
                        content='-'
                        trigger='hover'
                        className='dark:!bg-white dark:!text-black'
                      >
                        <Label
                          htmlFor='-'
                          value='Apellido'
                          className='text-lg font-semibold mr-2 my-1'
                        />
                      </Tooltip>
                    </div>
                    <input
                      id='-'
                      name='-'
                      required
                      autoComplete='off'
                      className='border-2 rounded-md my-2 resize-none'
                      maxLength='255'
                    />

                  </div>
                </div>

                <div className='flex flex-row items-center'>
                  <Tooltip
                    content='-'
                    trigger='hover'
                    className='dark:!bg-white dark:!text-black'
                  >
                    <Label
                      htmlFor='-'
                      value='Email'
                      className='text-lg font-semibold mr-2 my-1'
                    />
                  </Tooltip>
                </div>
                <input
                  id='-'
                  name='-'
                  required
                  autoComplete='off'
                  className='border-2 rounded-md my-2 resize-none'
                  maxLength='255'
                />
                <div className='flex flex-row items-center'>
                  <Tooltip
                    content='-'
                    trigger='hover'
                    className='dark:!bg-white dark:!text-black'
                  >
                    <Label
                      htmlFor='-'
                      value='Teléfono'
                      className='text-lg font-semibold mr-2 my-1'
                    />
                  </Tooltip>
                </div>
                <input
                  id='-'
                  name='-'
                  required
                  autoComplete='off'
                  className='border-2 rounded-md my-2 resize-none'
                  maxLength='255'
                />
                <div className='flex flex-row'>
                  <div className='col mr-9'>
                    <div className='flex flex-row'>
                      <Tooltip
                        content='-'
                        trigger='hover'
                        className='dark:!bg-white dark:!text-black'
                      >
                        <Label
                          htmlFor='-'
                          value='Rol'
                          className='align-bottom mr-2 my-1 text-lg font-semibold'
                        />
                      </Tooltip>
                    </div>
                    <Select
                      id='-'
                      name='-'
                      required
                      className='rounded-md my-2'
                    >
                      <option value='' selected> -- Selecciona una opción --</option>
                    </Select>
                  </div>
                  <div className='col'>
                    <div className='flex flex-row'>
                      <Tooltip
                        content='-'
                        trigger='hover'
                        className='dark:!bg-white dark:!text-black'
                      >
                        <Label
                          htmlFor='-'
                          value='Zona'
                          className='align-bottom mr-2 my-1 text-lg font-semibold'
                        />
                      </Tooltip>
                    </div>
                    <Select
                      id='-'
                      name='-'
                      required
                      className='rounded-md my-2'
                    >
                      <option value='' selected> -- Selecciona una opción --</option>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className='bg-blues-200 text-white font-semibold py-2 px-4 rounded-md dark:hover:text-trademark-50'
              title='Create'
              type='submit'
            >
              Crear
            </button>
            <a
              className='bg-gray-500 text-white py-2 px-4 rounded-md cursor-pointer font-semibold dark:hover:text-trademark-50'
              onClick={onClose}
              href={onClose}
            >
              Cancelar
            </a>
          </ModalFooter>
        </form>

      </Modal>
    </>
  )
  return content
}

export default UserAdd
