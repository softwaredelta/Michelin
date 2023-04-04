import { useState, useEffect } from 'react'
import { useAddNewUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
  const [addNewUser, {
    isLoading,
    isSuccess
  }] = useAddNewUserMutation()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [validName, setValidName] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [lastName, setLastName] = useState('')
  const [mail, setMail] = useState('')
  const [idManager] = useState(1)

  useEffect(() => {
    setValidName(USER_REGEX.test(name))
  }, [name])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess) {
      setName('')
      setPassword('')
      setMail('')
      setLastName('')
      navigate('/user')
    }
  }, [isSuccess, navigate])

  const onNameChanged = e => setName(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)
  const onLastNameChanged = e => setLastName(e.target.value)
  const onMailChanged = e => setMail(e.target.value)

  const canSave = [validName, validPassword].every(Boolean) && !isLoading

  const onSaveUserClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({ name, lastName, idManager, mail, password })
    }
  }

  const content = (
    <>
      <form onSubmit={onSaveUserClicked}>
        <h2>New User</h2>
        <button title='Save' disabled={!canSave}>Save</button>
        <label htmlFor='name'>
          Name: <span>[3-20 letters]</span>
        </label>
        <input id='name' name='name' type='text' autoComplete='off' value={name} onChange={onNameChanged} />

        <label htmlFor='password'>
          Password: <span>[4-12 chars incl. !@#$%]</span>
        </label>
        <input id='password' name='password' type='password' value={password} onChange={onPasswordChanged} />

        <label htmlFor='lastName'>
          Last Name: <span>[3-20 letters]</span>
        </label>
        <input id='lastName' name='lastName' type='text' autoComplete='off' value={lastName} onChange={onLastNameChanged} />

        <label htmlFor='mail'>
          Mail: <span>[3-20 letters]</span>
        </label>
        <input id='email' name='email' type='mail' autoComplete='off' value={mail} onChange={onMailChanged} />
      </form>
    </>
  )
  return content
}

export default NewUserForm
