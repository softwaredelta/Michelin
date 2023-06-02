import { Button } from 'flowbite-react'
import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent'
import { BsFillTrashFill, BsDice5 } from 'react-icons/bs'
import { MdModeEditOutline } from 'react-icons/md'
import { useSelector } from 'react-redux'
import {
  selectUserById,
  useEditUserMutation,
  useNewUserPasswordMutation,
  useDeleteUserMutation
} from './usersApiSlice'
import { useGetStatesByUserQuery } from '../sellingPoint/state/stateApiSlice'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Toast from '../../components/Toast'
import { useForm } from 'react-hook-form'
import MultipleCheckbox from '../../components/MultipleCheckbox'
import ConfirmationModal from '../../components/ConfirmationModal'
/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */
const UserOverview = ({ userId }) => {
  const { register, getValues } = useForm()

  const user = useSelector((state) => selectUserById(state, userId))

  const [editUser, { isSuccess: isSuccessEdit, isError: isErrorEdit }] =
    useEditUserMutation()

  const [newPassword, { isError: isErrorPassword }] =
    useNewUserPasswordMutation()

  const {
    data: stateData,
    isSuccess: isSuccessStates,
    isError: isErrorStates
  } = useGetStatesByUserQuery({
    idUser: userId
  })

  let myStates
  let [stateList] = useState(stateData)

  const [showDelete, setShowDelete] = useState(false)

  const confirmationText = '¿Estás seguro que deseas eliminar el usuario'

  const handleInputChange = (e) => {
    const auxList = JSON.parse(JSON.stringify(stateList))
    auxList.entities[e.target.id].id_user === null
      ? (auxList.entities[e.target.id].id_user = userId)
      : (auxList.entities[e.target.id].id_user = null)
    stateList = auxList
    e.target.checked()
    e.target.value()
  }
  // M1_H2
  const onEditUserClicked = async (e) => {
    e.preventDefault()

    let count = 0
    const name = getValues('name')
    const lastName = getValues('lastName')
    const idUser = userId
    const states = stateList

    for (const myState in stateList.entities) {
      if (stateList.entities[myState].id_user === user.id) {
        count += 1
      }
    }
    if (count !== 0) {
      await editUser({
        name,
        lastName,
        idUser,
        states
      })
    } else {
      Toast.fire({
        icon: 'error',
        title:
          'No se pudo guardar el usuario ' +
          name +
          ' ' +
          lastName +
          ' verifica tus campos'
      })
    }
  }

  const onGeneratePasswordClicked = async (e) => {
    e.preventDefault()
    const password = (length = 8) => {
      const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$%*¿?@-_'
      let str = ''
      for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length))
      }

      return str
    }

    const myNewPassword = password()
    await newPassword({
      idUser: userId,
      newPassword: myNewPassword
    })

    Swal.fire({
      title: 'Contraseña',
      text: 'Esta es la nueva contraseña para este usuario ' + myNewPassword,
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    })
  }

  // M1_H3
  const [deleteUser, { isSuccess: isSuccessDelete }] =
    useDeleteUserMutation()

  const deleteU = async (idU) => {
    await deleteUser([{ idUser: idU }])
  }

  const handleSetShowDelete = () => {
    setShowDelete(true)
  }

  const handleCloseDelete = () => {
    setShowDelete(false)
  }

  if (isErrorStates) {
    myStates = <option disabled> Sin opciones válidas </option>
  }

  if (isSuccessStates) {
    const { ids, entities } = stateData

    const listContent = ids?.length
      ? ids.map((idState) => (
        <MultipleCheckbox
          key={idState}
          idElement={idState}
          myValue={entities[idState].id_user !== null ? 1 : 0}
          myOnChange={handleInputChange}
          myName={entities[idState].name}
        />
      ))
      : null

    myStates = listContent
  }

  useEffect(() => {
    stateList = stateData; // eslint-disable-line
  })

  useEffect(() => {
    if (isErrorEdit) {
      Toast.fire({
        icon: 'error',
        title: 'Se produjo un error'
      })
    }
    if (isSuccessEdit) {
      Toast.fire({
        icon: 'success',
        title: 'Se guardó el usuario con éxito'
      })
      if (isErrorPassword) {
        Toast.fire({
          icon: 'error',
          title: 'No se pudo generar nueva contraseña'
        })
      }
    }
    if (isSuccessDelete) {
      Toast.fire({
        icon: 'success',
        title: 'El usuario fue borrado con éxito'
      })
    }
  }, [isSuccessEdit, isErrorEdit, isErrorPassword, isSuccessDelete])

  const content = (
    <>
      <AccordionContent className='h-60 !bg-white dark:!bg-blues-500'>
        <form onSubmit={onEditUserClicked}>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <div className='flex flex-row'>
                <div className='flex flex-col mx-5'>
                  <div className='flex flex-row my-2 font-semibold dark:!text-white p-1'>
                    Nombre
                  </div>
                  <div className='flex flex-row my-2 font-semibold dark:!text-white p-1'>
                    Apellido
                  </div>
                  <div className='flex flex-row my-2 font-semibold dark:!text-white p-1'>
                    Correo
                  </div>
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-row my-2'>
                    <input
                      className='border rounded-md dark:bg-transparent dark:text-white p-1'
                      defaultValue={user.name}
                      id='name'
                      {...register('name')}
                      required
                    />
                  </div>
                  <div className='flex flex-row my-2'>
                    <input
                      className='border rounded-md dark:bg-transparent dark:text-white p-1'
                      defaultValue={user.last_name}
                      id='lastName'
                      {...register('lastName')}
                      required
                    />
                  </div>
                  <div className='flex flex-row my-2'>
                    <input
                      className='border rounded-md dark:bg-transparent dark:text-white p-1'
                      disabled
                      defaultValue={user.mail}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='flex flew-row'>
                <div className='flex flex-col font-semibold mx-5 dark:!text-white p-1 my-1 text-l'>
                  Zona
                </div>
                <div className='flex flex-col h-36 border overflow-y-scroll rounded-lg'>
                  <div className='flex flex-row text-sm px-3 pb-2 pt-1 dark:!text-white'>
                    Selecciona una o más opciones
                  </div>
                  {myStates}
                </div>
              </div>
            </div>
            <div className='flex flex-col mx-10'>
              <div className='flex flex-col font-semibold dark:!text-white text-center'>
                Generar nueva contraseña
              </div>
              <div className='flex flex-col my-2'>
                <Button
                  className='w-5/6 self-center !border-blues-200 !bg-white !text-blues-200 dark:!bg-blues-200 dark:!text-white'
                  onClick={onGeneratePasswordClicked}
                >
                  <BsDice5 className='mx-1' />
                  Generar
                </Button>
              </div>
            </div>
          </div>
          <div className=' flex flex-row justify-end my-2'>
            <Button
              className='!bg-zinc-500 dark:!bg-blues-200 hover:!bg-gray-500 dark:hover:!bg-blue-500 mx-4'
              type='submit'
            >
              <MdModeEditOutline className='mx-2' /> Guardar
            </Button>
            <Button className='!bg-white dark:!bg-zinc-500 dark:hover:!bg-zinc-700 dark:hover:!border-zinc-700 dark:text-white text-zinc-500 border-zinc-500' onClick={handleSetShowDelete}>
              <BsFillTrashFill className='mx-2' /> Eliminar
            </Button>
          </div>
        </form>
      </AccordionContent>
      <ConfirmationModal
        show={showDelete}
        onClose={handleCloseDelete}
        text={confirmationText}
        method={() => deleteU(userId)}
      />
    </>
  )
  return content
}

export default UserOverview
