import GreenBibendum from './GreenBibendum'
import RedBibendum from './RedBibendum'
import NaButton from './NaButton'
import CurrentForm from '../../services/CurrentForm'
import { useState } from 'react'
import { FileInput } from 'flowbite-react'
import imageCompression from 'browser-image-compression'

const AnsButtons = ({ question, area, section, index, setAnswerCount }) => {
  const Form = CurrentForm.getInstance()
  const currentSection = Form.selectSection(section)

  const camera = question.camera
  const buttonNa = question.buttonNa
  const classNameDflt =
    'scale-50 p-2 rounded-full opacity-100 transition duration-300 ease-in-out'
  const classNameDis =
    'scale-50 p-2 rounded-full transition duration-300 ease-in-out opacity-40 hover:opacity-100'
  let disableGRN = false
  let disableRED = false
  let disableNA = false
  let classNameGRN =
    'scale-50 p-2 rounded-full opacity-100 transition duration-300 ease-in-out hover:opacity-40'
  let classNameRED =
    'scale-50 p-2 rounded-full opacity-100 transition duration-300 ease-in-out hover:opacity-40'
  let classNameNA =
    'scale-50 p-2 rounded-full opacity-100 transition duration-300 ease-in-out hover:opacity-40'
  let photo = null
  let currImg

  const [answer, setAnswer] = useState(
    Form.questions[currentSection][area][index].answer
  )

  const [imageUploaded, setImageUploaded] = useState(
    Form.questions[currentSection][area][index].file !== null
  )

  const onImageChanged = (e) => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }

    imageCompression(e.target.files[0], options)
      .then(function (compressedImage) {
        Form.setFile(section, area, index, compressedImage)
        Form.setAnswer(section, area, index, 4)
        setImageUploaded(true)
      })
      .catch(function (err) {
        console.log(err.message)
      })
  }

  /**
   * The function updates the answer count and image uploaded status based on the child data input.
   * @param childdata - The parameter `childdata` is a variable that represents data being passed from
   * a child component to a parent component in a React application. It is being used as an argument in
   * the `childtoParent` function.
   */
  const childtoParent = (childdata) => {
    setAnswer(childdata)

    if (childdata === 1 || childdata === 3) {
      setImageUploaded(false)
    }
    setAnswerCount(Form.getAnsweredQuestionsByArea(section, area))
  }

  if (answer !== 0) {
    disableGRN = answer === 1
    disableNA = answer === 3
    disableRED = answer === 2 || answer === 4
    classNameGRN = disableGRN ? classNameDflt : classNameDis
    classNameRED = disableRED ? classNameDflt : classNameDis
    classNameNA = disableNA ? classNameDflt : classNameDis
  }

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
              accept='.jpg,.jpeg,.png,.HEIF,.HEIC'
              style={{ display: 'none' }}
            />
          </label>
        </button>
      </>
    )
  }

  if (imageUploaded === true) {
    currImg = (
      <>
        <div className='dark:text-black w-fit text-xl self-center text-center m-auto mt-4 -mb-4'>La imagen se ha guardado</div>
      </>
    )
  }

  const content = (
    <>
      <div class='flex flex-col text-center w-10/12 justify-center m-auto'>
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
