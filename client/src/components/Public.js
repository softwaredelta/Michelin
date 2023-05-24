import Report from '../features/history/Report'
import Header from './Header'
import ModifiedFooter from './ModifiedFooter'
import NavBar from './NavBar'

const Public = () => {
  const content = (
    <>
      <div>
        <NavBar />
        <div className='pt-20 w-full h-screen flex flex-col items-center'>
          <div className='container flex flex-wrap justify-items-stretch' />
          <div className='self-start ml-7 my-2 mb-5'>
            <h2 className='text-3xl font-miche font-extrabold underline text-blues-200'>
              ¡Bienvenido example!
            </h2>
          </div>
          <div className='w-full h-56 flex justify-center rounded'>
            <img
              className='object-none object-left w-5/12 h-auto rounded-lg'
              src='/images/vehiculo_login.jpg'
              alt='imagen de vehículo'
            />
            <div className='bg-blues-300 w-3/12 rounded-lg'>
              <div className='text-center text-white font-semibold pt-10 text-xl'>
                Número de recorridos realizados
              </div>
              <div class='flex items-center justify-center m-auto'>
                <svg class='w-52 h-52' fill='none' fill-opacity='0.0'>
                  <circle
                    class='text-white'
                    stroke-width='5'
                    stroke='currentColor'
                    r='50'
                    cx='100'
                    cy='75'
                  />
                  <text
                    class='text-3xl text-white'
                    x='48%'
                    y='37%'
                    text-anchor='middle'
                    fillOpacity={1.0}
                    fill='currentColor'
                    stroke-width='6px'
                    dy='.3em'
                  >
                    1
                  </text>
                </svg>
              </div>
            </div>
          </div>
          <div className='self-start w-full mt-8'>
            <Header myText='Historial' />
            <div className='content-start w-9/12 ml-4 mb-6 py-4 border-b-2 dark:border-blues-200'>
              <div className='flex flex-row w-9/12 justify-between'>
                <h2 className='font-semibold text-center ml-28 dark:!text-white'>
                  Nombre
                </h2>
                <h2 className='font-semibold text-center  dark:!text-white'>
                  Estado
                </h2>
                <h2 className='font-semibold text-center mr-40 dark:!text-white'>
                  Fecha
                </h2>
              </div>
            </div>
            <div className='h-96 w-10/12 self-center overflow-y-scroll m-auto'>
              <Report
                spName='PDV Juriquilla'
                spZone='Querétaro'
                repDate='22/05/2023'
                userName='example'
                repTime='13 minutos'
                repLink='https://fotografias.flooxernow.com/clipping/cmsimages02/2022/07/13/404F0395-B90B-459E-BF14-5E9D64CAA45F/gato-boy-gatito-bandit_69.jpg?crop=1280,720,x0,y0&width=1280&height=720&optimize=high&format=webply'
                intPercentage={22}
                extPercentage={12}
                clientPercentage={36}
                managerPercentage={67}
              />
              <Report
                spName='PDV Juriquilla'
                spZone='Querétaro'
                repDate='22/05/2023'
                userName='example'
                repTime='13 minutos'
                repLink='https://fotografias.flooxernow.com/clipping/cmsimages02/2022/07/13/404F0395-B90B-459E-BF14-5E9D64CAA45F/gato-boy-gatito-bandit_69.jpg?crop=1280,720,x0,y0&width=1280&height=720&optimize=high&format=webply'
                intPercentage={22}
                extPercentage={12}
                clientPercentage={36}
                managerPercentage={67}
              />
              <Report
                spName='PDV Juriquilla'
                spZone='Querétaro'
                repDate='22/05/2023'
                userName='example'
                repTime='13 minutos'
                repLink='https://fotografias.flooxernow.com/clipping/cmsimages02/2022/07/13/404F0395-B90B-459E-BF14-5E9D64CAA45F/gato-boy-gatito-bandit_69.jpg?crop=1280,720,x0,y0&width=1280&height=720&optimize=high&format=webply'
                intPercentage={22}
                extPercentage={12}
                clientPercentage={36}
                managerPercentage={67}
              />
            </div>
          </div>
          <ModifiedFooter />
        </div>
      </div>
    </>
  )
  return content
}
export default Public
