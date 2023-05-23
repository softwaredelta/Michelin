import SellingPointTitle from "../../components/SellingPointTitle";
import InfoAccordion from "../../components/InfoAccordion";
import ReportOverview from "./ReportOverview";

const Report = ({ name, zone, date }) => {
  const content = (
    <>
      <div className="flex flex-row justify-center">
        <InfoAccordion
          sectionTitle={
            <SellingPointTitle name={name} zone={zone} date={date} />
          }
          accordionContent={<ReportOverview />}
        />
      </div>
    </>
  );
  return content;
};

export default Report;
