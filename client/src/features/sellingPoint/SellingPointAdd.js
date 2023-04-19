import { Modal } from "flowbite-react";
import { ModalHeader } from "flowbite-react/lib/esm/components/Modal/ModalHeader";
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import { ModalFooter } from "flowbite-react/lib/esm/components/Modal/ModalFooter";
import { useAddNewSPMutation } from "./sellingPointApiSlice";
import { useGetCategoriesQuery } from "../category/categoryApiSlice";
import { selectStateById, useGetStateQuery } from "./state/stateApiSlice";
import StateOption from "./state/StateOption";
import CategoryOption from "../category/CategoryOption";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSelector } from "react-redux";
//import { useState } from "react";

const SellingPointAdd = ({ show, onClose }) => {

  let zoneId;
  const { register, handleSubmit, getValues } = useForm();

  const [addNewSellingPoint, { isLoading, isSuccess }] = useAddNewSPMutation();
  const myZone = useSelector((state) => selectStateById(state, zoneId))


  const name = getValues("name");
  const zone = getValues("zone");
  const type = getValues("type");
  const address = getValues("address");
  const phone = getValues("phone");
  const rating = 0;

  let mycategory, mystate, mystateName;

  const {
    data: category,
    isLoading: isLoadingCategory,
    isSuccess: isSuccessCategory,
    isError: isErrorCategory,
  } = useGetCategoriesQuery();
  const {
    data: state,
    isLoading: isLoadingState,
    isSuccess: isSuccessState,
    isError: isErrorState,
  } = useGetStateQuery();

  if (isLoadingCategory) mycategory = <option> Cargando </option>;
  if (isErrorCategory) {
    mycategory = <option> Sin opciones válidas </option>;
  }

  if (isSuccessCategory) {
    const { ids } = category
    const listContent = ids?.length
      ? ids.map((idCategory) => (
        <CategoryOption key={idCategory} categoryId={idCategory} id="type"/>
      ))
      : null
    mycategory = listContent
  }

  if (isLoadingState) mystate = <option> Cargando </option>;
  if (isErrorState) {
    mystate = <option> Sin opciones válidas </option>;
  }

  // if (isSuccessState) {
  //   const { ids } = state;
  //   const listContent = ids?.length
  //     ? ids.map((idState) => (
  //         <StateOption key={idState} zoneId={idState} id="zone" />
  //       ))
  //     : null;
  //   mystate = listContent;
  // }

  if (isSuccessState) {
    const { ids } = state;
    
    const listContent2 = ids?.length
      ? ids.map((idState, index) => {
        return state.entities[index+1].name;
      }) : null;

    const listContent = ids?.length
      ? ids.map((idState, index) => (
        <option key={idState} zoneId={idState} id="zone" value={idState}>{listContent2[index]} </option>
      ))
      : null;

    mystate = listContent;
    console.log(mystate);
  }

  const onSaveSPClicked = async (e) => {
    e.preventDefault();
    await addNewSellingPoint({ type, zone, address, rating, name, phone });
  };

  const onSubmitForm = () => {
    console.log(name);
  };

  const onError = () => console.log("error :(");

  const [myValue, setValue] = useState();


  console.log(myValue);

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(onSubmitForm, onError)(e).catch(() => {});
        }}
      >
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
                  id="name"
                  {...register("name")}
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
                <select
                  value={myValue}
                  onChange={e => setValue(e.target.value)}
                  onClick={e => setValue(e.target.value)}
                  className="border-2 rounded-md my-2"
                  id="zone"
                  {...register("zone")}
                >
                  {mystate}
                </select>
                <select
                  value={2}
                  className="border-2 rounded-md my-2"
                  id="type"
                  {...register("type")}
                >
                  {mycategory}
                </select>
                <textarea
                  className="border-2 rounded-md my-2 resize-none"
                  id="address"
                  {...register("address")}
                />
                <input
                  className="border-2 rounded-md my-2"
                  id="phone"
                  {...register("phone")}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="bg-blues-200 text-white py-2 px-4 rounded-md"
              type="submit"
              onClick={onSaveSPClicked}
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
      </form>
    </>
  );
};

export default SellingPointAdd;
