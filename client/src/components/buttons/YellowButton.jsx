import { Button } from 'flowbite-react'

const YellowButton = ({ myText, method }) => {
  return (
    <Button
      onClick={method}
      className='w-full mt-4 py-0 px-5 text-3xl shadow-lg !bg-trademark-50 !text-blues-200 !font-bold !rounded-full hover:!bg-yellow-500 '
    >
      {myText}
    </Button>
  )
}

export default YellowButton
