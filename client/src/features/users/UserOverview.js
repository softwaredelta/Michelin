import { Button, Checkbox } from "flowbite-react";
import { AccordionContent } from "flowbite-react/lib/esm/components/Accordion/AccordionContent";
import { MdModeEditOutline } from "react-icons/md";
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
import { selectStateById } from "../sellingPoint/state/stateApiSlice";

const UserOverview = ({ userId }) => {
    const user = useSelector((state) => selectUserById(state, userId));
    console.log(user)
  const [editUser, { isSuccessEdit, isErrorEdit }] = useEditUserMutation();

  const [newPassword, { isSuccessPassword, isErrorPassword }] =
    useNewUserPasswordMutation();

  const {
    data: stateData,
    isLoading: isLoadingStates,
    isSuccess: isSuccessStates,
    isError: isErrorStates,
  } = useGetStatesByUserQuery({
    idUser: userId,
  });

  let myStates;
  let [stateList, setStateList] = useState(stateData);

  const handleInputChange = (e) => {
    let auxList = JSON.parse(JSON.stringify(stateList));
    auxList.entities[e.target.id].id_user === null
      ? (auxList.entities[e.target.id].id_user = userId)
      : (auxList.entities[e.target.id].id_user = null);
    stateList = auxList;
    e.target.checked = auxList.entities[e.target.id].id_user !== null;
      e.target.value = auxList.entities[e.target.id].id_user !== null;
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
                  className="scale-110 accent-blues-150"
                  uncheckedvalue={0}
                  value={entities[idState].id_user !== null ? 1 : 0}
                  defaultChecked={entities[idState].id_user !== null ? 1 : 0}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col text-sm align-text-top">
                {entities[idState].name}
              </div>
            </div>
          </>
        ))
      : null;

    myStates = listContent;
  }

  useEffect(() => {
    stateList = stateData;
  });

  const onEditUserClicked = async (e) => {
    e.preventDefault();
    const name = 0;
    const lastName = 0;
    const idUser = 0;
    const states = stateList.entities;
    await editUser({
      name,
      lastName,
      idUser,
      states,
    });
  };

  const onGeneratePasswordClicked = async (e) => {
    e.preventDefault();
    const idUser = 0;
    const password = (length = 8) => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$%*¿?@-_";
      let str = "";
      for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return str;
    };

    await newPassword({
      idUser,
      password,
    });

    Swal.fire({
      title: "Contraseña",
      text: "Esta es la nueva contraseña para este usuario " + password,
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
        <div className="flex justify-between mr-96">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="flex flex-col mx-5">
                <div className="flex flex-row my-2 font-semibold"> Nombre </div>
                <div className="flex flex-row my-2 font-semibold">Apellido</div>
                <div className="flex flex-row my-2 font-semibold"> Correo </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row my-2">
                  <input className="border rounded-md" defaultValue={user.name}/>
                </div>
                <div className="flex flex-row my-2">
                  <input className="border rounded-md" defaultValue={user.last_name}/>
                </div>
                <div className="flex flex-row my-2">
                  <input className="border rounded-md" defaultValue={user.mail} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flew-row">
              <div className="flex flex-col font-semibold mx-5">Zona</div>
              <div className="flex flex-col h-36 border overflow-y-scroll rounded-lg">
                <div className="flex flex-row text-sm px-3 pb-2 pt-1">
                  Selecciona una o más opciones
                </div>
                {myStates}
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-row justify-end my-2">
          <Button className="!bg-zinc-500 dark:!bg-blues-200 dark:hover:!bg-gray-500">
            <MdModeEditOutline className="mx-2" /> Guardar
          </Button>
        </div>
      </AccordionContent>
    </>
  );
};

export default UserOverview;
