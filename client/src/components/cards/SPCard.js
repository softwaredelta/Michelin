import { Card } from 'flowbite-react'
import { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import SvgButton from '../buttons/SvgButton'
import { FiMoreHorizontal } from 'react-icons/fi'
import { FaEdit } from 'react-icons/fa'
import { BsFillTrashFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { selectSPById, useDeleteSPMutation } from '../../services/sellingPointApiSlice'
import Toast from '../alerts/Toast'
import ConfirmationModal from '../alerts/ConfirmationModal'
import SellingPointEdit from '../../features/sellingPoint/SellingPointEdit'

const SPCard = ({ spId }) => {
  const sp = useSelector(state => selectSPById(state, spId))

  const img = '/images/' + sp.category + '.jpg'
  const confirmationText = '¿Estás seguro que deseas eliminar el Punto de Venta?'

  const [DeleteSP] = useDeleteSPMutation()

  const [flip, setFlip] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const handleSetFlip = () => {
    setFlip(!flip)
  }

  const handleSetShowEdit = () => {
    setShowEdit(true)
  }

  const handleSetShowDelete = () => {
    setShowDelete(true)
  }

  const handleCloseEdit = () => {
    setShowEdit(false)
  }

  const handleCloseDelete = () => {
    setShowDelete(false)
  }

  const onDeleteSPClicked = async (e) => {
    e.preventDefault()
    await DeleteSP({ spId })
    handleCloseDelete()

    Toast.fire({
      icon: 'success',
      title: 'Se ha eliminado un punto de venta'
    })
  }

  const content = (
    <div className='w-72 h-72 my-4 mx-6 flex flex-col'>
      <ReactCardFlip
        isFlipped={flip}
        flipDirection='horizontal'
        className='min-w-full min-h-full !rounded-xl'
      >
        <Card
          imgSrc={img}
          className='!bg-gradient-to-b from-blues-150 to-blues-300 h-72 !rounded-xl !border-2 cursor-pointer'
          onClick={handleSetFlip}
        >
          <div className='flex row justify-between'>
            <div className='flex-col mr-2'>
              <h5 className='text-2xl font-bold tracking-tight text-white dark:text-white truncate'>
                {sp.name}
              </h5>
            </div>
            <div className='flex col ml-2 mt-1'>
              <SvgButton
                svgfile={<FiMoreHorizontal color='white' />}
                className='hover:!fill-gray-500'
              />
            </div>
          </div>
        </Card>

        <Card
          className='h-72 !rounded-xl cursor-pointer dark:!bg-gradient-to-b dark:from-blues-150 dark:to-blues-300'
          onClick={() => setFlip(!flip)}
        >
          <div className>
            <div className='flex flex-row justify-center mb-1'>
              <div className='border-b py-2 min-w-full text-center'>
                <h3
                  className='text-xl font-bold tracking-tight text-blues-300 dark:text-white truncate overflow-hidden'
                  maxlength='10'
                >
                  {sp.name}
                </h3>
              </div>
            </div>
            <div className='flex flex-col my-2'>
              <div className='flex-col'>
                <h2 className='text-md font-bold tracking-tight text-blues-300 dark:text-white'>
                  Zona:
                </h2>
              </div>
              <div className='flex-col'>
                <p className='text-md font-medium tracking-tight text-blues-300 dark:text-white'>
                  {sp.zone}
                </p>
              </div>
            </div>

            <div className='flex flex-col my-2'>
              <div className='flex-col min-w-0'>
                <h2 className='text-md font-bold tracking-tight text-blues-300 dark:text-white'>
                  Dirección:
                </h2>
              </div>
              <div className='flex-col'>
                <p className='text-md font-medium tracking-tight text-blues-300 dark:text-white truncate block'>
                  {sp.address}
                </p>
              </div>
            </div>

            <div className='flex flex-col my-2'>
              <div className='flex-col'>
                <h2 className='text-md font-bold tracking-tight text-blues-300 dark:text-white'>
                  Teléfono:
                </h2>
              </div>
              <div className='flex-col'>
                <p className='text-md font-medium tracking-tight text-blues-300 dark:text-white'>
                  {sp.phone}
                </p>
              </div>
            </div>
            <div className='flex justify-end'>
              <div className='flex-col'>
                <SvgButton
                  svgfile={
                    <FaEdit
                      color='#1d4089'
                      className='dark:fill-white dark:hover:!fill-trademark-50 hover:!fill-gray-500'
                    />
                  }
                  method={handleSetShowEdit}
                />
              </div>
              <div className='flex-col'>
                <SvgButton
                  svgfile={
                    <BsFillTrashFill
                      color='#1d4089'
                      className='dark:fill-white dark:hover:!fill-trademark-50 hover:!fill-gray-500'
                    />
                  }
                  method={handleSetShowDelete}
                />
              </div>
            </div>
          </div>
        </Card>
      </ReactCardFlip>
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
export default SPCard
