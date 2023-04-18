import { Modal } from "flowbite-react";
import { ModalHeader } from "flowbite-react";
const ModifiedModal = ({open, onSetClose}) => {
  return (
    <Modal show={open} onClose={onSetClose}>
      <ModalHeader>
        <div className="flex">
                  <div className="flex flex-col">Nombre: </div>
                  <div className="flex flex-col"> <input/> </div>
        </div>
      </ModalHeader>
    </Modal>
  );
};

export default ModifiedModal;
