import GreenBibendum from './GreenBibendum'
import RedBibendum from './RedBibendum'
import NaButton from './NaButton'

const AnsButtons = () => {
  const content = (
    <>
      <div class='flex flex-col text-center'>
        <div class='flex-row'>
          {/* <div className=""> */}
            <GreenBibendum />
          {/* </div> */}
          {/* <div className=""> */}
            <RedBibendum />
          {/* </div> */}
        </div>
        <div class='text-center'>
          <NaButton />
        </div>
      </div>
    </>
  )
  return content
}
export default AnsButtons
