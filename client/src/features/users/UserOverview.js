import { Button, Checkbox } from "flowbite-react";
import { AccordionContent } from "flowbite-react/lib/esm/components/Accordion/AccordionContent";
import { BsFillTrashFill } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { BsDice5 } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  selectUserById,
  useEditUserMutation,
  useNewUserPasswordMutation,
} from "./usersApiSlice";
import { useGetStatesByUserQuery } from "../sellingPoint/state/stateApiSlice";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Toast from "../../components/Toast";
import { useForm } from "react-hook-form";

const UserOverview = ({ userId }) => {
  const { register, getValues } = useForm();

  const user = useSelector((state) => selectUserById(state, userId));
  const [editUser, { isSuccess: isSuccessEdit, isError: isErrorEdit }] = useEditUserMutation();

  const [newPassword, { isSuccessPassword, isErrorPassword }] =
    useNewUserPasswordMutation();

  const {
    data: stateData,
    isSuccess: isSuccessStates,
    isError: isErrorStates,
  } = useGetStatesByUserQuery({
    idUser: userId,
  });

  let myStates;
  let [stateList] = useState(stateData);

  const handleInputChange = (e) => {
    let auxList = JSON.parse(JSON.stringify(stateList));
    auxList.entities[e.target.id].id_user === null
      ? (auxList.entities[e.target.id].id_user = userId)
      : (auxList.entities[e.target.id].id_user = null);
    stateList = auxList;
    e.target.checked();
    e.target.value();

    console.log(e.target.checked)
  };

  if (isErrorStates) {
    myStates = <option disabled> Sin opciones válidas </option>;
  }

  if (isSuccessStates) {
    const { ids, entities } = stateData;

    const listContent = ids?.length
      ? ids.map((idState) => (
          <>
            <div className="flex flex-row mb-1">
              <div className="flex flex-col mx-2">
                <Checkbox
                  key={idState}
                  id={idState}
                  className="scale-110 accent-blues-150 dark:!text-white"
                  uncheckedvalue={0}
                  value={entities[idState].id_user !== null ? 1 : 0}
                  defaultChecked={entities[idState].id_user !== null ? 1 : 0}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col text-sm align-text-top dark:!text-white">
                {entities[idState].name}
              </div>
            </div>
          </>
        ))
      : null;

    myStates = listContent;
  }

  useEffect(() => {
    stateList = stateData; // eslint-disable-line
    
  });

  const onEditUserClicked = async (e) => {
    e.preventDefault();

    let count = 0;

    for (let myState in stateList.entities) {
      if (stateList.entities[myState].id_user === user.id) {
        count += 1;
      }
    }
    if (count !== 0) {
      const name = getValues("name");
      const lastName = getValues("lastName");
      const idUser = userId;
      const states = stateList;
      await editUser({
        name,
        lastName,
        idUser,
        states,
      });
    }
    else {
      Toast.fire({
        icon: 'error',
        title: 'No se pudo guardar, verifica tus campos'
      })
    }
  };

  const onGeneratePasswordClicked = async (e) => {
    e.preventDefault();
    const password = (length = 8) => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$%*¿?@-_";
      let str = "";
      for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return str;
    };
    
    const myNewPassword = password()
    await newPassword({
      idUser: userId,
      newPassword: myNewPassword,
    });

    Swal.fire({
      title: "Contraseña",
      text: "Esta es la nueva contraseña para este usuario " + myNewPassword,
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
  };

  useEffect(() => {
    if (isErrorEdit) {
      Toast.fire({
        icon: "error",
        title: "Se produjo un error",
      });
    }
    if (isSuccessEdit) {
      Toast.fire({
        icon: "success",
        title: "Se creó un nuevo usuario",
      });
    }
  }, [isSuccessEdit, isErrorEdit]);

  return (
    <>
      <AccordionContent className="h-60">
        <form onSubmit={onEditUserClicked}>
          <div className="flex justify-between mr-80">
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="flex flex-col mx-5">
                  <div className="flex flex-row my-2 font-semibold dark:!text-white">Nombre</div>
                  <div className="flex flex-row my-2 font-semibold dark:!text-white">
                    Apellido
                  </div>
                  <div className="flex flex-row my-2 font-semibold dark:!text-white">Correo</div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row my-2">
                    <input
                      className="border rounded-md"
                      defaultValue={user.name}
                      id="name"
                      {...register("name")}
                      required
                    />
                  </div>
                  <div className="flex flex-row my-2">
                    <input
                      className="border rounded-md"
                      defaultValue={user.last_name}
                      id="lastName"
                      {...register("lastName")}
                      required
                    />
                  </div>
                  <div className="flex flex-row my-2">
                    <input
                      className="border rounded-md" disabled
                      defaultValue={user.mail}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flew-row">
                <div className="flex flex-col font-semibold mx-5 dark:!text-white">Zona</div>
                <div className="flex flex-col h-36 border overflow-y-scroll rounded-lg">
                  <div className="flex flex-row text-sm px-3 pb-2 pt-1 dark:!text-white">
                    Selecciona una o más opciones
                  </div>
                  {myStates}
                </div>
              </div>
            </div>
            <div className="flex flex-col mx-10">
                <div className="flex flex-col font-semibold dark:!text-white text-center">Generar nueva contraseña</div>
                <div className="flex flex-col my-2">
                <Button className="w-2/3 self-center !border-blues-200 !bg-white !text-blues-200" onClick={onGeneratePasswordClicked}>
                  <BsDice5 className="mx-1" />
                  Generar
                  </Button>
                </div>
            </div>
          </div>
          <div className=" flex flex-row justify-end my-2">
            <Button
              className="!bg-zinc-500 dark:!bg-blues-200 hover:!bg-gray-500 dark:hover:!bg-blue-500 mx-4"
              type="submit"
            >
              <MdModeEditOutline className="mx-2" /> Guardar
            </Button>
            <Button
              className="!bg-white dark:!bg-zinc-500 dark:hover:!bg-zinc-700 dark:hover:!border-zinc-700 dark:text-white text-zinc-500 border-zinc-500"
              type="submit"
            >
              <BsFillTrashFill className="mx-2" /> Eliminar
            </Button>
          </div>
        </form>
      </AccordionContent>
    </>
  );
};

export default UserOverview;
