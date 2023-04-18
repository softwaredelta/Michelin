import { Modal } from "flowbite-react";
import { ModalHeader } from "flowbite-react/lib/esm/components/Modal/ModalHeader";
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import { ModalFooter } from "flowbite-react/lib/esm/components/Modal/ModalFooter";
import ModifiedOption from "./ModifiedOption";
import { useGetCategoriesQuery } from "../features/category/categoryApiSlice";

const ModifiedModal = ({ show, onClose }) => {

  let content;
  const { data: category, isLoading, isSuccess, isError, error } = useGetCategoriesQuery()

  // console.log(category);

  if (isLoading) content = <option> Cargando </option>
  if (isError) {
    content = <option> Sin opciones válidas </option>
    console.log(category);
  }

  if (isSuccess) {
    const { ids } = category
    const listContent = ids?.length
      ? ids.map((idCategory) => <ModifiedOption key={idCategory} categoryId={idCategory} />)
      : null
    content = listContent;
  }

  console.log(content);
  return (
    <>
      <Modal show={show} onClose={onClose} dismissible>
        <ModalHeader className="!bg-blues-200">
          <div className="flex ml-14">
              <div className="flex items-center flex-col mx-4 text-xl font-semibold text-white">
                Nombre:
              </div>
              <div className="flex flex-col mx-4">
                <input
                  className="border-2 rounded-lg text-center min-h-full text-mdh-4/5 w-72"
                  placeholder="Punto de Venta"
                />
              </div>
            </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex justify-center">
            <div className="flex flex-col mx-4 items-end">
              <div className="flex-row align-bottom text-center my-2 text-lg font-semibold">
                Zona:
              </div>
              <div className="flex-row text-center my-2 text-lg font-semibold">
                Tipo:
              </div>
              <div className="flex-row text-center my-5 text-lg font-semibold">
                Dirección:
              </div>
              <div className="flex-row text-center my-2 text-lg font-semibold">
                Teléfono:
              </div>
            </div>
            <div className="flex flex-col w-3/4">
              <input className="border-2 rounded-md my-2" />
              <select className="border-2 rounded-md my-2">
                {content}
              </select>
              <textarea className="border-2 rounded-md my-2 resize-none" />
              <input className="border-2 rounded-md my-2" />
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
