import { Card } from 'flowbite-react'
import { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import SvgButton from '../../components/SvgButton'
import { FiMoreHorizontal } from 'react-icons/fi'
import { FaEdit } from 'react-icons/fa'
import { BsFillTrashFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { selectSPById } from './sellingPointApiSlice'

const SellingPoint = ({ spId }) => {
  const [flip, setFlip] = useState(false);
  const sp = useSelector(state => selectSPById(state, spId));

  const handleSetFlip = () => {
    setFlip(!flip);
  }

  return (
    <div className='w-72 h-72 my-4 mx-6 flex flex-col'>
      <ReactCardFlip
        isFlipped={flip}
        flipDirection='horizontal'
        className='min-w-full min-h-full !rounded-xl'
      >
        <Card
          imgSrc='https://cdn-prod-eu.yepgarage.info/upload/llantas-del-lago/fitters/llantas-de-lago-norte-1-lg.png?005111932'
          className='!bg-blues-300 h-72 !rounded-xl !border-2'
        >
          <div className='flex row justify-between'>
            <div className='flex-col mr-2'>
              <h5 className='text-2xl font-bold tracking-tight text-white dark:text-white'>
                {sp.name}
              </h5>
            </div>
            <div className='flex col ml-2 mt-1'>
              <SvgButton
                svgfile={<FiMoreHorizontal color='white' />}
                method={handleSetFlip}
              />
            </div>
          </div>
        </Card>

        <Card className='h-72 !rounded-xl cursor-pointer' onClick={() => setFlip(!flip)}>
          <div className='flex flex-row justify-center'>
            <h3 className='text-xl font-bold tracking-tight text-blues-300 dark:text-white'>
              {sp.name}
            </h3>
          </div>
          <div className='flex flex-col my-0'>
            <div className='flex-col'>
              <h2 className='text-lg font-bold tracking-tight text-blues-300 dark:text-white'>
                Zona:
              </h2>
            </div>
            <div className='flex-col'>
              <p className='text-md font-medium tracking-tight text-blues-300 dark:text-white'>
                {sp.zone}
              </p>
            </div>
          </div>

          <div className='flex flex-col my-0'>
            <div className='flex-col min-w-0'>
              <h2 className='text-lg font-bold tracking-tight text-blues-300 dark:text-white'>
                Dirección:
              </h2>
            </div>
            <div className='flex-col'>
              <p className='text-md font-medium tracking-tight text-blues-300 dark:text-white truncate block'>
                {sp.address}
              </p>
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='flex-col'>
              <h2 className='text-lg font-bold tracking-tight text-blues-300 dark:text-white'>
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
                svgfile={<FaEdit color='#1d4089' />}
                method={handleSetFlip}
              />
            </div>
            <div className='flex-col'>
              <SvgButton
                svgfile={<BsFillTrashFill color='#1d4089' />}
                method={handleSetFlip}
              />
            </div>
          </div>
        </Card>
      </ReactCardFlip>
    </div>
  )
}

export default SellingPoint
