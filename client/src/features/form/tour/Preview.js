import CurrentForm from "../../../services/CurrentForm"
import { useNavigate } from "react-router-dom"
import { Button } from "flowbite-react"


const Preview = () => {
const navigate = useNavigate()

let Form = CurrentForm.getInstance()
Form.loadFormInfo()

const content =(
    <Button className='!bg-zinc-500 dark:!bg-blues-200 dark:hover:!bg-gray-500' onClick={() => navigate(`/prueba/preparacion`)}>Editar Cuestionario </Button>
)
return content
}

export default Preview