import ModifiedFooter from "../../components/ModifiedFooter";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import Report from "../history/Report";

const History = () => {
  const content = (
    <>
      <div>
        <NavBar />
        <div className="pt-20 p- w-full h-screen flex flex-col items-center dark:!bg-blues-400">
          <Header myText="Historial" />
          <div className="pt-5 w-full h-screen flex flex-col items-center dark:!bg-blues-400">
            <div className="content-center grid grid-cols-3 w-7/12 ml-4 mb-6 py-4 border-b-2 dark:border-blues-200">
              <h2 className="font-semibold text-center mr-14 dark:!text-white">
                Nombre
              </h2>
              <h2 className="font-semibold text-center mr-6 dark:!text-white">
                Estado
              </h2>
              <h2 className="font-semibold text-center dark:!text-white">
                Fecha
              </h2>
            </div>
            <div className="h-3/5 overflow-y-scroll">
              <Report name={"example"} zone={"Querétaro"} date={"22/05/2023"} />
              <Report
                name={"adkjkajdkjsakdj"}
                zone={"Querétaro"}
                date={"22/05/2023"}
              />
              <Report
                name={"ajdireukdkandjkashkdhkjdcksk"}
                zone={"Querétaro"}
                date={"22/05/2023"}
              />
            </div>
          </div>
          <ModifiedFooter />
        </div>
      </div>
    </>
  );
  return content;
};

export default History;
