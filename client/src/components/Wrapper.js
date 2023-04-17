import ModifiedFooter from "./ModifiedFooter";
import NavBar from "./NavBar";
import SPCard from "./SPCard";

const Wrapper = () => {
    return (
        <div className="w-full max-h-screen-xl flex flex-col">
            <NavBar />
            <div className="container flex flex-wrap">
                <SPCard name={"Juriquilla"} zone={"Querétaro"} address={"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"} phone={"000 000 0000"}/>
                <SPCard name={"Juriquilla"} zone={"Querétaro"} address={"Lorem ipsum"} phone={"000 000 0000"}/>
                <SPCard name={"Juriquilla"} zone={"Querétaro"} address={"Lorem ipsum"} phone={"000 000 0000"}/>
                <SPCard name={"Juriquilla"} zone={"Querétaro"} address={"Lorem ipsum"} phone={"000 000 0000"}/>
                <SPCard name={"Juriquilla"} zone={"Querétaro"} address={"Lorem ipsum"} phone={"000 000 0000"}/>
                <SPCard name={"Juriquilla"} zone={"Querétaro"} address={"Lorem ipsum"} phone={"000 000 0000"}/>
            </div>
            <ModifiedFooter />
        </div>
    );
};

export default Wrapper;
