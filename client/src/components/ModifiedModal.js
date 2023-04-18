import { Modal } from "flowbite-react";
import { ModalHeader } from "flowbite-react/lib/esm/components/Modal/ModalHeader";
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import { ModalFooter } from "flowbite-react/lib/esm/components/Modal/ModalFooter";

const ModifiedModal = ({ show, onClose }) => {
  return (
    <>
      <Modal show={show} onClose={onClose} dismissible={true}>
        <ModalHeader className="!bg-blues-200">
          <div className="flex justify-between">
            <div className="flex flex-col mx-4 text-xl font-semibold text-white">
              Nombre:{" "}
            </div>
            <div className="flex flex-col mx-4 min-w-max">
              <input
                className="border-2 rounded-lg text-center min-h-full text-md"
                placeholder="Punto de Venta"
              />
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="">
          <div className="grid grid-rows-4 min-h my-3">
              <div className="text-center my-2 text-lg font-semibold">
                Zona:
                <input className="border border-2 rounded-md my-2" />
              </div>
              <div className="text-center my-2 text-lg font-semibold items-center justify-center content-center">
                Tipo:
                <select className="border border-2 rounded-md my-2">
                  <option value={1.0}>Uno</option>
                </select>
              </div>
              <div className="text-center my-2 text-lg font-semibold">
                Dirección:
                <textarea className="border border-2 rounded-md my-2"></textarea>
              </div>
              <div className="text-center my-2 text-lg font-semibold">
                Teléfono:
                <input className="border border-2 rounded-md my-2" />
              </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="bg-blues-200 text-white py-2 px-4 rounded-md"
            onClick={onClose}
          >
            Aceptar
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
            onClick={onClose}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModifiedModal;