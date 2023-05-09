
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody'
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter'
import { Tooltip, Label, Select, Modal } from 'flowbite-react'
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader'
import { useAddNewUserMutation, useGetRolesQuery, useGetManagersQuery } from './usersApiSlice'
import { useForm } from 'react-hook-form'
import Toast from '../../components/Toast'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useGetStateQuery } from '../sellingPoint/state/stateApiSlice'
import StatesOption from './managers/StatesOption'
import AreaOption from '../category/questions/AreaOption'
import Swal from 'sweetalert2'

const UserAdd = ({ show, onClose }) => {
  const [addNewUser, {
    isSuccess: isSuccessUser,
    isError,
    error
  }] = useAddNewUserMutation()

  const {
    data: roles,
    isSuccess: isSuccessRole,
    isError: isErrorRole
  } = useGetRolesQuery()
  let role

  const {
    data: managers,
    isSuccess: isSuccessManager,
    isError: isErrorManager
  } = useGetManagersQuery()
  let manager

  const {
    data: state,
    isSuccess: isSuccessState,
    isError: isErrorState
  } = useGetStateQuery()

  if (isErrorRole) {
    role = <option disabled selected value=''> Sin opciones válidas </option>
  }

  if (isSuccessRole) {
    const { ids, entities } = roles
    const listContent = ids?.length
      ? ids.map((idRole) => (
        <AreaOption key={idRole} areaId={idRole} areaTitle={entities[idRole].name} />
      ))
      : null
    role = listContent
  }

  let myState

  if (isErrorState) {
    myState = <option disabled> Sin opciones válidas </option>
  }

  if (isSuccessState) {
    const { ids } = state

    const listContent = ids?.length
      ? ids.map((idState) => <StatesOption key={idState} zoneId={idState} />)
      : null

    myState = listContent
  }

  if (isErrorManager) {
    manager = <option disabled selected value=''> Sin opciones válidas </option>
  }

  if (isSuccessManager) {
    const { ids, entities } = managers
    const listContent = ids?.length
      ? ids.map((idManager) => (
        <AreaOption key={idManager} areaId={idManager} areaTitle={entities[idManager].name} />
      ))
      : null
    manager = listContent
  }

  const { register, getValues, reset } = useForm()

  const navigate = useNavigate()

  const random = (length = 8) => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$%*¿?@-_'
    let str = ''
    for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return str
  }

  const password = random()

  const onCreateUserClicked = async (e) => {
    e.preventDefault()
    const name = getValues('name')
    const lastName = getValues('lastName')
    const idManager = getValues('idManager')
    const mail = getValues('mail')
    const role = getValues('role')
    const state = getValues('state')
    onClose()
    Swal.fire({
      title: 'Contraseña',
      text: 'Esta es la contraseña para este usuario ' + password,
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        addNewUser({ name, lastName, idManager, mail, password, role, state })
      }
    })
  }

  useEffect(() => {
    if (isError) {
      Toast.fire({
        icon: 'error',
        title: 'Se produjo un error'
      })
    }
    
    if (isSuccessUser) {
      Toast.fire({
        icon: 'success',
        title: 'Se creo una nuevo usuario'
      })
      reset()
    }
  }, [isSuccessUser, isError, error, reset, navigate])

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
        <form onSubmit={onCreateUserClicked}>
          <ModalBody>
            <div className='flex justify-center'>
              <div className='flex flex-col w-3/4'>
                <div className=' flex flex-row'>
                  <div className='col mr-9'>
                    <div className='flex flex-row items-center'>
                      <Tooltip
                        content='Nombre del nuevo Usuario'
                        trigger='hover'
                        className='dark:!bg-white dark:!text-black'
                      >
                        <Label
                          htmlFor='name'
                          value='Nombre'
                          className='text-lg font-semibold mr-2 my-1'
                        />
                      </Tooltip>
                    </div>
                    <input
                      id='name'
                      name='name'
                      {...register('name')}
                      required
                      autoComplete='off'
                      className='border-2 rounded-md my-2 resize-none'
                      maxLength='255'
                    />
                  </div>
                  <div className='col'>
                    <div className='flex flex-row items-center'>
                      <Tooltip
                        content='Apellidos del Usuario'
                        trigger='hover'
                        className='dark:!bg-white dark:!text-black'
                      >
                        <Label
                          htmlFor='lastName'
                          value='Apellidos'
                          className='text-lg font-semibold mr-2 my-1'
                        />
                      </Tooltip>
                    </div>
                    <input
                      id='lastName'
                      name='lastName'
                      {...register('lastName')}
                      required
                      autoComplete='off'
                      className='border-2 rounded-md my-2 resize-none'
                      maxLength='255'
                    />
                  </div>
                </div>
                <div className='flex flex-row items-center'>
                  <Tooltip
                    content='Correo Electronico'
                    trigger='hover'
                    className='dark:!bg-white dark:!text-black'
                  >
                    <Label
                      htmlFor='mail'
                      value='Correo Electronico'
                      className='text-lg font-semibold mr-2 my-1'
                    />
                  </Tooltip>
                </div>
                <input
                  id='mail'
                  name='mail'
                  {...register('mail')}
                  required
                  autoComplete='off'
                  className='border-2 rounded-md my-2 resize-none'
                  maxLength='255'
                />
                <div className='flex flex-row items-center'>
                  <Tooltip
                    content='Manager Asignado'
                    trigger='hover'
                    className='dark:!bg-white dark:!text-black'
                  >
                    <Label
                      htmlFor='idManager'
                      value='Manager asignado'
                      className='text-lg font-semibold mr-2 my-1'
                    />
                  </Tooltip>
                </div>
                <Select
                  id='idManager'
                  name='idManager'
                  required
                  className='rounded-md my-2'
                  {...register('idManager')}
                >
                  <option value='' selected> -- Selecciona una opción --</option>
                  <option value={0}> Sin manager</option>
                  {manager}
                </Select>
                <div className='flex flex-row'>
                  <div className='col mr-9'>
                    <div className='flex flex-row'>
                      <Tooltip
                        content='Rol del usuario '
                        trigger='hover'
                        className='dark:!bg-white dark:!text-black'
                      >
                        <Label
                          htmlFor='role'
                          value='Rol'
                          className='align-bottom mr-2 my-1 text-lg font-semibold'
                        />
                      </Tooltip>
                    </div>
                    <Select
                      id='role'
                      name='role'
                      required
                      {...register('role')}
                      className='rounded-md my-2'
                    >
                      <option value='' selected> -- Selecciona una opción --</option>
                      {role}
                    </Select>
                  </div>
                  <div className='col'>
                    <div className='flex flex-row'>
                      <Tooltip
                        content='Estados de la republica'
                        trigger='hover'
                        className='dark:!bg-white dark:!text-black'
                      >
                        <Label
                          htmlFor='state'
                          value='Zona'
                          className='align-bottom mr-2 my-1 text-lg font-semibold'
                        />
                      </Tooltip>
                    </div>
                    <Select
                      multiple
                      id='state'
                      name='state'
                      required
                      className='rounded-md my-2'
                      {...register('state')}
                    >
                      <option value='' selected> -- Selecciona una opción --</option>
                      {myState}
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
