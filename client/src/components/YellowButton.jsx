import { Button } from 'flowbite-react'

const Bluebutton = ({ myText, method }) => {
  return (
    <Button
      onClick={method}
      className='mt-4 px-5 text-3xl shadow-xl !bg-trademark-50 !text-blues-200 !font-bold !rounded-full hover:!bg-yellow-500 dark:!bg-blues-300 dark:!text-trademark-50 dark:hover:!bg-blue-950 dark:hover:!text-yellow-500'
    >
      {myText}
    </Button>
  )
}

export default Bluebutton
