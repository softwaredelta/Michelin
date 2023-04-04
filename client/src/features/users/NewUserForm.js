import {useState, useEffect} from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () =>{
    const [addNewUser,{
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [password,setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [last_name, setLast_name] = useState('')
    const [mail, setMail] = useState('')
    const [id_manager, setId_manager] = useState(1)

    useEffect(()=>{
        setValidName(USER_REGEX.test(name))
    },[name])

    useEffect(() =>{
        setValidPassword(PWD_REGEX.test(password))
    },[password])

    useEffect(() =>{
        if (isSuccess){
            setName('')
            setPassword('')
            setMail('')
            setLast_name('')
            navigate('/user')
        }
    },[isSuccess,navigate])

    const onNameChanged = e => setName(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onLast_nameChanged = e => setLast_name(e.target.value)
    const onMailChanged = e => setMail(e.target.value)

    const canSave = [validName, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave){
            await addNewUser({name, last_name, id_manager, mail, password})
        }
    }
   
    const content =(
        <>
        <form onSubmit={onSaveUserClicked}>
            <h2>New User</h2>
            <button title="Save" disabled={!canSave}>Save</button>
            <label htmlFor="name">
                Name: <span>[3-20 letters]</span>
            </label>
            <input id="name" name="name" type="text" autoComplete="off" value={name} onChange={onNameChanged}>
            </input>

            <label htmlFor="password">
                Password: <span>[4-12 chars incl. !@#$%]</span>
            </label>
            <input id="password" name="password" type="password" value={password} onChange={onPasswordChanged}>
            </input>

            <label htmlFor="last_name">
                Last Name: <span>[3-20 letters]</span>
            </label>
            <input id="last_name" name="last_name" type="text" autoComplete="off" value={last_name} onChange={onLast_nameChanged}>
            </input>

            <label htmlFor="mail">
                Mail: <span>[3-20 letters]</span>
            </label>
            <input id="email" name="email" type="mail" autoComplete="off" value={mail} onChange={onMailChanged}>
            </input>
        </form>
        </>
    )
    return content
}

export default NewUserForm