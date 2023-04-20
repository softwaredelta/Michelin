import { Modal, Select } from "flowbite-react";
import { ModalHeader } from "flowbite-react/lib/esm/components/Modal/ModalHeader";
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import { ModalFooter } from "flowbite-react/lib/esm/components/Modal/ModalFooter";
import { useAddNewSPMutation } from "./sellingPointApiSlice";
import { useGetCategoriesQuery } from "../category/categoryApiSlice";
import { selectStateById, useGetStateQuery } from "./state/stateApiSlice";
import StateOption from "./state/StateOption";
import CategoryOption from "../category/CategoryOption";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { useState } from "react";

const SellingPointAdd = ({ show, onClose }) => {
  let zoneId;
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm();

  const [addNewSP, {isSuccess}] = useAddNewSPMutation();
  const myZone = useSelector((state) => selectStateById(state, zoneId));

  let mycategory, mystate;

  const {
    data: category,
    isSuccess: isSuccessCategory,
    isError: isErrorCategory,
  } = useGetCategoriesQuery();
  console.log(category);

  const {
    data: state,
    isSuccess: isSuccessState,
    isError: isErrorState,
  } = useGetStateQuery();

  if (isErrorCategory) {
    mycategory = <option> Sin opciones válidas </option>;
  }

  if (isSuccessCategory) {
    const { ids } = category;

    const listContent = ids?.length
      ? ids.map((idCategory) => (
          <CategoryOption key={idCategory} categoryId={idCategory} />
        ))
      : null;

    /*const {entities} = category
      const listContent2 = entities?.length
      ? entities?.map((entitie, index) => (
          <option key={entitie?.idCategory} value={entitie?.idCategory}>
            {entitie?.name}
          </option>
        ))
      : null;*/

    mycategory = listContent;
  }

  if (isErrorState) {
    mystate = <option> Sin opciones válidas </option>;
  }

  if (isSuccessState) {
    const { ids } = state;

    const listContent = ids?.length
      ? ids.map((idState) => <StateOption key={idState} zoneId={idState} />)
      : null;

    mystate = listContent;
  }

  const onSaveSPClicked = async (e) => {
    e.preventDefault();
    const name = getValues("name");
    const zone = getValues("select_zone");
    const type = getValues("select_type");
    const address = getValues("address");
    const phone = getValues("phone");

    await addNewSP({
      type: type,
      zone: zone,
      address: address,
      rating: 0,
      name: name,
      phone: phone,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.reload()
    }
  }, [isSuccess, navigate])

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
                id="name"
                {...register("name")}
              />
            </div>
          </div>
        </ModalHeader>
        <form onSubmit={onSaveSPClicked}>
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
                <Select
                  id="select_zone"
                  name="select_zone"
                  {...register("select_zone")}
                  required
                >
                  {mystate}
                </Select>
                <Select
                  id="select_type"
                  name="select_type"
                  {...register("select_type")}
                  required
                >
                  {mycategory}
                </Select>
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
            >
              Aceptar
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-md end"
              onClick={onClose}
            >
              Cancelar
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export default SellingPointAdd;
