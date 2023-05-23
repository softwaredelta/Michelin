import { AccordionContent } from "flowbite-react/lib/esm/components/Accordion/AccordionContent";
import { AiFillFilePdf } from "react-icons/ai"
import { useNavigate } from "react-router-dom";

const ReportOverview = ({ }) => {
    const navigate = useNavigate()
  const content = (
    <>
      <AccordionContent className="h-40">
        <form>
          <div className="flex justify-between mr-80">
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="flex flex-col mx-5">
                  <div className="flex flex-row my-2 dark:!text-white">
                    <p className="font-semibold mr-2"> TBM Asignado:</p>
                    <p className="font-medium"> hola </p>
                  </div>
                  <div className="flex flex-row my-2 dark:!text-white">
                    <p className="font-semibold mr-2"> Tiempo:</p>
                    <p className="font-medium"> 12 minutos </p>
                  </div>
                  <div className="flex flex-row my-2 font-semibold dark:!text-white border-b border-black cursor-pointer" onClick={navigate("/question")}>
                    Ver Reporte PDF 
                    <AiFillFilePdf className="ml-2 my-1"/>            
                  </div>
                </div>
                <div className="flex flex-col"></div>
              </div>
            </div>
          </div>
        </form>
      </AccordionContent>
    </>
  );
  return content;
};

export default ReportOverview;
