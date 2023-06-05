import { Card } from 'flowbite-react'
import AreaTitle from './AreaTitle'
// import TourQuestion from './TourQuestion'

const TourCard = () => {
  const content = (
    <>
      <div className='w-full pt-20'>
        <Card className='w-5/6 h-96 m-auto'>
          <div className='w-full h-full overflow-y-auto'>
            {/* Componente de lógica con preguntas */}
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <AreaTitle myVar='Holis' number={1} title='Estacionamiento' />

                <div className='h-96'>
                  holis
                </div>
              </div>
              <div className='flex flex-col' />
              <div className='flex flex-col'>
                <AreaTitle myVar='Holis2' number={2} title='Tienda' />
              </div>
              <div className='flex flex-col' />
            </div>
          </div>
        </Card>
      </div>
    </>
  )
  return content
}
export default TourCard
