import SellingPointTitle from '../../components/titles/SellingPointTitle'
import InfoAccordion from '../../components/accordions/InfoAccordion'
import ReportOverview from './ReportOverview'

/*
 *
 *https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 *
 */
// Historia de usuario M3_H2
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
