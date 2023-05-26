import Report from "../features/history/Report";
import Header from "./Header";
import ModifiedFooter from "./ModifiedFooter";
import NavBar from "./NavBar";
import { Button } from "flowbite-react";
import {
  useGetFormsByUserQuery,
  useGetFormCountByUserQuery,
} from "../features/form/formApiSlice";

const Public = () => {
  const name = "Michelin";

    const {
      data: forms,
      isLoading,
      isSuccess,
      isError,
    } = useGetFormsByUserQuery({ mail: localStorage.getItem("mail") }); // eslint-disable-line
    const { data: count, isSuccess: isSuccesCount } =
      useGetFormCountByUserQuery({ mail: localStorage.getItem("mail") }); // eslint-disable-line

    const baseReportRoute = "http://localhost:3080/form/report/";

    let tableContent;
    let message;
    let countContent = 0;

    if (isLoading) message = <p>Loading...</p>;

    if (isError) {
      message = (
        <p className="text-3xl font-semibold dark:!text-white">
          No hay conexion con la base de datos
        </p>
      );
    }

    if (isSuccess) {
      const { ids, entities } = forms;
      if (ids.length === 0) {
        message = (
          <p className="text-3xl font-semibold dark:!text-white">
            No hay recorridos registrados
          </p>
        );
      }

      if (isSuccesCount) {
        countContent = count;
      }

      tableContent = ids?.length
        ? ids.map((idForm) => (
            <Report
              key={idForm}
              spName={entities[idForm].sp_name}
              spZone={entities[idForm].zone}
              repDate={`${entities[idForm].date.substring(8, 10)}/${entities[
                idForm
              ].date.substring(5, 7)}/${entities[idForm].date.substring(0, 4)}`}
              userName={`${entities[idForm].user_name} ${entities[idForm].user_last_name}`}
              repTime={`${entities[idForm].duration.substring(3, 5)} minutos`}
              repLink={baseReportRoute + entities[idForm].file_link}
              intPercentage={entities[idForm].interior_grade}
              extPercentage={entities[idForm].exterior_grade}
              clientPercentage={entities[idForm].client_grade}
              managerPercentage={entities[idForm].store_manager_grade}
            />
          ))
        : null;
    }

    const content = (
      <>
        <div>
          <NavBar />
          <div className="w-full h-screen flex flex-col items-center">
            <div className="container flex flex-wrap justify-items-stretch" />

            <div className="relative w-full h-96 !bg-zinc-800 mt-6">
              <img
                className="object-cover object-left w-full h-96 overflow-hidden opacity-50"
                src="/images/vehiculo_login.jpg"
                alt="imagen de vehículo"
              />

              <div className="absolute self-start text-2xl text-blue-300 bottom-48 left-10 z-20">
                <h2 className="text-3xl font-michelin underline text-white mt-2 shadow-xl">
                  ¡Bienvenido {name}!
                </h2>
                <div className="justify-self-end">
                  <Button className="mt-4 px-5 text-3xl shadow-xl !bg-trademark-50 !text-blues-200 !font-bold !rounded-full hover:!bg-yellow-500 dark:!bg-blues-300 dark:!text-trademark-50 dark:hover:!bg-blue-950 dark:hover:!text-yellow-500">
                    Iniciar Recorrido
                  </Button>
                </div>
              </div>

              <div className="absolute mr-24 self-center bottom-20 right-11 z-20 rounded-xl border-2 px-5">
                <div className="text-center text-white font-semibold pt-5 text-xl">
                  Número de Recorridos Realizados
                </div>
                <div class="flex items-center justify-center m-auto">
                  <svg class="w-auto h-auto" fill="none" fill-opacity="0.0">
                    <circle
                      class="text-white"
                      stroke-width="5"
                      stroke="currentColor"
                      r="50"
                      cx="50%"
                      cy="50%"
                    />
                    <text
                      class="text-3xl text-white"
                      x="50%"
                      y="50%"
                      text-anchor="middle"
                      fillOpacity={1.0}
                      fill="currentColor"
                      stroke-width="6px"
                      dy=".3em"
                    >
                      {countContent}
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            <div className="self-start w-full mt-8">
              <Header myText="Historial" />
              <div className="self-center m-auto w-9/12 mb-6 py-4 border-b-2 dark:border-blues-200">
                <div className="flex flex-row w-9/12 justify-between">
                  <h2 className="font-semibold ml-14 small:text-sm md:text-base dark:!text-blues-200">
                    Nombre
                  </h2>
                  <h2 className="font-semibold md:mr-1 small:text-sm small:mr-3 md:text-base md:m-0 dark:!text-blues-200">
                    Estado
                  </h2>
                  <h2 className="font-semibold lg:mr-24 small:text-sm small:-mr-1 md:text-base md:-mr-12 dark:!text-blues-200">
                    Fecha
                  </h2>
                </div>
              </div>
              <div className="h-96 w-10/12 self-center overflow-y-scroll m-auto">
                {tableContent}
                {message}
              </div>
            </div>
            <ModifiedFooter />
          </div>
        </div>
      </>
    );
    return content;
  };

export default Public;
