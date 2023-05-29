import ImageCard from "./ImageCard";
import ModifiedFooter from "./ModifiedFooter";
import NavBar from "./NavBar";
import TourCard from "./TourCard";
import VisualKey from "./VisualKey";

const Example = () => {
  return (
    <>
      <div>
        <div className="w-full h-screen flex flex-col items-center !bg-blues-300">
          <div className="container h-screen flex flex-wrap justify-items-stretch">
            <div className="w-full h-11/12 flex flex-row justify-between">
              <div className="flex-col w-full">
                <TourCard />
              </div>
              <div className="flex-col w-full my-auto">
                <ImageCard />
                <div className="relative left-5 top-32">
                  <VisualKey myLink={"#Holis2"}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Example;