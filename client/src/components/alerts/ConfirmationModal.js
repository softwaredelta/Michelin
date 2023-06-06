import { Button, Modal } from 'flowbite-react'
import { ModalBody } from 'flowbite-react/lib/esm/components/Modal/ModalBody'
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const ConfirmationModal = ({ show, onClose, text, method }) => {
  const content = (
    <>
      <Modal show={show} size='md' popup onClose={onClose} dismissible>
        <ModalHeader />
        <ModalBody>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              {text}
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={method}>
                Confirmar
              </Button>
              <Button className='!bg-gray-500' onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
  return content
}

export default ConfirmationModal
