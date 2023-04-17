import { Footer } from "flowbite-react";
import { FooterCopyright } from "flowbite-react/lib/esm/components/Footer/FooterCopyright";
const ModifiedFooter = () => {
    return (
        <Footer className="py-8 bt-2">
            <FooterCopyright href="#" by="ITESM™" year={2023} />
        </Footer>
    );
};

export default ModifiedFooter;
