import { useLoginUserMutation } from '../../services/usersApiSlice'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import Toast from '../../components/alerts/Toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { register, getValues } = useForm()

  const navigate = useNavigate()

  const [loginUser, {
    isSuccess,
    isError,
    error
  }] = useLoginUserMutation()

  const onLoginClicked = async (e) => {
    e.preventDefault()
    const myEmail = getValues('myEmail')
    const myPassword = getValues('myPassword')

    await loginUser({ email: myEmail, password: myPassword })
  }

  useEffect(() => {
    if (isError) {
      Toast.fire({
        icon: 'error',
        title: 'Se produjo un error. Revisa las credenciales ingresadas o tu conexión a internet'
      })
    }
    if (isSuccess) {
      navigate('/home')
    }
  }, [isSuccess, isError, error, navigate])

  const content = (
    <>
      <div style={{
        backgroundImage: 'url(/images/vehiculo_login.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
      }}
      >
        <div
          className='content-center' style={{
            backgroundColor: 'rgba(23,23,150,0.4)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '100vh'
          }}
        >
          <div className='grid grid-cols-2 justify-end'>
            <div className='col-span-2'>
              <div className='bg-white rounded-3xl shadow-xl border-2 float-right grid px-10 2xl:py-14 mr-28 mt-44 '>
                <img
                  style={({ width: '12vh' }, { height: '12vh' })}
                  src='/images/Michelin-Logo.png'
                  alt='Michelin Logo'
                />
                <form onSubmit={onLoginClicked}>
                  <div className='grid items-center'>
                    <h2 className='ml-8 my-3'>Ingresa tu usuario</h2>
                    <input className='bg-stone-200 border-2 rounded-lg shadow-lg ml-8 w-5/6 mb-3 h-10 p-2' placeholder='example@michelin.com' type='email' id='myEmail' required {...register('myEmail')} />
                    <h2 className='ml-8 my-3'>Ingresa tu contraseña </h2>
                    <input className='bg-stone-200 rounded-lg border-2 shadow-lg ml-8 w-5/6 mb-3 h-10 p-2' placeholder='********' type='password' id='myPassword' minLength={8} maxLength={8} required {...register('myPassword')} />
                  </div>
                  <div className='w-full grid items-center'>
                    <button className=' bg-yellow-300 rounded-lg border-2 border-yellow-300 shadow-lg px-14 py-2 my-6 mx-auto hover:bg-yellow-400 hover:border-yellow-400' type='submit'> Ingresar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
  return content
}

export default Login
