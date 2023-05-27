import { Card } from 'flowbite-react'
import { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import SvgButton from '../../components/SvgButton'
import { FiMoreHorizontal } from 'react-icons/fi'
import { FaEdit } from 'react-icons/fa'
import { BsFillTrashFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import ConfirmationModal from '../../components/ConfirmationModal'
import { selectSPById, useDeleteSPMutation } from './sellingPointApiSlice'
import SellingPointEdit from './SellingPointEdit'
import Toast from '../../components/Toast'

const SellingPointOption = ({ spId }) => {
  const sp = useSelector((state) => selectSPById(state, spId))

  const img = '/images/' + sp.category + '.jpg'

  const content = (
    <div className='w-min-full mx-10 mb-4 items-center'>
        <Card className='m-auto w-10/12'>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>
                    {sp.name}
                </p>
            </h5>
        </Card>
    </div>
  )
  return content
}

export default SellingPointOption