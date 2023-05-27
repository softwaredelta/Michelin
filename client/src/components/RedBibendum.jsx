import { FileInput } from "flowbite-react"
import CurrentForm from "../services/CurrentForm"
import { useState } from "react"
const RedBibendum = ({section, area, index, camera}) => {
  let Form = CurrentForm.getInstance()
  let currentSection
  switch (section) {
    case 1:
      currentSection = 'preparation'
      break
    case 2:
      currentSection = 'exterior'
      break
    case 3:
      currentSection = 'interior'
      break
    case 4:
      currentSection = 'client'
      break
    case 5:
      currentSection = 'manager'
      break
    default:
      break
  }
  let currImg
  let photo
  let ansImg = Form.questions[currentSection][area][index].file
  const [image, setImage] = useState('')

  const onImageChanged = (e) => {
    setImage(e.target.files[0])
    Form.setFile(section, area, index, e.target.files[0])
    Form.setAnswer(section,area,index,4)

  }
  let currAns = 0
  
  const myFunction =() =>{
    Form.setAnswer(section, area, index, 2)
    currAns = Form.questions[currentSection][area][index].answer
    
  }

  if (ansImg !== null){
    currImg = (
      <>
      <p className="dark:text-white">Hay una  ya guardada</p>
      </>
    )
  }else{
    currImg = null
  }

  if (camera === 1 && ansImg === null){
    photo = (<>
      <button className='scale-50 rounded-full bg-white bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-40'>
        <img src="/images/uploadFile.png"/>
      </button>
      <FileInput id='image' name='image' onChange={onImageChanged} accept=".jpg,.jpeg,.png,.HEIF" />
      </>
    )
  }else{
    photo = null
  }

  const content = (
    <>
      <button className='scale-50 rounded-full bg-white bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-40' onClick={myFunction} ><img src='/images/redBibendum.png'/></button>
      {photo}
      {currImg}
    </>
  )
  return content
}
export default RedBibendum
