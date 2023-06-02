import CurrentForm from '../../../services/CurrentForm'
import { useForm } from 'react-hook-form'
import { Label } from 'flowbite-react'
import SelectedMail from '../../../components/SelectedMail'
import { useState } from 'react'
import MailTextBox from '../../../components/MailTextBox'
import Toast from '../../../components/Toast'
import SectionBanner from '../../../components/SectionBanner'
import { Card } from 'flowbite-react'



const Finalize = () => {
  const Form = CurrentForm.getInstance()
  Form.setEndTime()
  const tourTime = Form.getElapsedMinutes()
  const sellingPointName = Form.spName

  const { register, getValues } = useForm()

  const [mailList, setMailList] = useState([])

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onClickDeleteMail = (e) => {
    let currentMailList = [...mailList]
    currentMailList.splice(currentMailList.indexOf(e.target.id), 1)
    setMailList(currentMailList)

  }

  const onClickAddMail = (mail) => {
    if (validateEmail(mail) && !mailList.includes(mail)) {
      let currentMailList = [...mailList]
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
    const comments = getValues('comments')

    Form.postForm(comments, manager, mailList)
  }

  let mailListContent = mailList?.length
    ? mailList.map((mailText) => <SelectedMail key={mailText} mail={mailText} onClickDelete={onClickDeleteMail} />)
    : null

  const content = (
    <>
      <div>
        <SectionBanner myText='Resumen' />
      </div>
      <div className='w-full h-screen items-center !bg-blues-300 object-center'>
        <div className='pt-32 w-full min-h-screen'>
          <Card className='w-10/12 h-4/5 m-auto dark:bg-gray-50'>
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
                    maxLength='255'
                    type='text'
                    placeholder='Ingrese el nombre del Gerente'
                  />
                  <Label
                    htmlFor='comments'
                    value='Comentarios'
                    className='text-xl font-semibold mr-2 my-1 mt-5 !text-blues-300'
                  />
                  <textarea
                    id='comments'
                    name='comments'
                    {...register('comments')}
                    required
                    autoComplete='off'
                    className='rounded-md my-2 h-60 resize-none bg-neutral-100 p-2'
                    maxLength='255'
                    type='text'
                    rows='5'
                    cols='40'
                    placeholder='Ingrese uno o varios Comentarios'
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
                  <div className='font-michelinl pt-2 pb-7 pl-1 top-10 left-7 text-3xl text-blues-300'>{tourTime} {'minuto' + (tourTime > 1 ? 's' : '')}</div>
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
                <div className='flex flex-col mr-8 items-end bottom-0 pt-4 lg:pt-4 pl-32'>
                  <button onClick={onFinalizeTourClicked} className='!text-lg py-2 bottom-0 w-44 left-0 mt-4 px-5 shadow-xl !bg-trademark-50 !text-blues-200 !rounded-full hover:!bg-yellow-500'>Finalizar</button>
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
