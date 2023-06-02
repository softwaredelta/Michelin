import { FaPlay } from 'react-icons/fa'

const PreviousButton = ({ onClicked }) => {
  return (
    <>
      <button
        onClick={onClicked}
        className=' w-full bg-white !text-blues-300 !font-bold py-2 pl-3 rounded-2xl shadow-lg'
      >
        <div className='flex flex-row'>
          <FaPlay
            className='mr-4 mt-1'
            style={{ transform: 'rotate(180deg)' }}
          />
          Anterior
        </div>
      </button>
    </>
  )
}

export default PreviousButton

// BiSolidRightArrow
// BiSolidLeftArrow
