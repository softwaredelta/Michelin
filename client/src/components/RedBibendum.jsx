import { FileInput } from "flowbite-react"
import CurrentForm from "../services/CurrentForm"
import { useState } from "react"
const RedBibendum = ({section, area, index, camera}) => {
  let Form = CurrentForm.getInstance()
  
  const myFunction =() =>{
    Form.setAnswer(section, area, index, 2)
    console.log(Form.questions)
  }
  
  const [image, setImage] = useState('')
  const onImageChanged = e => {
    setImage(e.target.files[0])
    Form.setFile(section, area, index. e.target.files[0])
    Form.setAnswer(section,area,index,4)
  }
  let photo
  if (camera === 1){
    photo = (<>
      <button className='scale-50 rounded-full bg-white bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-40'>
        <img src="/images/uploadFile.png"/>
      </button>
      <FileInput id='image' name='image' onChange={onImageChanged} accept=".jpg,.jpeg,.png,.HEIF" />
      </>
    )
  }

  const content = (
    <>
      <button className='scale-50 rounded-full bg-white bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-40' onClick={myFunction} ><img src='/images/redBibendum.png'/></button>
      {photo}
    </>
  )
  return content
}
export default RedBibendum
