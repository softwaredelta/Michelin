import { useState } from 'react'
import ConfirmationModal from '../../components/alerts/ConfirmationModal'
import { useDeleteSPMutation } from '../../services/sellingPointApiSlice'
import SellingPointEdit from './SellingPointEdit'
import Toast from '../../components/alerts/Toast'
import SPCard from '../../components/cards/SPCard'

/* https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 * Historia de Usuario M2_H2
 */

const SellingPoint = ({ spId }) => {
  const confirmationText = '¿Estás seguro que deseas eliminar el Punto de Venta?'

  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const [DeleteSP] = useDeleteSPMutation()

  const onDeleteSPClicked = async (e) => {
    e.preventDefault()
    await DeleteSP({ spId })
    handleCloseDelete()

    Toast.fire({
      icon: 'success',
      title: 'Se ha eliminado un punto de venta'
    })
  }

  const handleCloseEdit = () => {
    setShowEdit(false)
  }

  const handleCloseDelete = () => {
    setShowDelete(false)
  }

  const content = (
    <div className='w-72 h-72 my-4 mx-6 flex flex-col'>
      <SPCard spId={spId} />
      <ConfirmationModal
        show={showDelete}
        onClose={handleCloseDelete}
        text={confirmationText}
        method={onDeleteSPClicked}
      />
      <SellingPointEdit show={showEdit} onClose={handleCloseEdit} spId={spId} />
    </div>
  )
  return content
}

export default SellingPoint
