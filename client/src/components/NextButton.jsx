import { FaPlay } from 'react-icons/fa'

const NextButton = ({ method }) => {
  return (
    <>
      <button
        onClick={method}
        className=' w-full bg-white !text-blues-300 !font-bold py-2 pl-3 rounded-2xl shadow-lg'
      >
        <div className='flex flex-row'>
          Siguiente
          <FaPlay className='ml-4 mt-1' />
        </div>
      </button>
    </>
  )
}

export default NextButton
