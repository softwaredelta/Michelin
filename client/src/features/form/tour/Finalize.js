import CurrentForm from '../../../services/CurrentForm'
import ProgressBar from '../../../components/ProgressBar'
import { useForm } from 'react-hook-form'
import { Label } from 'flowbite-react'
const Finalize = () => {
  const Form = CurrentForm.getInstance()

  const { register, getValues } = useForm()

  const onFinalizeTourClicked = async (e) => {
    e.preventDefault()
    Form.setEndTime()
    const manager = getValues('manager')
    const comments = getValues('comments')

    Form.postForm(comments, manager)
  }

  const content = (
    <>
      <div>
        <ProgressBar />
        <div className='pt-20 w-full min-h-screen flex flex-col items-center dark:!bg-blues-400'>
          <div className='container flex flex-wrap justify-items-stretch' />

          <div className='w-2/5 mb-6'>
            <Label
              htmlFor='manager'
              value='Gerente del Punto de Venta'
              className='text-lg font-semibold mr-2 my-1'
            />
            <input
              id='manager'
              name='manager'
              {...register('manager')}
              required
              autoComplete='off'
              className='border-2 rounded-md my-2 resize-none dark:bg-transparent dark:text-white p-2'
              maxLength='255'
              type='text'
            />
            <Label
              htmlFor='comments'
              value='Comentarios'
              className='text-lg font-semibold mr-2 my-1'
            />
            <textarea
              id='comments'
              name='comments'
              {...register('comments')}
              required
              autoComplete='off'
              className='border-2 rounded-md my-2 resize-none dark:bg-transparent dark:text-white p-2'
              maxLength='255'
              type='text'
              rows='5'
              cols='40'
            />
          </div>
          <div>
            <button onClick={onFinalizeTourClicked} className='mt-4 px-5 !text-3xl shadow-xl !bg-trademark-50 !text-blues-200 !font-extrabold !rounded-full hover:!bg-yellow-500 dark:!bg-blues-300 dark:!text-trademark-50 dark:hover:!bg-blue-950 dark:hover:!text-yellow-500'>Finalizar</button>
          </div>
        </div>

      </div>
    </>
  )
  return content
}

export default Finalize
