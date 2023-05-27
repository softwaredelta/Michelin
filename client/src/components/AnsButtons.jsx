import GreenBibendum from './GreenBibendum'
import RedBibendum from './RedBibendum'
import NaButton from './NaButton'
import CurrentForm from '../services/CurrentForm'

const AnsButtons = ({question, area, section, index}) => {

  let Form = CurrentForm.getInstance()
  let camera = question.camera
  let buttonNa = question.buttonNa


  const content = (
    <>
      <div class='flex flex-col text-center'>
        <div class='flex-row'>
          <GreenBibendum  section={section} area={area} index={index}/>
          <RedBibendum  section={section} area={area} index={index} camera={camera}/>
        </div>
        <div class='text-center'>
          <NaButton section={section} area={area} index={index} buttonNa={buttonNa}/>
        </div>
      </div>
    </>
  )
  return content
}
export default AnsButtons
