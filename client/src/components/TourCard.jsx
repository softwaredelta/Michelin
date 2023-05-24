import { Card } from "flowbite-react";
import AreaTitle from "./AreaTitle";
import TourQuestion from "./TourQuestion";

const TourCard = () => {
  const content = (
    <>
      <div className="w-full max-h-screen">
        <Card className="w-2/5 h-96 ml-6 my-28">
          <div className="w-full h-full overflow-y-auto"> {/* Componente de lógica con preguntas*/}
            <div className="flex flex-col">
              <div className="flex flex-col">
                <AreaTitle />
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
