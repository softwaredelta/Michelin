import SellingPointTitle from '../../components/SellingPointTitle'
import InfoAccordion from '../../components/InfoAccordion'
import ReportOverview from './ReportOverview'

const Report = ({
  spName,
  spZone,
  repDate,
  userName,
  repTime,
  repLink,
  intPercentage,
  extPercentage,
  clientPercentage,
  managerPercentage
}) => {
  const content = (
    <>
      <div className='flex flex-row justify-center'>
        <InfoAccordion
          sectionTitle={
            <SellingPointTitle name={spName} zone={spZone} date={repDate} />
          }
          accordionContent={
            <ReportOverview
              name={userName}
              time={repTime}
              repLink={repLink}
              intPercentage={intPercentage}
              extPercentage={extPercentage}
              clientPercentage={clientPercentage}
              managerPercentage={managerPercentage}
            />
          }
        />
      </div>
    </>
  )
  return content
}

export default Report
