import { Button } from 'flowbite-react'

const Bluebutton = ({ myText, method }) => {
  return (<Button onClick={method} className='!font-bold !bg-blues-200 !mb-5 dark:!bg-blues-300 dark:hover:!text-trademark-50 dark:hover:!bg-blues-300 hover:!bg-blue-900'>{myText}</Button>)
}

export default Bluebutton
