import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../alerts/ConfirmationModal'
import { useState } from 'react'
const SectionBanner = ({ myText }) => {
  const navigate = useNavigate()

  const [show, setShow] = useState(false)

  const handleSetShow = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  const ReturnHome = () => {
    navigate('/form')
  }
  return (
    <>
      <ConfirmationModal show={show} onClose={handleClose} text='¿Seguro que quieres regresar a seleccionar punto de venta?' method={ReturnHome} />
      <div
        class='absolute top-6 2xl:w-1/4 xl:w-1/3 iPadAir:w-2/5 lg:w-5/12 h-0
        border-l-[100px] border-l-trademark-50
        border-t-[65px] border-t-trademark-50
        border-r-[50px] border-r-transparent'
      />

      <div className='absolute top-10 left-20 text-3xl text-blues-300 font-michelin'>{myText}</div>

      <FaHome onClick={handleSetShow} className='fill-trademark-50 cursor-pointer border-8 border-blues-300 rounded-full bg-blues-300 absolute top-9 left-6' size={40} />

    </>
  )
}

export default SectionBanner
