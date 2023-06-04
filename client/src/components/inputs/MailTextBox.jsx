import { useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'

const MailTextBox = ({ onClickAdd }) => {
  const [mail, setMail] = useState('')

  const content = (
    <>
      <div className='mb-6 w-fit'>
        <div className='pt-2 text-lg flex items-stretch w-full'>
          <input
            className='rounded-lg bg-neutral-100 text-md h-10 w-4/5 pl-2 dark:!text-black resize-none'
            placeholder='ejemplo@ejemplo.com'
            type='mail'
            id='mail'
            value={mail}
            onChange={e => setMail(e.target.value)}
            maxLength={50}
          />
          <button className='ml-3 bg-blues-200 py-2 px-3 rounded-md' onClick={e => onClickAdd(mail)}>
            <BsPlusLg size={25} className='fill-white ' />
          </button>
        </div>
      </div>
    </>
  )
  return content
}

export default MailTextBox
