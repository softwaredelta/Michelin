import Report from '../features/history/Report'
import Header from './Header'
import ModifiedFooter from './ModifiedFooter'
import NavBar from './NavBar'
import { Button } from 'flowbite-react'

const Public = () => {
  const name = 'Michelin'

  const content = (
    <>
      <div>
        <NavBar />
        <div className='w-full h-screen flex flex-col items-center'>
          <div className='container flex flex-wrap justify-items-stretch' />

          <div className='relative w-full h-96 !bg-zinc-800 mt-6'>
            <img
              className='object-cover object-left w-full h-96 overflow-hidden opacity-50'
              src='/images/vehiculo_login.jpg'
              alt='imagen de vehículo'
            />

            <div className='absolute self-start text-2xl text-blue-300 bottom-48 left-10 z-20'>
              <h2 className='text-3xl font-michelin underline text-white mt-2 shadow-xl'>
                ¡Bienvenido {name}!
              </h2>
              <div className='justify-self-end'>
                <Button className='mt-4 px-5 text-3xl shadow-xl !bg-trademark-50 !text-blues-200 !font-bold !rounded-full hover:!bg-yellow-500 dark:!bg-blues-300 dark:!text-trademark-50 dark:hover:!bg-blue-950 dark:hover:!text-yellow-500'>
                  Iniciar Recorrido
                </Button>
              </div>
            </div>

            <div className='absolute mr-24 self-center bottom-20 right-11 z-20 rounded-xl border-2 px-5'>
              <div className='text-center text-white font-semibold pt-5 text-xl'>
                Número de Recorridos Realizados
              </div>
              <div class='flex items-center justify-center m-auto'>
                <svg class='w-auto h-auto' fill='none' fill-opacity='0.0'>
                  <circle
                    class='text-white'
                    stroke-width='5'
                    stroke='currentColor'
                    r='50'
                    cx='50%'
                    cy='50%'
                  />
                  <text
                    class='text-3xl text-white'
                    x='50%'
                    y='50%'
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
            <div className='self-center m-auto w-9/12 mb-6 py-4 border-b-2 dark:border-blues-200'>
              <div className='flex flex-row w-9/12 justify-between'>
                <h2 className='font-semibold ml-14 small:text-sm md:text-base dark:!text-blues-200'>
                  Nombre
                </h2>
                <h2 className='font-semibold md:mr-1 small:text-sm small:mr-3 md:text-base md:m-0 dark:!text-blues-200'>
                  Estado
                </h2>
                <h2 className='font-semibold lg:mr-24 small:text-sm small:-mr-1 md:text-base md:-mr-12 dark:!text-blues-200'>
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
