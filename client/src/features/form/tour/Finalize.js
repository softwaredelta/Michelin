import CurrentForm from '../../../services/CurrentForm'
import { useForm } from 'react-hook-form'
import { Label, Card } from 'flowbite-react'
import SelectedMail from '../../../components/inputs/SelectedMail'
import { useState, useEffect } from 'react'
import MailTextBox from '../../../components/inputs/MailTextBox'
import Toast from '../../../components/alerts/Toast'
import SectionBanner from '../../../components/titles/SectionBanner'
import ConfirmationModal from '../../../components/alerts/ConfirmationModal'

import { useNavigate } from 'react-router-dom'

/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// Historia de usuario M13_H1
const Finalize = () => {
  const { register, getValues } = useForm()
  const navigate = useNavigate()

  const Form = CurrentForm.getInstance()
  const tourTime = Form.getElapsedMinutes()
  const sellingPointName = Form.spName

  const [mailList, setMailList] = useState([])
  const [show, setShow] = useState(false)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const handleSetShow = () => {
    const manager = getValues('manager')
    const comments = [getValues('comment1'), getValues('comment2'), getValues('comment3')]

    if (manager !== '' && !comments.every(comment => comment === '')) {
      setShow(true)
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Campos incompletos'
      })
    }
  }

  const handleClose = () => {
    setShow(false)
  }

  const onClickDeleteMail = (e) => {
    const currentMailList = [...mailList]
    currentMailList.splice(currentMailList.indexOf(e.target.id), 1)
    setMailList(currentMailList)
  }

  const onClickAddMail = (mail) => {
    if (validateEmail(mail) && !mailList.includes(mail)) {
      const currentMailList = [...mailList]
      currentMailList.push(mail)
      setMailList(currentMailList)
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Correo Inválido'
      })
    }
  }

  const onFinalizeTourClicked = async (e) => {
    e.preventDefault()
    const manager = getValues('manager')
    const comments = [getValues('comment1'), getValues('comment2'), getValues('comment3')]

    Form.postForm(comments, manager, mailList)
    navigate('/')
  }

  const mailListContent = mailList?.length
    ? mailList.map((mailText) => <SelectedMail key={mailText} mail={mailText} onClickDelete={onClickDeleteMail} />)
    : null

  useEffect(() => {
    if (Form.idSp === 0) {
      navigate('/form')
    }
  })

  const content = (
    <>
      <ConfirmationModal show={show} onClose={handleClose} text='¿Terminar recorrido?' method={onFinalizeTourClicked} />
      <div>
        <SectionBanner myText='Resumen' />
      </div>
      <div className='w-full h-screen items-center !bg-blues-300 object-center'>
        <div className='pt-32 w-full min-h-screen'>
          <Card className='w-10/12 h-4/5 m-auto dark:bg-white'>
            <div className='grid grid-cols-2 gap-12'>
              <div>
                <div className='flex flex-col content-center'>
                  <Label
                    htmlFor='sellingpoint'
                    value='Punto de Venta'
                    className='text-xl font-semibold mr-2 my-1 !text-blues-300'
                  />
                  <input
                    className='rounded-md font-michelinl font-xl bg-neutral-100 my-2 p-2'
                    maxLength='255'
                    type='text'
                    value={sellingPointName}
                    disabled
                  />
                  <Label
                    htmlFor='manager'
                    value='Gerente del Punto de Venta'
                    className='text-xl font-semibold mr-2 my-1 mt-5 !text-blues-300'
                  />
                  <input
                    id='manager'
                    name='manager'
                    {...register('manager')}
                    required
                    autoComplete='off'
                    className='rounded-md my-2 resize-none bg-neutral-100 p-2'
                    maxLength='80'
                    type='text'
                    placeholder='Ingrese el nombre del Gerente'
                  />
                  <Label
                    htmlFor='comments'
                    value='Acciones Puntuales de Mejora'
                    className='text-xl font-semibold mr-2 my-1 mt-5 !text-blues-300'
                  />
                  <Label
                    htmlFor='comments'
                    value='Ingresa por lo menos una acción de mejora'
                    className='text-sm font-semibold mr-2 my-1 !text-blues-300'
                  />
                  <input
                    id='comment1'
                    name='comment1'
                    {...register('comment1')}
                    required
                    autoComplete='off'
                    className='rounded-md my-2 resize-none bg-neutral-100 p-2'
                    maxLength='80'
                    type='text'
                    rows='5'
                    cols='40'
                    placeholder='Ingrese una acción de mejora'
                  />
                  <input
                    id='comment2'
                    name='comment2'
                    {...register('comment2')}
                    autoComplete='off'
                    className='rounded-md my-2 resize-none bg-neutral-100 p-2'
                    maxLength='80'
                    type='text'
                    rows='5'
                    cols='40'
                    placeholder='Ingrese una acción de mejora'
                  />
                  <input
                    id='comment3'
                    name='comment3'
                    {...register('comment3')}
                    autoComplete='off'
                    className='rounded-md my-2 resize-none bg-neutral-100 p-2'
                    maxLength='80'
                    type='text'
                    rows='5'
                    cols='40'
                    placeholder='Ingrese una acción de mejora'
                  />
                </div>
              </div>
              <div>
                <div className='flex flex-col content-center'>
                  <Label
                    htmlFor='Tiempo de Recorrido'
                    value='Tiempo de Recorrido'
                    className='text-xl font-semibold mr-2 my-1 !text-blues-300'
                  />
                  <div className='font-michelinl pt-2 pb-28 pl-1 top-10 left-7 text-3xl text-blues-300'>{tourTime} {'minuto' + (tourTime === 1 ? '' : 's')}</div>
                  <div name='correos' className='hidden'>
                    <Label
                      htmlFor='Ingresa el correo electrónico de los destinatarios'
                      value='Ingresa el correo electrónico de los destinatarios'
                      className='text-xl font-semibold mr-2 my-1 !text-blues-300'
                    />
                    <MailTextBox onClickAdd={onClickAddMail} />
                    <Label
                      htmlFor='Destinatarios'
                      value='Destinatarios'
                      className='text-xl font-semibold mr-2 my-1 !text-blues-300'
                    />
                    <div className='flex flex-col h-52 p-3 overflow-y-scroll rounded-lg'>
                      {mailListContent}
                    </div>
                  </div>
                </div>
                <div className='flex flex-col mr-8 items-end bottom-0 pt-56 lg:pt-56 pl-32'>
                  <button onClick={handleSetShow} className='!text-lg py-2 w-44 left-0 mt-4 px-5 shadow-xl !bg-trademark-50 !text-blues-200 !rounded-full hover:!bg-yellow-500'>Finalizar</button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
  return content
}

export default Finalize
