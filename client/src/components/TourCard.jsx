import { Card } from "flowbite-react";
import AreaTitle from "./AreaTitle";
import TourQuestion from "./TourQuestion";

const TourCard = () => {
  const content = (
    <>
      <div className="w-full pt-20">
        <Card className="w-5/6 h-96 m-auto">
          <div className="w-full h-full overflow-y-auto"> {/* Componente de lógica con preguntas*/}
            <div className="flex flex-col">
              <div className="flex flex-col">
                <AreaTitle myVar={"Holis"}/>
              </div>
              <div className="flex flex-col">
                <TourQuestion />
                <TourQuestion />
                <TourQuestion />
                <TourQuestion />
              </div>
              <div className="flex flex-col">
                <AreaTitle myVar={"Holis2"} />
              </div>
              <div className="flex flex-col">
                <TourQuestion />
                <TourQuestion />
                <TourQuestion />
                <TourQuestion />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
  return content;
};
export default TourCard;
