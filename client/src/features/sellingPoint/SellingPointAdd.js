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
import { useState } from "react";
import { useSelector } from "react-redux";
//import { useState } from "react";

const SellingPointAdd = ({ show, onClose }) => {
  let zoneId;
  const { register, handleSubmit, getValues } = useForm();

  const [addNewSP] = useAddNewSPMutation();
  const myZone = useSelector((state) => selectStateById(state, zoneId));

  let mycategory, mystate;

  const {
    data: category,
    isSuccess: isSuccessCategory,
    isError: isErrorCategory,
  } = useGetCategoriesQuery();
  console.log(category)
  
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

    const listContent2 = ids?.length
      ? ids.map((idCategory, index) => {
        return category.entities[index + 1].name;
      })
      : null;
    
    const listContent = ids?.length
      ? ids.map((idCategory, index) => (
          <option key={idCategory} value={idCategory}>
            {listContent2[index]}
          </option>
        ))
      : null;

    mycategory = listContent;
  }

  if (isErrorState) {
    mystate = <option> Sin opciones válidas </option>;
  }

  if (isSuccessState) {
    const { ids } = state;

    const listContent2 = ids?.length
      ? ids.map((idState, index) => {
          return state.entities[index + 1].name;
        })
      : null;

    const listContent = ids?.length
      ? ids.map((idState, index) => (
          <option key={idState} value={idState}>
            {listContent2[index]}{" "}
          </option>
        ))
      : null;

    mystate = listContent;
    console.log(mystate);
  }

  const onError = () => console.log("error :(");

  const [myValue, setValue] = useState();
  const [myValue2, setValue2] = useState();

  const onSaveSPClicked = async (e) => {
    e.preventDefault();
    const name = getValues("name");
    const zone = getValues("select_zone");
    const type = getValues("select_type");
    const address = getValues("address");
    const phone = getValues("phone");
    const rating = 0;

    console.log("holis", type);

    await addNewSP({
      type: type,
      zone: zone,
      address: address,
      rating: 0,
      name: name,
      phone: phone,
    });
  };

  return (
    <>
      <form>
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
                <Select id='select_zone' name='select_zone' {...register("select_zone")} required>
                  {mystate}
                </Select>
                <Select id='select_type' name='select_type' {...register("select_type")} required>
                  {mycategory}
                </Select>
                {/* <select
                  name="select-type"
                  onChange={(e) => setValue(e.target.value)}
                  //onClick={(e) => setValue(e.target.value)}
                  className="border-2 rounded-md my-2"
                  id="zone"
                  {...register("zone")}
                >
                  {mystate}
                </select>
                <Select
                  name="select-type"
                  // onClick={(e) => setValue2(e.target.value)}
                  onChange={(e) => setValue2(e.target.value)}
                  className="border-2 rounded-md my-2"
                  id="type"
                  {...register("type")}
                  options={mycategory}
                >
                </Select> */}
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
