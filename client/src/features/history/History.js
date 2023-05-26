import ModifiedFooter from '../../components/ModifiedFooter'
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'
import Report from '../history/Report'

const History = () => {
  const content = (
    <>
      <div>
        <NavBar />
        <div className='pt-20 w-full h-screen flex flex-col items-center dark:!bg-blues-400'>
          <Header myText='Historial' />
          <div className='container pt-5 h-screen overflow-y-scroll w-10/12 items-center dark:!bg-blues-400'>
            <div className='content-start w-full ml-0 mb-6 py-4 border-b-2 dark:border-blues-200'>
              <div className='flex flex-row w-9/12 justify-between'>
                <h2 className='font-semibold text-center ml-28 dark:!text-white'>
                  Nombre
                </h2>
                <h2 className='font-semibold text-center dark:!text-white'>
                  Estado
                </h2>
                <h2 className='font-semibold text-center mr-40 dark:!text-white'>
                  Fecha
                </h2>
              </div>
            </div>
            <div className='h-4/5 overflow-y-scroll'>
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

export default History
