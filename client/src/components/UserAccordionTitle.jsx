import SvgButton from "./SvgButton"
import { BsFillTrashFill } from 'react-icons/bs'
import ConfirmationModal from "./ConfirmationModal"
import Toast from "./Toast"
import { useEffect, useState } from 'react'
import { useDeleteUserMutation } from "../features/users/usersApiSlice"


const UserAccordionTitle = ({ idUser,role, name, zone, reports, manager }) => {
  
  const [deleteUser, { isSuccess: isSuccessDelete }] =
    useDeleteUserMutation()

  const deleteU = async (idU) => {
    await deleteUser([{ idUser: idU}])
  }

  const [showDelete, setShowDelete] = useState(false)

  const handleSetShowDelete = () => {
    setShowDelete(true)
  }

  const handleCloseDelete = () => {
    setShowDelete(false)
  }

  const confirmationText = '¿Estás seguro que deseas eliminar el usuario'

  useEffect(() => {
    if (isSuccessDelete) {
      Toast.fire({
        icon: 'success',
        title: 'El usuario fue borrado con éxito'
      })
    }
  }, [isSuccessDelete])

  return (
    <>
      <div className='flex flex-row'>
        <div className='grid grid-cols-5 gap-20 w-full'>
          <div className='text text-center w-28 break-words'> {role} </div>
          <div className='text text-center w-28 break-words'> {name} </div>
          <div className='text text-center w-28 break-words'> {zone} </div>
          <div className='text text-center w-28 break-words'> {reports} </div>
          <div className='text text-center w-28 break-words mr-10'> {manager} </div>
          <SvgButton
            svgfile={<BsFillTrashFill className='fill-blues-150' />}
            method={handleSetShowDelete}
          />
        </div>
      </div>
      <ConfirmationModal
        show={showDelete}
        onClose={handleCloseDelete}
        text={confirmationText}
        method={() => deleteU(idUser)}
      />
    </>
  )
}

export default UserAccordionTitle
