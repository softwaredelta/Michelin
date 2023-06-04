import GreenBibendum from './GreenBibendum'
import RedBibendum from './RedBibendum'
import NaButton from './NaButton'
import CurrentForm from '../../services/CurrentForm'
import { useState } from 'react'
import { FileInput } from 'flowbite-react'

const AnsButtons = ({ question, area, section, index, setAnswerCount }) => {
  const Form = CurrentForm.getInstance()
  const currentSection = Form.selectSection(section)

  const camera = question.camera
  const buttonNa = question.buttonNa
  const classNameDflt =
    'scale-50 rounded-full opacity-100 transition duration-300 ease-in-out hover:opacity-40'
  const classNameDis =
    'scale-50 rounded-full transition duration-300 ease-in-out opacity-40 cursor-not-allowed'
  let disableGRN = false
  let disableRED = false
  let disableNA = false
  let classNameGRN =
    'scale-50 rounded-full opacity-100 transition duration-300 ease-in-out hover:opacity-40'
  let classNameRED =
    'scale-50 rounded-full opacity-100 transition duration-300 ease-in-out hover:opacity-40'
  let classNameNA =
    'scale-50 rounded-full opacity-100 transition duration-300 ease-in-out hover:opacity-40'
  let photo = null

  const [answer, setAnswer] = useState(
    Form.questions[currentSection][area][index].answer
  )

  const [imageUploaded, setImageUploaded] = useState(
    Form.questions[currentSection][area][index].file !== null
  )

  const onImageChanged = (e) => {
    Form.setFile(section, area, index, e.target.files[0])
    Form.setAnswer(section, area, index, 4)
    setImageUploaded(true)
  }

  const childtoParent = (childdata) => {
    setAnswer(childdata)

    if (childdata === 1 || childdata === 3) {
      setImageUploaded(false)
    }
    setAnswerCount(Form.getAnsweredQuestionsByArea(section, area))
  }

  disableGRN = answer === 1
  disableNA = answer === 3
  disableRED = answer === 2 || answer === 4
  classNameGRN = disableGRN ? classNameDis : classNameDflt
  classNameRED = disableRED ? classNameDis : classNameDflt
  classNameNA = disableNA ? classNameDis : classNameDflt

  const selectImageName = `s${section}a${area}i${index}selectImg`
  if ((camera === 1 && answer === 2) || answer === 4) {
    photo = (
      <>
        <button className='scale-50 rounded-full opacity-100 transition duration-300 ease-in-out hover:opacity-40'>
          <label htmlFor={selectImageName} className='cursor-pointer'>
            <img src='/images/uploadFile.png' alt='Subir imagen' />
            <FileInput
              id={selectImageName}
              name={selectImageName}
              onChange={onImageChanged}
              accept='.jpg,.jpeg,.png,.HEIF'
              style={{ display: 'none' }}
            />
          </label>
        </button>
      </>
    )
  }
  let currImg
  if (imageUploaded === true) {
    currImg = (
      <>
        <div className='dark:text-black w-fit text-xl self-center text-center m-auto mt-4 -mb-4'>La imagen se ha guardado</div>
      </>
    )
  }

  const content = (
    <>
      <div class='flex flex-col text-center'>
        <div class='grid grid-flow-col w-fit self-center -mb-10'>
          <GreenBibendum
            section={section}
            area={area}
            index={index}
            disable={disableGRN}
            className={classNameGRN}
            childtoParent={childtoParent}
          />
          <RedBibendum
            section={section}
            area={area}
            index={index}
            photo={photo}
            disable={disableRED}
            className={classNameRED}
            childtoParent={childtoParent}
          />
        </div>
        <div className='text-center'>
          {currImg}
          <NaButton
            section={section}
            area={area}
            index={index}
            buttonNa={buttonNa}
            disable={disableNA}
            className={classNameNA}
            childtoParent={childtoParent}
          />
        </div>
      </div>
    </>
  )
  return content
}
export default AnsButtons
