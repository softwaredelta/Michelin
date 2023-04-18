import { Button } from 'flowbite-react'

const Bluebutton = ({ myText, method }) => {
  return (<Button onClick={method} className='!font-bold !bg-blues-200 !mb-5'>{myText}</Button>)
}

export default Bluebutton
