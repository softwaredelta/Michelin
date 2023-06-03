
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody'
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter'
import { Label, Select, Modal } from 'flowbite-react'
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

/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */
// M1_H1
const UserAdd = ({ show, onClose }) => {
  const { register, getValues, reset } = useForm()

  const navigate = useNavigate()

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

  const {
    data: managers,
    isSuccess: isSuccessManager,
    isError: isErrorManager
  } = useGetManagersQuery()

  const {
    data: state,
    isSuccess: isSuccessState,
    isError: isErrorState
  } = useGetStateQuery()

  let role
  let manager
  let myState

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
        <AreaOption key={idManager} areaId={idManager} areaTitle={`${entities[idManager].name} ${entities[idManager].last_name}`} />
      ))
      : null

    manager = listContent
  }

  useEffect(() => {
    if (isError) {
      Toast.fire({
        icon: 'error',
        title: 'El usuario ya existe o se produjo un error'
      })
    }

    if (isSuccessUser) {
      Toast.fire({
        icon: 'success',
        title: 'Se creó un nuevo usuario'
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
                  <div className='flex-col mr-9'>
                    <div className='flex flex-row items-center'>
                      <Label
                        htmlFor='name'
                        value='Nombre'
                        className='text-lg font-semibold mr-2 my-1'
                      />
                    </div>
                    <input
                      id='name'
                      name='name'
                      {...register('name')}
                      required
                      autoComplete='off'
                      className='border-2 rounded-md my-2 resize-none dark:bg-transparent dark:text-white p-2'
                      maxLength='255'
                    />
                  </div>
                  <div className='flex-col w-full'>
                    <div className='flex flex-row items-center'>
                      <Label
                        htmlFor='lastName'
                        value='Apellidos'
                        className='text-lg font-semibold mr-2 my-1'
                      />
                    </div>
                    <input
                      id='lastName'
                      name='lastName'
                      {...register('lastName')}
                      required
                      autoComplete='off'
                      className='border-2 rounded-md my-2 resize-none dark:bg-transparent dark:text-white p-2'
                      maxLength='255'
                    />
                  </div>
                </div>
                <div className='flex flex-row items-center'>
                  <Label
                    htmlFor='mail'
                    value='Correo Electrónico'
                    className='text-lg font-semibold mr-2 my-1'
                  />
                </div>
                <input
                  id='mail'
                  name='mail'
                  {...register('mail')}
                  required
                  autoComplete='off'
                  className='border-2 rounded-md my-2 resize-none dark:bg-transparent dark:text-white p-2'
                  maxLength='255'
                  type='email'
                />
                <div className='flex flex-row items-center'>
                  <Label
                    htmlFor='idManager'
                    value='Mánager asignado'
                    className='text-lg font-semibold mr-2 my-1'
                  />
                </div>
                <Select
                  id='idManager'
                  name='idManager'
                  required
                  className='rounded-md my-2 dark:border-2'
                  {...register('idManager')}
                >
                  <option value='' selected>
                    {' '}
                    Selecciona una opción
                  </option>
                  <option value={0}> Sin manager</option>
                  {manager}
                </Select>
                <div className='flex flex-row'>
                  <div className='col mr-9'>
                    <div className='flex flex-row'>
                      <Label
                        htmlFor='role'
                        value='Rol'
                        className='align-bottom mr-2 my-1 text-lg font-semibold'
                      />
                    </div>
                    <Select
                      id='role'
                      name='role'
                      required
                      {...register('role')}
                      className='rounded-md my-2 dark:border-2'
                    >
                      <option value='' selected>
                        {' '}
                        Selecciona una opción
                      </option>
                      {role}
                    </Select>
                  </div>
                  <div className='col'>
                    <div className='flex flex-row'>
                      <Label
                        htmlFor='state'
                        value='Zona'
                        className='align-bottom mr-2 my-1 text-lg font-semibold'
                      />
                    </div>
                    <Select
                      id='state'
                      name='state'
                      required
                      className='rounded-md my-2 dark:border-2'
                      {...register('state')}
                    >
                      <option value='' selected>
                        Selecciona una opción
                      </option>
                      {myState}
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className='justify-end'>
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
