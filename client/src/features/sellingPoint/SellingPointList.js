import { useState } from "react";
import ModifiedFooter from "../../components/ModifiedFooter";
import ModifiedModal from "../../components/ModifiedFooter";
import NavBar from "../../components/NavBar";
import SellingPoint from "./SellingPoint";
import { useGetSPQuery } from "./sellingPointApiSlice";
import Header from "../../components/Header";
import Bluebutton from "../../components/Bluebutton";

const SellingPointList = () => {

  const [open, setOpen] = useState(false);
  const handleSetOpen = () => {
    setOpen(true);
  };

  const handleSetClose = () => {
    setOpen(false);
  };
  const { data: sp, isLoading, isSuccess, isError, error } = useGetSPQuery();

  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = sp;
    const listContent = ids?.length
      ? ids.map((idSP) => <SellingPoint key={idSP} spId={idSP} />)
      : null;

    content = (
      <>
        <div>
          <NavBar />
          <div className="pt-20 w-full h-screen flex flex-col items-center">
            <Header myText="Punto de Venta" />
            <div className="self-end mr-5">
              <Bluebutton myText="+ Nuevo Punto de Venta" />
            </div>
            <div className="container flex flex-wrap justify-items-stretch">
              {listContent}
            </div>
            <ModifiedFooter />
          </div>
        </div>
        <ModifiedModal show={open} onClose={handleSetClose} />
      </>
    );
  }
  return content;
};

export default SellingPointList;
