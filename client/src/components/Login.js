
const Login = () => {
  return (
    <>
      <div style={{
        backgroundImage: 'url(/images/vehiculo_login.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
      }}
      >
        <div style={{
          backgroundColor: 'rgba(23,23,150,0.4)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '100vh'
        }}
        >
          <div className='bg-white rounded-2xl border-2 w-1/3 h-3/5 float-right grid items-center text-center justify-center mr-14 mt-14'>
            <img
              style={({ width: '12vh' }, { height: '12vh' })}
              src='/images/Michelin-Logo.png'
              alt='Michelin Logo'
            />
            <h2>Ingresa tu usuario</h2>
            <input className=' bg-stone-200 rounded-md border-2 shadow-lg' placeholder='example@michelin.com' />
            <h2>Ingresa tu contraseña </h2>
            <input type='password' className='bg-stone-200 rounded-md border-2 shadow-lg' placeholder='*******' />
            <button className=' bg-yellow-300 rounded-md border-2 shadow-lg h-8'> Ingresar</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login
