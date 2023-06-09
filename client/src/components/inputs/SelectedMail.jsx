import { Badge } from 'flowbite-react'
import { RxCrossCircled } from 'react-icons/rx'

const SelectedMail = ({ mail, onClickDelete }) => {
  const content = (
    <>
      <div className='mb-6 w-fit'>
        <Badge color='gray' className='rounded-full' icon={null}>
          <div className='p-2 text-lg flex items-stretch'>
            <div className='mr-2 m-auto mb-0.5'>
              {mail}
            </div>
            <div className='m-auto'>
              <RxCrossCircled size={25} id={mail} onClick={onClickDelete} className='cursor-pointer' />
            </div>
          </div>
        </Badge>
      </div>
    </>
  )
  return content
}

export default SelectedMail
