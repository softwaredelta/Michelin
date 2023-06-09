import { Card } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { selectSPById } from './sellingPointApiSlice'

const SellingPointOption = ({ spId }) => {
  const sp = useSelector((state) => selectSPById(state, spId))

  const content = (
    <div className='w-min-full mx-10 mb-4 items-center'>
      <Card className='m-auto w-10/12'>
        <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
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
